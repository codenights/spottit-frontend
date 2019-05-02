import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;

  .map {
    flex: 2;
  }
`;

export const DetailsSection = styled.div`
  flex: 1;
  position: relative;
  z-index: 1001;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.75);
`;
