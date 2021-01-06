import React, { useState, useEffect } from "react";
import Month from "./Month";
import MonthSwitcher from "./MonthSwitcher";
import CalendarCategories from "./CalendarCategories";

export const LangContext = React.createContext();

export default function Calendar() {
  const [lang, setLang] = useState("");
  const [calendarData, setCalendarData] = useState({
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
  });

  useEffect(() => {
    let originalLang = document.getElementsByClassName("wpml-ls-native");
    if (originalLang.length !== 0) {
      let newLang = originalLang[0].getAttribute("lang") === "en" ? "sk" : "en";
      setLang(newLang);
    }
  }, []);

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
      <LangContext.Provider value={lang}>
        <MonthSwitcher
          data={calendarData}
          monthSwitchHandler={monthSwitchHandler}
        />
        <CalendarCategories />
        <Month lang={lang} data={calendarData} />
      </LangContext.Provider>
    </div>
  );
}
