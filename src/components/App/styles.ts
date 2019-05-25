import styled from "styled-components";

export const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1;
`;

export const ModalOnDesktopWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1001;
  display: flex;
  justify-content: center;
`;

export const ModalContent = styled.div`
  flex: 1;
  background: #fff;
  max-width: 680px;
`;
