import styled from "styled-components";
import { animated } from "react-spring";

export const Svg = styled.svg`
  width: 150px;
`;

export const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column
  align-items: center;
  justify-content: center;
`;

export const Text = styled(animated.p)``;