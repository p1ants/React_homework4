import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState(null);
  //post
  const [todo, setTodo] = useState({ title: '' });

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  //추가하기 버튼
  const onSubmitHandler = (todo) => {
    if (
      todo.title.trim().length === 0 ||
      todo.name.trim().length === 0 ||
      todo.description.trim().length === 0
    ) {
      return alert('내용 작성 해주시죠. 좋은말로 할때.');
    }

    axios.post('http://localhost:3001/todos', todo);
    //추가하기 버튼 눌렀을때 리렌더링 되도록하는 기능>> SetTodos
    setTodos([...todos, todo]);
    alert('님이 할일 추가 되었습니다.');
  };

  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
    window.confirm('진짜로 삭제하실?');
    alert('삭제되었습니다.');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos); // App.js:16

  return (
    <>
      <div>
        {todos?.map((todo) => (
          <div>
            <div
              key={todo.id}
              onClick={() => {
                navigate(`/${todo.id}`);
              }}
            >
              <div>
                <span>{todo.title}-</span>
                <span>{todo.description}</span>
                <div>{todo.name}</div>
              </div>
            </div>
            <div>
              <button
                type='button'
                onClick={() => onClickDeleteButtonHandler(todo.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type='text'
          placeholder='제목'
          onChange={(e) => {
            const { value } = e.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />

        <input
          type='text'
          placeholder='내용'
          onChange={(e) => {
            const { value } = e.target;
            setTodo({
              ...todo,
              description: value,
            });
          }}
        />

        <input
          type='text'
          placeholder='작성자'
          onChange={(e) => {
            const { value } = e.target;
            setTodo({
              ...todo,
              name: value,
            });
          }}
        />

        <button>추가하기</button>
      </form>
    </>
  );
}
