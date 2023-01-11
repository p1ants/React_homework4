import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Detail() {
  const navigate = useNavigate();
  const param = useParams();
  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);
  const work = todos.find((work) => work.id === parseInt(param.id));
  console.log(work); // App.js:16
  return (
    <div>
      <div>이전으로</div>
      {/* <div>{todos}</div> */}
    </div>
  );
}
