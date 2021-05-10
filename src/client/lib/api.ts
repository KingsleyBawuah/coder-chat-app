/* Copyright Coder Technologies Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Message, MessageArgs } from "../../types/message"

/**
 * A subset of HTTP Request Methods
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

/**
 * BaseStatusResponse is a response shape used by the API to indicate whether
 * or not a request was successfully processed.
 */
interface BaseStatusResponse {
  /** If the request was not successful, an error message may be present */
  error?: string
  /** `true` if the request was successfully processed; otherwise `false` */
  success: boolean
}

/**
 * CreateMessageResponse is a response shape returned by the API when POSTing
 * chat messages.
 */
interface CreateMessageResponse extends BaseStatusResponse {
  data?: {
    message: Message
  }
}

/**
 * Publically exposed API methods
 * @remark Methods here are consumed by the React web client
 */
interface PublicAPI {
  /**
   * Sends a test GET request to the API
   */
  test(): Promise<BaseStatusResponse>

  /**
   * POST a new chat Message to the API.
   * @remark All new messages will be sent back via the websocket
   */
  postMessage(message: MessageArgs): Promise<CreateMessageResponse>

  /**
   * Establishes a websocket connection with the chat server.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
   */
  openMessageSocket(): WebSocket
}

/**
 * API is a class containing all publicaly available API interactions
 */
class API implements PublicAPI {
  protected url: string

  constructor(url: string) {
    this.url = url
  }

  test() {
    return this.request("GET", "/test")
  }

  postMessage(args: MessageArgs) {
    return this.request<CreateMessageResponse>("POST", "/message", args)
  }

  openMessageSocket() {
    const wsUrl = this.url.replace("https", "wss").replace("http", "ws")
    return new WebSocket(`${wsUrl}/messages`)
  }

  // Internal request method
  protected request<R extends BaseStatusResponse>(
    method: ApiMethod,
    path: string,
    args?: unknown,
  ): Promise<R> {
    const requestUrl = this.url + path

    let body = null

    const headers = new Headers()
    headers.append("Accept", "application/json")

    if (method === "POST" || method === "PUT") {
      body = JSON.stringify(args)
      headers.append("Content-Type", "application/json")
    }

    return fetch(requestUrl, {
      method,
      headers,
      body,
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        }

        // Custom Error handler
        const fallbackErrorMsg = `${res.status}: ${res.statusText}`
        let parsedErrorMsg: string | undefined

        try {
          const errBody = await res.json()
          parsedErrorMsg = errBody.error
        } catch (err) {
          throw new Error(fallbackErrorMsg)
        }

        if (parsedErrorMsg) {
          throw new Error(parsedErrorMsg)
        } else {
          throw new Error(fallbackErrorMsg)
        }
      })
      .catch((err) => {
        console.error(`API error calling ${method} ${path}`, err)
        throw err
      })
  }
}

export default new API("http://localhost:5000")
