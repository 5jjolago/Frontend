// styles.js
import styled from 'styled-components';

export const GlobalStyle = styled.div`
  body {
    overflow-y: hidden;
    height: 100%;
    font-family: 'Pretendard', sans-serif !important;
    font-size: 14px;
    color: var(--color-gray);
    font-weight: 500;
    line-height: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-height: 100vh;
  }
`;
