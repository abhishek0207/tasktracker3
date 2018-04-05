import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api'

function TaskForm(params) {

  function submit(ev) {
    console.log("Should create task.");
    console.log(params.form);
    if(params.form.time_taken % 15 == 0) {
      api.submit_task(params.form, params.history);
    }
    else {
      alert("Please enter time taken in increments of 15 minutes")
    }
    
  }

  function updateForm(ev) {
    console.log("Should update task.");
    console.log(params.form);
   
    
    
  }

  function update(ev) {
    let current_user = _.filter(params.users, (uu) => uu.id == params.token.user_id )
    console.log(current_user)
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    
    if(tgt.attr('name') == "status") {
      data[tgt.attr('name')] = tgt.is(':checked')
    }
    data["createdBy_id"] = current_user[0].id
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    
    console.log(action);
    params.dispatch(action);
  }
  
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  let button = <div></div>
  let creator = <div></div>
  let current_user = _.filter(params.users, (uu) => uu.id == params.token.user_id )
  if(params.type == "new") {
    button = <Button onClick={submit} color="primary">Create</Button>
    creator =  <FormGroup>
   
    <Label for="createdBy_id">Created By</Label>
     {/*} <Input type="hidden" name="createdBy_id" value={params.form.createdBy_id} onChange={update} /> */ }
     {current_user[0].name}
    </FormGroup>
  }
  else {
    button = <Button onClick={updateForm} color="primary">Button</Button>
    creator =  <FormGroup>
    <Label for="createdBy_id">Created By</Label>
      <Input type="text" name="createdBy_id" value={params.form.creator.id} onChange={update} />
    </FormGroup> 
  }

    return (
    <div style={{padding: "4ex"}}>
      <h2>New Task</h2>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" value={params.form.title} onChange={update} required/>
      </FormGroup>
      <FormGroup>
        <Label for="body">Body</Label>
        <Input type="textarea"  name="body" value={params.form.body} onChange={update} required/>
      </FormGroup>
    <FormGroup>
        <Label for="status">Status</Label>
        <Input type="checkbox" name="status" value={params.form.status} onChange={update} required />
      </FormGroup>
     {creator}
      
      <FormGroup>
      <Label for="Assignedto_id">Assigned To</Label>
      <Input id="assignedTo" type="select" style={{height: "auto"}} name="assignedto_id" value={params.form.assignedto_id}  onChange={update} required>
        { users }
      </Input>
      </FormGroup>

      <FormGroup>
      <Label for="time_taken">Time Taken for this task</Label>
      <Input type= "number" name="time_taken" step = "15" value={params.form.time_taken} onChange={update} required />
      </FormGroup>
      {button}
      </div>
      )
  }

function state2props(state, props) {
    console.log("rerender", state);
    console.log("filled form is ", props.form)
    if(props.type == "new")
    {
      return { form: state.form};
    }
    if(props.type == "update") {
      return {form: props.form, taskId: props.taskId}
    }
    
  }

export default connect(state2props)(TaskForm);