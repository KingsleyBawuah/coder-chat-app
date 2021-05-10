/* Copyright Coder Technologies Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import React, { useState, useEffect } from "react"
import { createUseStyles } from "react-jss"
import api from "../lib/api"
// import { Switch, Route, useLocation } from "wouter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRoutes, useRedirect } from 'hookrouter';

import ChatWindow from "./ChatWindow"
import Login from "./Login"
import MessageSender from "./MessageSender"
import ChatRoom from "./ChatRoom"


const routes = {
  "/": () => <Login />,
  "/chat": () => <ChatRoom />
}
/**
 * The top-level component in our React application, all of the code currently
 * in here is just an example of our conventions and server interaction, but
 * should ultimately be replaced with the final chat app.
 */
export const App: React.FC = () => {
  const styles = useStyles()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  useRedirect('/chat', '/chat');


  // Make a test request immediately on component render to the API, and set
  // component state based on the response
  useEffect(() => {
    api
      .test()
      .then(() => setSuccess(true))
      .catch((err) => setError(err))
  }, [])



  // Set content message based on the current state of the App
  let content
  if (success) {
    content = <pre>Got a response from the server!</pre>
  } else if (error) {
    content = <pre className="error">{error.toString()}</pre>
  } else {
    content = <p>Sending test request to API...</p>
  }

  const routeResult = useRoutes(routes);


  return (
    <Router>
      <div className={styles.app}>
        {routeResult}
        {/* <Switch>
          <Route path="/" exact component={Login} />
          <Route path="chat" component={ChatRoom} />
        </Switch> */}
      </div>
    </Router>
  )
}

// This JSS function creates a hook that the above component can use, providing
// it with conflict-avoidant class names that provide the styles.
// You can read more about it here: https://cssinjs.org/react-jss
const useStyles = createUseStyles({
  // Apply some global style resets
  "@global": {
    body: {
      margin: 0,
    },
  },
  // App-specific styles
  app: {
    padding: 40,
    textAlign: "center",
  },
  title: {
    marginBottom: 20,
  },
  text: {
    "& code": {
      color: "#8e44ad",
    },
  },
})
