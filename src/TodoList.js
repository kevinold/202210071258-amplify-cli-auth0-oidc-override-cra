import { useAuthenticator } from '@aws-amplify/ui-react';
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";

import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";

function TodoList() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
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
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div>User: {user.username} </div>
      <div>
        <button onClick={() => onCreateTodo(user).then(() => getTodos().then((data) => setTodos(data.listTodos.items)).catch(() => console.log("error with todos"))
          )}>
          Create Todo
        </button>
      </div>
      <div>
        <ul>{todos && todos.map((t, i) => <li key={i}>{t.name}</li>)}</ul>
      </div>
    </div>
  );
}

export default TodoList;