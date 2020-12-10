import React from "react";

export default function MonthSwitcher(props) {
  const date = new Date(props.data.currentYear, props.data.currentMonth - 1, 1);
  const month = date.toLocaleString("default", { month: "long" });
  return (
    <div id="month-switcher">
      <button
        name="prev-month"
        id="prev-month"
        type="button"
        onClick={props.monthSwitchHandler}
      >
        Prev
      </button>
      <div className="month-name">{month + " " + props.data.currentYear}</div>
      <button
        name="next-month"
        id="next-month"
        type="button"
        onClick={props.monthSwitchHandler}
      >
        Next
      </button>
    </div>
  );
}
