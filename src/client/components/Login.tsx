import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { navigate } from 'hookrouter';

interface ILoginProps { }

const Login: React.FC<ILoginProps> = () => {
  const [loginValid, setLoginValid] = useState(true)
  const [loginErrMsg, setLoginErrMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    //Handle someone that is already logged in.
    console.log('localStorage: ', localStorage["username"]);
    if (localStorage["username"] !== undefined) {
      navigate("/chat")
    }
  }, [])

  //Save login to local state and retrieve it on load of component.
  const handleLoginSubmit = (event: FormEvent) => {
    console.log('event: ', event);
    if (loginValid) {
      console.log('loginValid: ', loginValid);
      setIsSubmitting(true)
      localStorage.setItem("username", username);
      navigate("/chat")
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO: Verify username is within params.
    setUsername(event.target.value)
  }


  const verifyLogin = (): boolean => {

    return false
  }

  return (
    <div>
      <div>
        <h1>Coder Challange Chat Login</h1>
        <form className="loginForm" onSubmit={handleLoginSubmit}>
          <input type="text" onChange={handleInputChange} />
          <span className="error"></span>
          <div>
            <button disabled={!loginValid}>
              {"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
