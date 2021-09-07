
import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log("save catch:", err));
  };
  
  function cancel(name, interviewer) {
   transition(DELETING)
    const interview = {
      student: name,
      interviewer
    };
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(err => console.log("cancel catch:", err));
  };
  return (
    <article className="appointment">
      <Header time={props.time} /> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          interview={props.interview}
          onCancel={() => back()}
          save={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving appointment..."}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting Appointment..."}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
    </article>
  )
}
