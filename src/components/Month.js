import React, { Component } from "react";
import Day from "./Day";

export default class Month extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //Number of days for a previous month
  // getDaysInPrevMonth() {
  //   return new Date(
  //     this.state.currentYear,
  //     this.state.currentMonth - 1,
  //     0
  //   ).getDate();
  // }

  //0-6 Sunday is the first month
  // getFirstDayInMonth() {
  //   return new Date(
  //     this.state.currentYear,
  //     this.state.currentMonth - 1,
  //     1
  //   ).getDay();
  // }

  createMonthMatrix() {
    const currentMonth = this.props.data.currentMonth;
    const currentYear = this.props.data.currentYear;
    const currentMonthLength = new Date(currentYear, currentMonth, 0).getDate();
    const currentMonthFirstDay =
      new Date(currentYear, currentMonth - 1, 1).getDay() === 0
        ? 7
        : new Date(currentYear, currentMonth - 1, 1).getDay();
    const currentMonthLastDay = new Date(
      currentYear,
      currentMonth - 1,
      currentMonthLength
    ).getDay();
    const prevMonthLength = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();

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
    console.log(calendarMonthLength);

  

  
  }

  render() {
    this.createMonthMatrix();
    return <h1>{this.props.data.currentMonth}</h1>;
  }
}
