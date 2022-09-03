import css from 'styled-jsx/css';

export default css`
  article {
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 10px 15px;
  }
  article:hover {
    cursor: pointer;
    background: #f5f8fa;
  }
  div {
    padding-right: 10px;
  }
  p {
    margin: 0;
    line-height: 1.3125;
  }
  img {
    border-radius: 10px;
    height: auto;
    width: 30%;
  }
  a {
    color: #555;
    font-size: 14px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;
