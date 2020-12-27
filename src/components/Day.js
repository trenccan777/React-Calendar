import DayModal from './DayModal';
import Event from './Event';
import React from 'react';

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

  return (
    <div
      className={
        'c-day c-cell ' +
        (getCurrentDate() === props.data.date ? 'c-day-current' : '') +
        ' ' +
        prevNextMonth()
      }
    >
      <div className="c-day-number ">{props.data.date.slice(-2)}</div>
      <div id={props.data.date} className="c-day-content">
        {prepareEvents(props).slice(0, 4)}
      </div>
      {prepareEvents(props).length > 4 ? (
        <DayModal events={props.data.events} />
      ) : (
        ''
      )}
    </div>
  );
}

function prepareEvents(props) {
  let events = props.data.events;
  let selectedEvents = [];

  if (events.length === 0) return selectedEvents;

  events.forEach((event, i) => {
    selectedEvents.push(<Event data={event} key={i} />);
  });

  return selectedEvents;
}
