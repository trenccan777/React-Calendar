import React, { useState, useEffect } from "react";
import { cats } from "../shared";

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

  function styling(props) {
    if (props.modal) {
      return {};
    } else {
      return {
        width: props.data.days * cellWidth - 1 + "px",
        top: props.data.row * 22 + "px",
      };
    }
  }

  return (
    <a
      href={props.data.url}
      className={`${cats[props.data.category]} c-day-event ${
        props.data.url === "#" ? "not-clickable-url" : ""
      }`}
      style={styling(props)}
    >
      <div className="c-day-text" title={props.data.title}>
        {props.data.title}
      </div>
    </a>
  );
}
