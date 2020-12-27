import React from 'react';
import Event from './Event';

export default function DayModal(props) {
  function hiddenEventHandler(e) {
    e.target.parentElement.classList.add('active');
  }

  function closeBtnHandler(e) {
    e.target.parentElement.parentElement.classList.remove('active');
  }

  return (
    <>
      <button
        type="button"
        className="hidden-event-btn"
        onClick={hiddenEventHandler}
      >
        Viac ...
      </button>

      <div className="day-modal">
        {prepareEvents(props)}
        <div className="close-modal" onClick={closeBtnHandler}>
          &#10005;
        </div>
      </div>
    </>
  );
}

function prepareEvents(props) {
  let events = props.events;
  let selectedEvents = [];

  if (events.length === 0) return selectedEvents;

  events.forEach((event, i) => {
    selectedEvents.push(<Event data={event} modal={true} key={i} />);
  });

  return selectedEvents;
}
