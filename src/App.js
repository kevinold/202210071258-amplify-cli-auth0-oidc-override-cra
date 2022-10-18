import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, API, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import "./App.css";
import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";

Amplify.configure(awsconfig);

function App({ user }) {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const { data } = await API.graphql({
      query: listTodos,
    });

    return data;
  }

  async function onCreateTodo(user) {
    await API.graphql({
      query: createTodo,
      variables: {
        input: {
          name: `New Todo ${user.email} - ${Date()}`,
          description: `${user.email} - ${Date()}\n`,
        },
      },
    });
  }

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data.listTodos.items))
      .catch(() => console.log("error with todos"));
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      </div>
      <div>User: {user.username} </div>
      <div>
        <button onClick={() => onCreateTodo(user) && getTodos()}>
          Create Todo
        </button>
      </div>
      <div>
        <ul>{todos && todos.map((t, i) => <li key={i}>{t.name}</li>)}</ul>
      </div>
    </div>
  );
}

export default withAuthenticator(App);