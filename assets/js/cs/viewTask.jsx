import React from 'react';
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap';
import UpdateTaskForm from './editTask'

export default function ViewTask(params) {
    let someObject = params.task
    console.log("some object is")
    console.log(someObject)
    return(
        <div>
        <div class="card" style={{width: '18' + 'em'}}>
         <div class="card-body">
         <h5 class="card-title">{someObject[0].title}</h5>
         <p class="card-text">{someObject[0].body}</p>
         <p class="card-text"> Created By: <a href="/users" class="card-link">{someObject[0].creator.name}</a></p>
         <p class="card-text"> Assigned To: <a href="/users" class="card-link">{someObject[0].assigner.name}</a></p>

         </div>
</div>
<div>
        <UpdateTaskForm history = {params.history} task = {someObject[0]} taskId = {someObject[0].id} />
   </div>
   </div>

    )
   
}
