
import React from "react";

import "components/DayListItem.scss";
import classNames from 'classnames';

// function formatSpots(props) {
//   let spotString = "";
    
//     if (props.spots === 0) {
//       spotString = 'no spots remaining'
//     }
//     if (props.spots === 1) {
//       spotString = '1 spot remaining'
//     }
//     if (props.spots === 2) {
//       spotString = '2 spots remaining'
//     } else {
//       spotString = props.spots;
//     }
//   return spotString;
// }


export default function DayListItem(props) {
  
  const spotString = classNames(`${props.spots}`,{'no spots remaining': props.spots === 0, '1 spot remaining': props.spots === 1, '2 spots remaining': props.spots === 2});
  const dayClass = classNames('day-list__item',{'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0});
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{spotString}</h3>
    </li>
  );
}