import React, { useState } from "react";
import Month from "./Month";
import MonthSwitcher from "./MonthSwitcher";
import CalendarCategories from "./CalendarCategories";

export default function Calendar() {
  const [calendarData, setCalendarData] = useState({
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
  });

  function monthSwitchHandler(e) {
    let newMonth = calendarData.currentMonth;
    let newYear = calendarData.currentYear;

    if (e.target.name === "next-month") {
      newYear = newMonth === 12 ? newYear + 1 : newYear;
      newMonth = newMonth === 12 ? 1 : newMonth + 1;
    } else {
      newYear = newMonth === 1 ? newYear - 1 : newYear;
      newMonth = newMonth === 1 ? 12 : newMonth - 1;
    }

    setCalendarData({
      currentMonth: newMonth,
      currentYear: newYear,
    });
  }

  return (
    <div>
      <MonthSwitcher
        data={calendarData}
        monthSwitchHandler={monthSwitchHandler}
      />
      <CalendarCategories />
      <Month data={calendarData} />
    </div>
  );
}
