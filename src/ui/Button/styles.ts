import styled from "styled-components/macro";
import { Link as BaseLink } from "react-router-dom";

import { color, fontSize, spacing } from "../Theme";

export const Button = styled.button`
  all: unset;

  display: inline-block;
  border-radius: 4px;
  border: 2px solid ${color("neutral80")};
  padding: ${spacing("buttonPadding")};

  color: ${color("neutral80")};
  font-size: ${fontSize("button")};
  line-height: 1;
`;

export const Link = Button.withComponent(BaseLink);

export const ExternalLink = Button.withComponent("a");
