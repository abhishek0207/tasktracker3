import React from 'react';
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api'

function Task(params) {
    let status = "Not Complete"
    if(params.task.status) {
        status = "Complete"
    }

    function deleteTask(taskid, history) {
        api.deleteTask(taskid, history)
    }

    function updateForm(task, id, params) {
        api.updateForm(task, id)

    }
return (
    <tr>
        <th scope="row">
            {params.task.id} </th>
    <td>
     {params.task.title}</td>
     <td>
         {params.task.time_taken}
         </td>
        <td>{status}</td>
         <td>{params.task.creator.name}</td>
         <td>{params.task.assigner.name}</td>
         <td>
         <Link to={"/task/" + params.task.id} onClick= {function() {updateForm(params.task, params.task.id, params)}} > View/Edit </Link>
         <Button onClick = {function() {deleteTask(params.task.id, params.history)}}> Delete </Button>
         </td>
         </tr>  )
   
}

export default function Tasks (params) {
    let tasks = _.map(params.tasks, (uu) => <Task key = {uu.id} task = {uu} history = {params.history} />)
    
    return <div>
        <table className="table table-striped">
<thead className="thead-dark">
<tr>
<th scope ="col"> # </th>
<th scope = "col">Title </th>
<th scope = "col"> TimeTaken </th>
<th scope = "col">Status </th>
<th scope = "col">Created By </th>
<th scope = "col">Assigned To </th>
<th></th>
</tr>
</thead>
    <tbody>
        {tasks}
</tbody></table>
        </div>
        
}