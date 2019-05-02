import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

export const Markdown = styled(ReactMarkdown)`
  flex: 1;
  overflow-y: scroll;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  .heading {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.7rem;
  }

  h5 {
    font-weight: bold;
  }

  h6 {
    font-style: italic;
  }

  ol,
  ul {
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  > * {
    margin-bottom: 10px;
  }
`;
