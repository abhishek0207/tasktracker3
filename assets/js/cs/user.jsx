import React from 'react';


function User(params) {
  
    return <tr><td>{params.user.name} </td><td>{params.user.email}</td></tr>
}

export default function Users(params) {
    let users = _.map(params.users, (uu) => <User key = {uu.id} user = {uu} />)
    return <div>
    <table className="table table-striped">
<thead className="thead-dark">
<tr>
<th scope = "col">Name </th>
<th scope = "col"> Email </th>
</tr>
</thead>
<tbody>
    {users}
</tbody></table>
    </div>
}