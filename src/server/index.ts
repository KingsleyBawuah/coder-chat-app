/* Copyright Coder Technologies Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import express from "express"
import expressWs from "express-ws"
import bodyParser from "body-parser"
import cors from "cors"
import MessagesManager from "./messages"
import { Message } from "../types/message"

/*************** Configure server ***************/

const PORT = 5000
const { app } = expressWs(express())
app.set("port", PORT)
app.use(bodyParser.json())
app.use(cors())

/******************** Routes ********************/

/*
 * GET /test
 *
 * A simple 'ping' test
 */
app.get("/test", (_, res) => {
  res.json({ success: true })
})

/*
 * POST /message
 *
 * Handles incoming messages
 */
app.post("/message", (req, res) => {
  // Make sure they sent the right arguments
  if (!req.body.from) {
    return res.json({
      error: 'Messages require a "from" argument',
      success: false,
    })
  }
  if (!req.body.body) {
    return res.json({
      error: 'Messages require a "body" argument',
      success: false,
    })
  }
  if (req.body.body.length > 1000) {
    return res.json({
      error: "Message body cannot be more than 1000 characters",
      success: false,
    })
  }
  try {
    // Add the post and send it back to them
    const message = MessagesManager.addMessage(req.body)
    res.json({
      data: { message },
      success: true,
    })
  } catch (err) {
    res.json({ error: err.message, success: false })
  }
})

/*
 * WS /messages
 *
 * A WS endpoint for subscribing to messages. There are two payload
 * shapes: "message" and "ping". The former contains data with a Message,
 * while the latter contains no data and is used to keep an on-going
 * client-server conection.
 */
app.ws("/messages", (ws) => {
  // First send all messages
  MessagesManager.getMessages().forEach((msg) => {
    ws.send(JSON.stringify({ type: "message", data: msg }))
  })

  // Then send any subsequent messages
  const msgListener = (msg: Message) => {
    ws.send(JSON.stringify({ type: "message", data: msg }))
  }
  MessagesManager.addListener("message", msgListener)

  // Keep the socket alive by sending 'ping' messages every 10s
  const pingInterval = setInterval(() => {
    ws.send(JSON.stringify({ type: "ping" }))
  }, 10000)

  // Stop the listener on close
  ws.addEventListener("close", () => {
    MessagesManager.removeListener("message", msgListener)
    clearInterval(pingInterval)
  })
})

/**************** Start server ****************/

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`)
})
