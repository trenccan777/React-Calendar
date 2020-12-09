import React from "react";
import Event from "./Event";

export default function Day(props) {
  let events = props.data.events;
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
    <div className="c-day c-cell">
      <span>{props.data.date.slice(-2)}</span>
      <div id={props.data.date} className="c-day-content">
        {selectedEvents}
      </div>
    </div>
  );
}
