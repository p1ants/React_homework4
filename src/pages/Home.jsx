import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiDeleteBinLine } from 'react-icons/ri';

const StTodoBoxs = styled.div`
  /* background-color: brown; */
  height: 700px;
  /* 박스내에서 텍스트 작성, 스크롤 */
  box-sizing: border-box;
  background: transparent;
  padding: 0px 0px 0px 20px;
  overflow: auto;
`;

const StTodoBox = styled.div`
  border: solid gray 3px;
  /* max-width: 1200vw; */
  width: 90vw;
  height: 100px;
  margin: 20px;
  padding: 0px 20px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: blueviolet;
    transition: background-color 300ms linear;
  }
`;

const StAddBoxsDeletebutton = styled.button`
  border: solid gray 3px;
  background-color: white;
  width: 90px;
  height: 90px;
  margin: 20px;
  padding: 0px 0px 0px 0px;
`;

const StAddBoxs = styled.div`
  border: solid gray 3px;
  /* max-width: 1200vw; */
  width: 90vw;
  height: 100px;
  margin: 20px;
  padding: 0px 20px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StAddBoxsAddbutton = styled.button`
  border: solid gray 3px;
  background-color: white;
  width: 90px;
  height: 90px;
  margin: 20px;
  padding: 0px 0px 0px 0px;
`;

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

  console.log(todos); //FIXME: App.js:16

  return (
    <>
      <StTodoBoxs>
        {todos?.map((todo) => (
          <StTodoBox>
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
              <StAddBoxsDeletebutton
                type='button'
                onClick={() => onClickDeleteButtonHandler(todo.id)}
              >
                <RiDeleteBinLine />
              </StAddBoxsDeletebutton>
            </div>
          </StTodoBox>
        ))}
      </StTodoBoxs>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <StAddBoxs>
          <div>
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
          </div>

          <StAddBoxsAddbutton>추가하기</StAddBoxsAddbutton>
        </StAddBoxs>
      </form>
    </>
  );
}
