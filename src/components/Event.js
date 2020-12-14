import React, { useState, useEffect } from "react";

export default function Event(props) {
  const [cellWidth, setCellWidth] = useState(0);

  function updateDimensions() {
    setCellWidth(document.getElementsByClassName("c-cell")[0].offsetWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  });


 let label = "";

  switch (props.data.category) {
    case "1":
      label = "c-red";
      break;
    case "2":
      label = "c-blue";
      break;
    case "3":
      label = "c-green";
      break;
    case "4":
      label = "c-orange";
      break;
    case "5":
      label = "c-dark-blue";
      break;
    default:
      label = "";
      break;
  }

  return (
    <div
      className={label + " c-day-event"}
      style={{
        width: props.data.days * cellWidth - 1 + "px",
        top: props.data.row * 22 + "px",
      }}
    >
      <div className="c-day-text">{props.data.title}</div>
    </div>
  );
}
