import React, { Component } from "react";

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Loading"
    };
  }
  componentDidMount() {
    const stopper = "Loading....";
    this.interval = setInterval(
      () =>
        this.state.text === stopper
          ? this.setState({ text: "Loading." })
          : this.setState(currentState => ({
              text: `${currentState.text}.`
            })),
      300
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <p className="uppercase font-bold">{this.state.text}</p>;
  }
}

export default Loading;
