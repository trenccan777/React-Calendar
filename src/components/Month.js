import React, { Component } from 'react';
import Day from './Day';
import DayNames from './DayNames';

export default class Month extends Component {
  constructor() {
    super();

    this.state = {
      rawEvents: [],
    };

    this.events = [];
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevState) {
    let prevMonth = prevState.data.currentMonth;
    let currentMonth = this.props.data.currentMonth;
    if (prevMonth !== currentMonth) {
      this.getData();
    }
  }

  getData() {
    let currentMonth = this.props.data.currentMonth;
    let currentYear = this.props.data.currentYear;

    currentMonth =
      currentMonth.toString().length === 1 ? '0' + currentMonth : currentMonth;

    fetch(
      'http://snslp.local/wp-json/react/v1/calendar/' +
        currentYear +
        '-' +
        currentMonth +
        '-01'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data === 'no-events' ? [] : data;
        this.setState({
          rawEvents: data,
        });
      });
  }

  /**
   * @returns {Array} - array of edited events
   */
  splitWeeks() {
    let events = [];
    let prevWeekNumber = false;
    let betweenWeekEvents = [];
    //Check events which continue troughout weeks and create new
    this.state.rawEvents.forEach((rawEvent) => {
      let dayInWeek =
        new Date(rawEvent.date).getDay() === 0
          ? 7
          : new Date(rawEvent.date).getDay();
      let weekNumber = new Date(rawEvent.date).getWeekNumber();
      //Init first week in loop
      prevWeekNumber = prevWeekNumber ? prevWeekNumber : weekNumber;

      //Each new week reset array of rows in week
      if (prevWeekNumber < weekNumber) {
        events = [...events, ...betweenWeekEvents];
        betweenWeekEvents = [];
        prevWeekNumber = weekNumber;
      }

      //kazdy tyzden na zaciatok doplnit datumy
      if (dayInWeek + rawEvent.days > 8) {
        let newDays = dayInWeek + rawEvent.days - 8;
        let incrementDate = 8 - dayInWeek;
        let newDate = new Date(rawEvent.date);
        newDate.setDate(newDate.getDate() + incrementDate);
        newDate = newDate.toISOString().slice(0, 10);
        betweenWeekEvents.push({
          date: newDate,
          days: newDays,
          title: rawEvent.title,
          category: rawEvent.category,
          url: rawEvent.url,
        });
      }
      events.push(rawEvent);
    });

    events = [...events, ...betweenWeekEvents];
    return events;
  }

  /**
   * @param {Array} - edited events about new weeks
   * @returns {Array} - array of events to render
   */
  prepareRenderData(events) {
    let rowsInWeek = [];
    let output = [];
    let prevWeekNumber = false;

    events.forEach((event) => {
      let weekNumber = new Date(event.date).getWeekNumber();
      let dayInWeek =
        new Date(event.date).getDay() === 0 ? 7 : new Date(event.date).getDay();
      let eventLength = event.days;

      //Init first week in loop
      prevWeekNumber = prevWeekNumber ? prevWeekNumber : weekNumber;

      //Each new week reset array of rows in week
      if (prevWeekNumber < weekNumber) {
        rowsInWeek = [];
        prevWeekNumber = weekNumber;
      }

      if (rowsInWeek.length === 0) {
        //Add first array with first row array
        rowsInWeek.push({
          day: [dayInWeek],
          eventLength: [dayInWeek + eventLength],
        });
        output.push({
          date: event.date,
          days: eventLength,
          row: 0,
          title: event.title,
          category: event.category,
          url: event.url,
        });
        return;
      }

      //Row array loop
      for (let i = 0; i < rowsInWeek.length; i++) {
        //x1 exists in array?
        if (rowsInWeek[i].day.includes(dayInWeek)) {
          //Next array exists?
          if (rowsInWeek[i + 1] !== undefined) {
            continue;
          }
          //Create array
          else {
            rowsInWeek.push({
              day: [dayInWeek],
              eventLength: [dayInWeek + eventLength],
            });
            output.push({
              date: event.date,
              days: eventLength,
              row: i + 1,
              title: event.title,
              category: event.category,
              url: event.url,
            });
            return;
          }
        } else {
          let lengths = rowsInWeek[i].eventLength.sort();
          if (lengths[lengths.length - 1] <= dayInWeek) {
            rowsInWeek[i].day.push(dayInWeek);
            rowsInWeek[i].eventLength.push(dayInWeek + eventLength);
            output.push({
              date: event.date,
              days: eventLength,
              row: i,
              title: event.title,
              category: event.category,
              url: event.url,
            });
            return;
          } else {
            //Next array exists?
            if (rowsInWeek[i + 1] !== undefined) {
              continue;
            }
            //Create array
            else {
              rowsInWeek.push({
                day: [dayInWeek],
                eventLength: [dayInWeek + eventLength],
              });
              output.push({
                date: event.date,
                days: eventLength,
                row: i + 1,
                title: event.title,
                category: event.category,
                url: event.url,
              });
              return;
            }
          }
        }
      }
    });

    this.events = output;
  }

  addEvents(calendarNextDay) {
    let dayEvents = [];
    this.events.forEach((event) => {
      if (calendarNextDay === event.date) {
        dayEvents.push({
          days: event.days,
          row: event.row,
          title: event.title,
          category: event.category,
        });
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

      let data = { date: nextDayString, events: this.addEvents(nextDayString) };

      days.push(<Day selectedMonth={currentMonth} key={i} data={data} />);

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
    this.prepareRenderData(this.splitWeeks());
    let monthMatrix = this.createMonthMatrix();
    return (
      <div id="calendar-table" className="c-table">
        <DayNames />
        {monthMatrix}
      </div>
    );
  }
}

/**
 * Get week Number
 * @returns {number} - weekNumber
 */
// eslint-disable-next-line
Date.prototype.getWeekNumber = function () {
  var d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};
