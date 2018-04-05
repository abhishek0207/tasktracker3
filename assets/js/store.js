import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
    return state;
  }
function users(state = [], action) {
    return state;
  }

let empty_form = {
    title: "",
    body: "",
    status: "",
    timeTaken: 0,
    createdBy_id: "",
    assignedto_id: "",
    token: ""
};

let empty_user_form = {
  name: "",
  email: "",
  password: ""
};

let empty_task_update_form = {
  title: "",
  body: "",
  status: "",
  timeTaken: 0,
  createdBy_id: "",
  assignedto_id: ""
};

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      console.log(action.token)
      return action.token;
    case 'LOGOUT' :
      return null;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function userForm(state = empty_user_form, action ) {

  switch (action.type) {
    case 'UPDATE_USER_FORM':
      return Object.assign({}, state, action.data);
   case 'CLEAR_USER_FORM':
      return empty_user_form;
   case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }

}
function form(state = empty_form, action) {
    switch (action.type) {
      case 'UPDATE_FORM':
        return Object.assign({}, state, action.data);
     case 'CLEAR_FORM':
        return empty_form;
     case 'SET_TOKEN':
        return Object.assign({}, state, action.token);
      default:
        return state;
    }
  }
  function updateTask(state = empty_task_update_form, action) {
    switch (action.type) {
      case 'LOAD_TASK_FORM_DATA':
      console.log("entered in store")
        return Object.assign({}, state, action.data);
      case 'UPDATE_TASK_FORM':
        return Object.assign({}, state, action.data);
        default:
        return state;
    }
  }

  function tasks(state = [], action) {
    switch (action.type) {
    case 'TASKS_LIST':
      return [...action.tasks];
    case 'ADD_TASK':
      return [action.task, ...state];
    default:
      return state;
    }
  }
  
  function users(state = [], action) {
    switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    case 'ADD_USER':
    return [action.user, ...state];
    default:
      return state;
    }
  }
function root_reducer(state0, action) {
    console.log("reducer", action);
    // {posts, users, form} is ES6 shorthand for
    // {posts: posts, users: users, form: form}
    let reducer = combineReducers({tasks, users, form, login, token, updateTask, userForm});
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return deepFreeze(state1);
  };
let store = createStore(root_reducer);
export default store;