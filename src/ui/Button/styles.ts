import styled from "styled-components";
import { Link as BaseLink } from "react-router-dom";

export const Button = styled.button`
  all: unset;

  display: inline-block;
  padding: 10px 15px;
  font-size: 1.2rem;

  border-radius: 4px;
  border: 2px solid black;

  line-height: 1;
`;

export const Link = Button.withComponent(BaseLink);

export const ExternalLink = Button.withComponent("a");
