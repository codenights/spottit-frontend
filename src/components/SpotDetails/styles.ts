import styled from 'styled-components/macro'

import { spacing, color } from '../../ui/Theme'

export const Header = styled.div`
  position: relative;
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

export const Body = styled.div`
  padding: ${spacing('contentPadding')};
  background: #fff;
`

export const AuthoredBy = styled.p`
  margin-bottom: ${spacing('default')};

  span {
    font-weight: bold;
  }
`

export const Comments = styled.ul`
  margin-top: ${spacing('default')};
  padding: ${spacing('contentPadding')};
  background: #fff;

  > li + li {
    margin-top: ${spacing('default')};
    padding-top: ${spacing('default')};
    border-top: 1px solid ${color('neutral10')};
  }
`

export const Comment = styled.div``

export const CommentHeader = styled.p`
  margin-bottom: 10px;
  color: ${color('neutral50')};
  font-style: italic;
`

export const AddComment = styled.form`
  margin-top: ${spacing('default')};
  background: #fff;

  textarea {
    display: block;
    width: 100%;
    padding: ${spacing('inputPadding')};
    font-size: inherit;
  }

  button {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`

export const ButtonWrapper = styled.div`
  padding: 10px;
`
