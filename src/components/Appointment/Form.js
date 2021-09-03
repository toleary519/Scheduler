
import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || 1)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input onSubmit={event => event.preventDefault()}
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        
        <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={event => event.setName("")} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  )

}