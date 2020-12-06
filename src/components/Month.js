import React, { Component } from "react";
import Day from "./Day";

export default class Month extends Component {
  constructor() {
    super();
    this.state = {
      calendarMatrix: [
        { day: "30112020", data: [] },
        { day: "01122020", data: [] },
        { day: "02122020", data: [] },
        { day: "03122020", data: [] },
        { day: "04122020", data: [] },
      ],

      events: [
        { day: "30112020", days: 2, title: "toto je nadpis" },
        { day: "30112020", days: 1, title: "toto je nadpis 2" },
        { day: "30112020", days: 3, title: "toto je nadpis 3" },
        { day: "01122020", days: 2, title: "toto je nadpis  prveho" },
        { day: "03122020", days: 2, title: "toto je nadpis  tretieho" },
        { day: "04122020", days: 3, title: "toto je nadpis stvrteho" },
      ],
    };
  }

  render() {
    let calendarDays = [
      { day: "30112020", data: [] },
      { day: "01122020", data: [] },
      { day: "02122020", data: [] },
      { day: "03122020", data: [] },
      { day: "04122020", data: [] },
    ];

    this.state.events.forEach((event) => {
      calendarDays.forEach((calendarDay, index) => {
        if (event.day !== calendarDay.day) {
          return;
        }

        if (calendarDay.data.length === 0) {
          calendarDay.data.push(event);

          if (!event.days > 1) {
            return;
          }

          for (let i = 1; i < event.days; i++) {
            if (calendarDays[index + 1] !== undefined) {
              calendarDays[index + i].data.push(event);
            }
          }
        } else {
          let dayRowsCount = calendarDay.data.length;
          calendarDay.data.push(event);

          if (!event.days > 1) {
            return;
          }

          for (let i = 1; i < event.days; i++) {
            if (calendarDays[index + i] === undefined) {
              return;
            }
            //Add empty for all undefined rows in next days
            for (let a = 0; a <= dayRowsCount; a++) {
              if (a === dayRowsCount) {
                calendarDays[index + i].data.push(event);
              }

              if (calendarDays[index + i].data[a] === undefined) {
                calendarDays[index + i].data.push({day: 'empty'});
              }
            }
          }
        }
      });
    });

    console.log(calendarDays);

    return <div>data</div>;
  }
}
