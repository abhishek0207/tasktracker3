import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Tasks from './task'
import Users from './user'
import Nav from './nav'
import TaskForm from './newTask'
import UserForm from './newUser'
import ViewTask from './viewTask'
import { Provider, connect} from 'react-redux';
import Session from './nav'
import {Redirect} from 'react-router'



export default function tasktracker_init(store) {
    console.log("called tasktracker")
    ReactDOM.render(
    <Provider store = {store }>
    <Tasktracker state = {store.getState()} />
    </Provider>, document.getElementById('root'))

}

let Tasktracker = connect((state) => state)((props) => {
    console.log("Tasks are")
    console.log(props)
    let current_user = ""
    if(props.token) {
        current_user = _.filter(props.users, (uu) => uu.id == props.token.user_id )
        console.log("main page currrent user is")
        console.log(current_user)
    }
    return(
        <Router>
            <div>
                <Nav users = {props.users} />
        <Route path = "/tasks" exact={true}   render = {({history}) =>
        <div>
            <h1>Tasks are </h1>
            <Tasks tasks = {props.tasks} history = {history} />
            </div>    
    
    } />

    <Route path = "/" exact={true}   render = {({history}) =>
    props.token ? (
        <div>
        <h3> Hello {current_user[0].name} </h3>
        <p>Welcome to tasktracker, start tracking your tasks from the navigation above </p>
        </div>
    ) : (
        <div>
        <h1>Welcome to Tasktracker, please login or Register below </h1>
        
    <h1>Add new user </h1>
        <UserForm history = {history} />
        </div>
            
    )
      
    } />

    <Route path ="/users" exact = {true} render = {() =>
    <div>
    <h1>Users are </h1>
        <Users users = {props.users} />
        </div>
    } 
    />
    <Route path ="/users/new" exact = {true} render = {({history}) =>
    props.token?(<div>
    <h1>Add new user </h1>
        <UserForm history = {history} />
        </div>) : <h5> You need to be logged in to see users </h5>
    } 
    />
    <Route path ="/task/:task_id" exact = {true} render = {({match, history}) =>
    
    props.token?(<div>
    <h1>Task Details </h1>
     <ViewTask users = {props.users} history = {history} task = {_.filter(props.tasks, (tt) => parseInt(match.params.task_id) == tt.id)} />
    </div>) : <h5> You need to be logged in to view task details </h5>}
    />
     <Route path ="/tasks/new" exact = {true}  render = {({history}) =>
      props.token ? (
        <div>
    <h1>Task are </h1>
        <TaskForm users={props.users} token = {props.token} type="new"  history={history} />
        </div>
    ) : (
       <h5> You need to be logged in to create tasks, please login from home </h5>
    )
   
    } 
    />
    </div>
            </Router>

    )
})