import Event from "./Event";

import React, { Component } from "react";

export default class Day extends Component {

  getCurrentDate() {
    let currentDate = new Date();
     currentDate.setDate(
      currentDate.getDate()
    );

    return currentDate = currentDate.toISOString().slice(0, 10);
  }

  render() {
    let events = this.props.data.events;
    let selectedEvents = "";
    let i = 0;
    if (events.length !== 0) {
      selectedEvents = events.map((event) => {
        i++;
        return <Event data={event} key={i} />;
      });
      i = 0;
    }

    
    return (


      <div className={"c-day c-cell " + (this.getCurrentDate() === this.props.data.date ? 'c-day-current' : '')}>
        <div className="c-day-number">{this.props.data.date.slice(-2)}</div>
        <div id={this.props.data.date} className="c-day-content">
          {selectedEvents}
        </div>
      </div>
    );
  }
}
