import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//상세페이지 상단
const StDetailUpper = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const StDetailUpperLeft = styled.div`
  flex-basis: 80%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;
const StDetailUpperRight = styled.div`
  flex-basis: 20%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

//상세페이지 내용
const StDetailDescription = styled.div`
  border: solid gray 3px;
  border-radius: 15px;
  padding: 40px;
  /* max-width: 1200vw; */
  width: 70vw;
  height: 200px;
`;

//댓글추가 박스
const StAddBoxs = styled.div`
  border: solid gray 3px;
  /* max-width: 1200vw; */
  width: 71vw;
  height: 50px;
  margin: 20px;
  padding: 0px 20px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
`;

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState([]);

  //댓글기능
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:3001/todos')
      .then((response) => {
        response.data.filter((list) => {
          if (list.id === Number(id)) {
            setTodo(list);
            console.log(list);
          }
          return null;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const fetchComments = async () => {
    const { data } = await axios.get('http://localhost:3001/comments');
    setComments(data);
  };
  useEffect(() => {
    fetchComments();
  }, []);

  //댓글 추가하기 버튼
  const onSubmitHandler = (comment) => {
    if (
      comment.name.trim().length === 0 ||
      comment.description.trim().length === 0
    ) {
      return alert('내용 작성 해주시죠. 좋은말로 할때.');
    }

    axios.post('http://localhost:3001/comments', comment);
    //댓글 버튼 눌렀을때 리렌더링 되도록하는 기능>> SetComments
    setComments([...comments, comment]);
    alert('댓글 ^^.');
  };
  console.log(comments);

  return (
    <div>
      <StDetailUpper>
        <StDetailUpperLeft>
          <h2>{todo.title}</h2>
          <div>-{todo.name}-</div>
        </StDetailUpperLeft>
        <StDetailUpperRight>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            이전으로
          </div>
          <div>수정하기</div>
        </StDetailUpperRight>
      </StDetailUpper>

      <StDetailDescription>{todo.description}</StDetailDescription>
      <div>-------------------------------------</div>

      <div>
        {comment}- 댓글 <button>수정</button>
        <button>삭제</button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(comment);
        }}
      >
        <StAddBoxs>
          <input
            type='text'
            placeholder='작성자'
            onChange={(e) => {
              const { value } = e.target;
              setComment({
                ...comment,
                name: value,
              });
            }}
          />

          <input
            type='text'
            placeholder='내용'
            onChange={(e) => {
              const { value } = e.target;
              setComment({
                ...comment,
                description: value,
              });
            }}
          />
          <button>댓글</button>
        </StAddBoxs>
      </form>
    </div>
  );
}
