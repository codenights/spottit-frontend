import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  position: relative;

  .map {
    height: 100%;
  }
`;

export const DetailsSection = styled.div`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 1000;
`;
