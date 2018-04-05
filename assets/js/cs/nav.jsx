import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import api from '../api'
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  

  return <div className="navbar-text">
  <Form inline>
    <FormGroup>
      <Input type="text" name="name" placeholder="name"
             value={props.login.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Input type="password" name="pass" placeholder="password"
             value={props.login.pass} onChange={update} />
    </FormGroup>
    <Button onClick={create_token}>Log In</Button>
  </Form>
</div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  function logout(token) {
    if(confirm("do you want to logout?")) {
    props.dispatch({
      type: 'LOGOUT',
      token: null
    })
    
  }
  }
  let current_user = _.filter(props.users, (uu) => uu.id == props.token.user_id )
  console.log(props.users)
  console.log("current user is")
  console.log(current_user)
  return <div className="navbar-text">
    Hi {current_user[0].name} 
    <Button onClick = {() => logout(props.token) } className="btn btn-danger">Logout </Button> 
  </div>;
});

 function Nav(props) {
  let session_info;
  let new_task = null;
  let tasksnav = null;
  let usersnav = null;
  console.log("navs props are")
  console.log(props)
  if (props.token) {
   
    tasksnav =  <NavItem>
    <NavLink to="/tasks" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>
  </NavItem>
  usersnav = <NavItem>
    <NavLink to="/users" href="#" className="nav-link">Users</NavLink>
  </NavItem>
    new_task =  
    
    <NavItem>
    <NavLink to="/tasks/new" href="#" className="nav-link">Open New Task</NavLink>
  </NavItem>
    session_info = <Session token={props.token} users = {props.users} history = {props.history} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <ul className="navbar-nav mr-auto">
      <NavItem>
      <span className="navbar-brand">
      <NavLink to="/" exact={true} activeClassName="active" className="nav-link">TaskTracker</NavLink>
      </span>
      </NavItem>
      {tasksnav}
      {usersnav}
       {new_task}
      </ul>
      { session_info }
    </nav>
  );
}
function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);