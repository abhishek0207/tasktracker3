import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api'

function UserForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_USER_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }
  
  function submit(ev) {
    console.log("Should create User.");
    console.log(params.userForm);
   validateInput()
  }
  
  function validateInput() {
    console.log("entered validate input")
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(params.userForm.email) ) {
      if(params.userForm.name.length == 0) {
        alert('name is empty')
        return false
      }
      else {
        if(params.userForm.password.length == 0)
        {
          alert("password is empty")
          return false
        }
        else {
          api.submit_user(params.userForm, params.history);
        }
      }
    }
    else {
      alert("invalid email")
      return false
    }
  }
    return (
    <div style={{padding: "4ex"}}>
      <FormGroup>
        <Label for="title">Email</Label>
        <Input type="text" name="email" onChange={update} value={params.userForm.email} required />
      </FormGroup>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" onChange={update} value={params.userForm.name} required/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" value={params.userForm.password} onChange={update} required />
      </FormGroup>
      <Button onClick= {submit} color="primary">Add user</Button>
</div> )
  }

function state2props(state, props) {
    console.log("rerender", state);
      return { userForm: state.userForm}  
  }

export default connect(state2props)(UserForm);