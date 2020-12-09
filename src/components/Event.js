import React from 'react'

export default function Event(props) {
    return (
        <div className={props.data.label + ' c-day-event'} style={{ width: props.data.days * 100 + 'px', top: props.data.row * 22 + 'px' }}>
            {props.data.title}
        </div>
    )
}
