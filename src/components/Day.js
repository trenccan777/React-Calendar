import Event from "./Event";
import React from "react";

export default function Day(props) {


  function getCurrentDate() {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    return (currentDate = currentDate.toISOString().slice(0, 10));
  }


 function prevNextMonth() {

  
  let newDate = new Date(props.data.date);
  newDate.setDate(newDate.getDate());
  let cellMonth = newDate.getMonth() + 1;
  let selectedMonth = props.selectedMonth;

  return cellMonth === selectedMonth ? '' : 'prev-next-month';
   
 }





  function prepareEvents() {
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

    return selectedEvents;
  }

  return (
    <div
      className={
        "c-day c-cell " +
        (getCurrentDate() === props.data.date ? "c-day-current" : "")
      }
    >
      <div className={"c-day-number " + prevNextMonth()}>{props.data.date.slice(-2)}</div>
      <div id={props.data.date} className="c-day-content">
        {prepareEvents()}
      </div>
    </div>
  );
}
