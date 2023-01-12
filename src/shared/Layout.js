// src/shared/Layout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import styled from 'styled-components';

const HeaderStyles = {
  width: '100%',
  background: 'black',
  height: '50px',
  //   display: 'flex',
  //   alignItems: 'center',
  paddingLeft: '20px',
  color: 'white',
  fontWeight: '600',
};

const layoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
};

const TopBar = styled.div`
  display: flex;
  align-items: center;
  line-height: 50px;
  justify-content: space-between;
  padding: 0 40px 0 0px;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ ...HeaderStyles }}>
      <TopBar>
        <div
          onClick={() => {
            navigate('/');
          }}
        >
          <AiOutlineHome />
        </div>
        <div>할일 목록...</div>
      </TopBar>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
    </div>
  );
}

export default Layout;

//header - 상단바
//footer -사업자 정보, 개
//이렇게 작성시 ... 우리가 보이는 페이지에 항상 헤더와 풋터가 적용이될것임.
