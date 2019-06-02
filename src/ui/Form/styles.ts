import styled from 'styled-components/macro'

import { color, spacing } from '../Theme'

export const FormGroup = styled.div`
  margin-bottom: ${spacing('formGroupMargin')};
`

export const Label = styled.label`
  display: block;
  margin-bottom: ${spacing('labelMargin')};
`

export const Input = styled.input`
  all: unset;
  font-size: inherit;

  display: block;
  width: 100%;
  padding: ${spacing('inputPadding')};
  border: 1px solid ${color('neutral20')};
  box-sizing: border-box;
`

export const Textarea = styled.textarea`
  all: unset;
  font-size: inherit;

  display: block;
  width: 100%;
  padding: ${spacing('inputPadding')};
  border: 1px solid ${color('neutral20')};
  box-sizing: border-box;
`

export const SubmitGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > button:only-child {
    margin-left: auto;
  }
`
