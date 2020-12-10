import React, { Component } from "react";
import Month from "./Month";
import MonthSwitcher from "./MonthSwitcher";

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
    };

    this.monthSwitchHandler = this.monthSwitchHandler.bind(this);
  }

 

  monthSwitchHandler(e) {
    let newMonth = this.state.currentMonth;
    let newYear = this.state.currentYear;

    if (e.target.name === "next-month") {
      newYear = newMonth === 12 ? newYear + 1 : newYear;
      newMonth = newMonth === 12 ? 1 : newMonth + 1;
    } else {
      newYear = newMonth === 1 ? newYear - 1 : newYear;
      newMonth = newMonth === 1 ? 12 : newMonth - 1;
    }

    this.setState({
      currentMonth: newMonth,
      currentYear: newYear,
    });
  }

  render() {

    return (
      <div>
        <MonthSwitcher
          data={this.state}
          monthSwitchHandler={this.monthSwitchHandler}
        />
        <Month data={this.state}/>

      </div>
    );
  }
}
