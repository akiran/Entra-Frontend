import React from "react";
import { initGA, logPageView } from "../../utils/analytics.js";

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return this.props.children
  }
}
