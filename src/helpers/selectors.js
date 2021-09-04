
export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter(days => days.name === day)
  if (filteredDay.length === 0) {
    return [];
  }
  const apptArray = filteredDay[0].appointments;
  const daysAppointments = apptArray.map(appt => state.appointments[appt])
  
  return daysAppointments;
}

