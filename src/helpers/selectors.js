
export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter(days => days.name === day)
  if (filteredDay.length === 0) {
    return [];
  }
  const apptArray = filteredDay[0].appointments;
  const daysAppointments = apptArray.map(appt => state.appointments[appt])
  
  return daysAppointments;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const getInterviewOutput = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  }
  return getInterviewOutput;
}


