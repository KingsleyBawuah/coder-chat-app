/* Copyright Coder Technologies Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import React from "react"
import { createUseStyles } from "react-jss"
import Login from "./Login"
import ChatRoom from "./ChatRoom"

/**
 * The top-level component in our React application, all of the code currently
 * in here is just an example of our conventions and server interaction, but
 * should ultimately be replaced with the final chat app.
 */
export const App: React.FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.app}>
      {(localStorage["username"] === undefined) ? <Login /> : <ChatRoom />}
    </div>
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
      backgroundColor: "lightgrey"
    },
  },
  // App-specific styles
  app: {
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
