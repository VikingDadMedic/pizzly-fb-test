import React from "react";
import "./styles.css";

export default class Profile extends React.Component {
  render() {
    return (
      <code>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </code>
    );
  }
}
