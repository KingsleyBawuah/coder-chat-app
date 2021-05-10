/* Copyright Coder Technologies Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

/**
 * Message represents a body of text with an author and timestamp.
 */
export interface Message {
  /** The name of the user that sent this Message */
  from: string
  /** The body of this Message */
  body: string
  /**
   * Number of milliseconds elapsed since the UNIX epoch
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
   */
  time: number
}

/**
 * MessageArgs is a minimal subset of Message. Clients use this interface when
 * POSTing messages to the server.
 * @remark Timestamps are set by the server when Messages are acknowledged.
 * @see Message
 */
export type MessageArgs = Omit<Message, "time">
