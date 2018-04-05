import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api'

function UpdateTaskForm(params) {


  function updateFunction(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
      if(tgt.attr('name') == "status") {
      data[tgt.attr('name')] = tgt.is(':checked')
    }
    let action = {
      type: 'UPDATE_TASK_FORM',
      data: data,
    };
    
    console.log(action);
    params.dispatch(action);
  }

  function pushUpdate(taskId, data) {
    let assigner = ""
    if(typeof data.assigner === 'object') {
      assigner = data.assigner.id
    }
    else {
      assigner = data.assigner
    }
    let taskData = {
      title: data.title,
      status: data.status,
      time_taken: data.time_taken,
      createdBy_id: data.creator.id,
      assignedto_id: assigner,
      body: data.body
    }
    console.log(params.history)
    if(params.taskForm.time_taken % 15 == 0) {
      api.updateCreatedTask(taskId, taskData, params.history)
    }
    else {
      alert("Please enter time taken in increments of 15 minutes")
    }
    
  }

  
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  
  
    return (
    <div style={{padding: "4ex"}}>
      <h2>Update Task</h2>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" value={params.taskForm.title} onChange={updateFunction}/>
      </FormGroup>
      <FormGroup>
        <Label for="body">Body</Label>
        <Input type="textarea" name="body" value={params.taskForm.body}  onChange={updateFunction} />
      </FormGroup>
    <FormGroup>
        <Label for="status">Status</Label>
        <Input type="checkbox" name="status" value={params.taskForm.status}  onChange={updateFunction} />
      </FormGroup>
      <FormGroup>
  <Label for="createdBy_id">Created By</Label>
      <Input type="text" name="createdBy_id" value={params.taskForm.creator.id} onChange={updateFunction} />
    </FormGroup> 
      <FormGroup>
      <Label for="Assignedto_id">Assigned To</Label>
      <Input id="assignedTo" type="select" style={{height: "auto"}} name="assigner" value={params.taskForm.assigner.id}  onChange={updateFunction}>
        { users }
      </Input>
      </FormGroup>

      <FormGroup>
      <Label for="time_taken">Time Taken for this task</Label>
      <Input type= "number" name="time_taken" step = "15" value={params.taskForm.time_taken} onChange={updateFunction} />
      </FormGroup>
      <Button onClick= {() => pushUpdate(params.taskId, params.taskForm)} color="primary">Update</Button>
      </div>
      )
  }

function state2props(state, props) {
    console.log("rerender", state);
      return { taskForm: state.updateTask,
                users: state.users}  
  }

export default connect(state2props)(UpdateTaskForm);