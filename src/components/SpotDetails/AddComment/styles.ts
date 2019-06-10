import styled from 'styled-components'

import { spacing } from '../../../ui/Theme'

export const Wrapper = styled.form`
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
