import styled from 'styled-components/macro'
import ReactMarkdown from 'react-markdown'

import { spacing } from '../../ui/Theme'

export const Header = styled.div`
  position: relative;
  margin: -${spacing('default')} -${spacing('default')} ${spacing('default')} -${spacing('default')};
`

export const SpotInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1002;
  padding: ${spacing('default')};
  padding-bottom: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;

  > :nth-child(2) {
    font-size: 1.2rem;
  }

  ::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  }
`

export const Wrapper = styled.div`
  padding: ${spacing('contentPadding')};
`

export const Markdown = styled(ReactMarkdown)`
  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  h4 {
    font-size: 1.6rem;
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
`

export const AuthoredBy = styled.p`
  margin-bottom: ${spacing('default')};

  span {
    font-weight: bold;
  }
`
