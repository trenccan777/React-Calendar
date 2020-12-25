import React, { useState, useEffect } from 'react';
import { cats } from '../shared';

export default function Event(props) {
  const [cellWidth, setCellWidth] = useState(0);

  function updateDimensions() {
    setCellWidth(document.getElementsByClassName('c-cell')[0].offsetWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  });

  return (
    <div
      className={cats[props.data.category] + ' c-day-event'}
      style={{
        width: props.data.days * cellWidth - 1 + 'px',
        top: props.data.row * 22 + 'px',
      }}
    >
      <div className="c-day-text">{props.data.title}</div>
    </div>
  );
}
