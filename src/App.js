import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from "aws-amplify";
import React from "react";
import "./App.css";
import TodoList from './TodoList';

function SignInWithAuth0() {
  return (<button onClick={() => Auth.federatedSignIn({ customProvider: "Auth0" })}>
    Sign via Auth0
  </button>)
}

function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

 return (
    <>
      {authStatus === 'configuring' && 'Loading...'}
      {authStatus === 'authenticated' && <TodoList />}
      {authStatus === 'unauthenticated' && <SignInWithAuth0/>}
    </>
  );

}

export default App;