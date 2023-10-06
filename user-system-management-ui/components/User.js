import React from 'react'

const User = ({user, deleteUser, editUser}) => {
  //console.log(user);
  return (
    <tr key={user.id}>
      <td className="px-6 py-4 text-left whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.firstName}</div>
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.lastName}</div>
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.emailId}</div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <a onClick={(e, id) => editUser(e, user.id)} className="mr-4 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer" href="">Edit</a>
        <a onClick={(e, id)=>deleteUser(e, user.id) } className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer" href="">Delete</a>
      </td>
    </tr>
  )
}

export default User