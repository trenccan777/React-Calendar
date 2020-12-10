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
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const eventWidth = this.props.data.days * this.state.cellWidth - 1 + "px";
    const eventRow = this.props.data.row * 22 + "px";
    let label = "";

    switch (this.props.data.category) {
      case "1":
        label = "c-red";
        break;
      case "2":
        label = "c-blue";
        break;
      case "3":
        label = "c-green";
        break;
      case "4":
        label = "c-orange";
        break;
      case "5":
        label = "c-dark-blue";
        break;
      default:
        label = "";
        break;
    }

    return (
      <div
        className={label + " c-day-event"}
        style={{
          width: eventWidth,
          top: eventRow,
        }}
      >
        <div className="c-day-text">{this.props.data.title}</div>
      </div>
    );
  }
}
