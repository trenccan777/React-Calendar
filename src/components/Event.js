import React, { Component } from "react";

export default class Event extends Component {
  constructor() {
    super();
    this.state = {
      cellWidth: 0,
    };
  }

  updateDimensions = () => {
    this.setState({
      cellWidth: document.getElementsByClassName("c-cell")[0].offsetWidth,
    });
  };

  componentDidMount() {
    this.setState({
      cellWidth: document.getElementsByClassName("c-cell")[0].offsetWidth,
    });

    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const eventWidth = this.props.data.days * this.state.cellWidth - 1 + "px";
    const eventRow = this.props.data.row * 22 + "px";

    return (
      <div
        className={this.props.data.label + " c-day-event"}
        style={{
          width: eventWidth,
          top: eventRow,
        }}
      >
        {this.props.data.title}
      </div>
    );
  }
}
