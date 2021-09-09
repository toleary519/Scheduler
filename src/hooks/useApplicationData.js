import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function updateSpots(state, appointments) {
    const dayObj = state.days.find((d) => d.name === state.day);
    // console.log(dayObj);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      // console.log("appt:", appointment);
      if (!appointment.interview) {
        spots++;
      }
    }
    // console.log("spots = ", spots);
    const newDay = { ...dayObj, spots };
    const newDays = state.days.map((d) => (d.name === state.day ? newDay : d));
    return newDays;
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log("hit");
        setState({ ...state, appointments });
        updateSpots(state, appointments);
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        interview: null,
      })
      .then((res) => {
        setState({ ...state, appointments });
        updateSpots(state, appointments);
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
