import React, { Component } from "react";
import Day from "./Day";
import DayNames from "./DayNames";

export default class Month extends Component {
  constructor() {
    super();
    this.state = {};
    this.events = [
      { date: "2020-01-01", days: 4, row: 1, title: 'event 1', label: 'c-red' },
      { date: "2020-01-01", days: 2, row: 2, title: 'event 1', label: 'c-red' },
      { date: "2020-01-01", days: 2, row: 3, title: 'event 1', label: 'c-blue' },
      { date: "2020-01-02", days: 1, row: 0, title: 'event 1', label: 'c-red' },
      { date: "2020-01-03", days: 1, row: 0, title: 'event 1', label: 'c-green' },
      { date: "2020-01-04", days: 3, row: 0, title: 'event 1', label: 'c-green' },
      { date: "2020-01-04", days: 1, row: 2, title: 'event 1', label: 'c-green' },
      { date: "2020-01-05", days: 1, row: 1, title: 'event 1', label: 'c-green' },
      { date: "2020-01-05", days: 3, row: 2, title: 'event 1', label: 'c-green' },
      { date: "2020-01-06", days: 1, row: 0, title: 'event 1', label: 'c-green' },
      { date: "2020-01-06", days: 2, row: 1, title: 'event 1', label: 'c-green' },
      { date: "2020-01-06", days: 1, row: 2, title: 'event 1', label: 'c-green' },
      { date: "2020-01-07", days: 2, row: 0, title: 'event 1', label: 'c-green' },
      { date: "2020-01-08", days: 2, row: 1, title: 'event 1', label: 'c-green' },
      { date: "2020-01-11", days: 3, row: 0, title: 'event 1', label: 'c-blue' },
      { date: "2020-01-13", days: 1, row: 0, title: 'event 1', label: 'c-blue' },
      { date: "2020-12-09", days: 2, row: 0, title: 'event 1', label: 'c-green' },
      { date: "2020-12-15", days: 3, row: 0, title: 'event 2', label: 'c-blue' },
    ];
  }

  addEvents(calendarNextDay) {
    let dayEvents = [];
    this.events.forEach(event => {
      if (calendarNextDay === event.date) {
        dayEvents.push({days: event.days, row: event.row, title: event.title, label: event.label});
      }
    });

    return dayEvents;
  }

  createMonthMatrix() {

    let monthMatrix = [];
    let days = [];
    const currentMonth = this.props.data.currentMonth;
    const currentYear = this.props.data.currentYear;
    const currentMonthLength = new Date(currentYear, currentMonth, 0).getDate();
    const currentMonthFirstDay =
      new Date(currentYear, currentMonth - 1, 1).getDay() === 0
        ? 7
        : new Date(currentYear, currentMonth - 1, 1).getDay();

    let calendarFirstDay = new Date(currentYear, currentMonth - 1, 1);
    calendarFirstDay.setDate(
      calendarFirstDay.getDate() - (currentMonthFirstDay - 1)
    );

    let calendarMonthLength =
      currentMonthLength + (currentMonthFirstDay - 1) <= 28
        ? 28
        : currentMonthLength + (currentMonthFirstDay - 1) <= 35
        ? 35
        : currentMonthLength + (currentMonthFirstDay - 1) <= 42
        ? 42
        : 42;

    //Create Month Matrix
    for (let i = 0; i < calendarMonthLength; i++) {
      let calendarNextDay = new Date(currentYear, currentMonth - 1, i + 1);
      calendarNextDay.setDate(
        calendarNextDay.getDate() - (currentMonthFirstDay - 2)
      );

      let nextDayString = calendarNextDay.toISOString().slice(0, 10);

      let data = {date: nextDayString , events: this.addEvents(nextDayString) }

      days.push(
        <Day key={i} data={data} />
      );

      if ((i + 1) % 7 === 0) {
        monthMatrix.push(
          <div key={i} className="c-week">
            {days}
          </div>
        );
        days = [];
      }
    }

    return monthMatrix;
  }

  render() {
    let monthMatrix = this.createMonthMatrix();
    return (
      <div id="calendar-table" className="c-table">
        <DayNames />
        {monthMatrix}
      </div>
    );
  }
}
