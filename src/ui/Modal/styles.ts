import styled from 'styled-components/macro'

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow-y: auto;

  background: rgba(0, 0, 0, 0.45);
  overscroll-behavior: none;
`
