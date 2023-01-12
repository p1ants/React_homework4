import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      <div>
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          이전으로
        </div>
        <div>수정하기</div>
      </div>

      <div>
        <span>{todo.title}</span>
        <div>{todo.name}</div>
      </div>
      <span>{todo.description}</span>
      <div>-------------------------------------</div>
      <div>
        {comment}- 댓글 <button>삭제</button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(comment);
        }}
      >
        <div>
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
        </div>
        <div>
          <button>댓글</button>
        </div>
      </form>
    </div>
  );
}
