import React, { ChangeEvent, useState } from 'react';

const loginRegex = /^[a-zA-Z0-9_\-]*$/
const LOGIN_ERR_MSG = "The username you have provided is not in the correct format. Please use a 3-20 character password consiting of only letters, numbers and the symbols _ or -"

import { createUseStyles } from "react-jss"

interface ILoginProps { }

const Login: React.FC<ILoginProps> = () => {
  const [loginValid, setLoginValid] = useState(true)
  const [username, setUsername] = useState("")
  const styles = useStyles()

  //Save login to local state and retrieve it on load of component.
  const handleLoginSubmit = (): void => {
    setLoginValid(verifyUsername(username))
    if (loginValid) {
      localStorage.setItem("username", username);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
    setLoginValid(verifyUsername(event.target.value))
  }

  const verifyUsername = (username: string): boolean => (username.length < 3 || username.length > 20) || !loginRegex.test(username) ? false : true

  return (
    <div className={styles.loginContainer}>
      <h1>Welcome to Chat App</h1>
      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <input name="username" placeholder={"Enter your name"} className={styles.usernameInput} type="text" onChange={handleInputChange} />
        <div>
          <button
            className={styles.joinButton}
            style={!loginValid ? {
              "backgroundColor": "grey"
            } : {}} disabled={!loginValid}>
            {"Join"}
          </button>
        </div>
        <br />
        <span className={styles.usernameError}>{loginValid ? "" : LOGIN_ERR_MSG}</span>
      </form>
    </div>
  );
};


const useStyles = createUseStyles({
  loginContainer: {
    "backgroundColor": "darkgray",
    "margin": "auto",
    "width": "50%",
    "transform": "translateY(20rem)",
    "padding": "25px"
  },
  usernameInput: {
    "marginBottom": "10px",
    "width": "75%",
    "height": "54px",
    "fontSize": "larger"
  },
  joinButton: {
    "lineHeight": "0", "color": "white",
    "width": "75%", "fontSize": "20px", "padding": "25px", "backgroundColor": "#040404", "display": "inline-block", "cursor": "pointer", "textAlign": "center"
  },
  usernameError: {
    "color": "red"
  }
})

export default Login;
