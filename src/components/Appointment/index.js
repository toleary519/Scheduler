import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => {
        console.log("err:", err);
        transition(ERROR_SAVE, true);
      });
  }

  function cancel(name, interviewer) {
    transition(DELETING, true);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          save={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interview={props.interview}
          onCancel={() => back()}
          save={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving appointment..."} />}
      {mode === DELETING && <Status message={"Deleting Appointment..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Appointment cannot be saved." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Appointment cannot be deleted."
          onClose={() => back()}
        />
      )}
    </article>
  );
}
