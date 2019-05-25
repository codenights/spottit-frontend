import styled from "styled-components";

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  all: unset;
  font-size: inherit;
  border: 1px solid rgba(0, 0, 0, 0.25);
  display: block;
  width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  all: unset;
  font-size: inherit;
  border: 1px solid rgba(0, 0, 0, 0.25);
  display: block;
  width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
`;

export const SubmitGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > button:only-child {
    margin-left: auto;
  }
`;
