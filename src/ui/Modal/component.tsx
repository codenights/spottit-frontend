import React from "react";
import ReactDOM from "react-dom";

import { Wrapper } from "./styles";

export class Modal extends React.Component {
  private el = document.createElement("div");

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <Wrapper>{this.props.children}</Wrapper>,
      this.el
    );
  }
}
