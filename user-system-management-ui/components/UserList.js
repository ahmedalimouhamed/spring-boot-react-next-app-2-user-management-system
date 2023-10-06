
import {React, useState, useEffect} from "react";
import User from "./User";
import EditUser from "./EditUser";


const UserList = ({user}) => {

  const USER_API_BASE_URL = "http://localhost:8180/api/v1/users";

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await fetch(USER_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        const users = await response.json();
        setUsers(users);
      }catch(error){
        console.log(error)
      }
      setLoading(false);
    };
    fetchData();
  }, [user, responseUser]);
  
  const deleteUser = (e, id) => {
    e.preventDefault();
    fetch(USER_API_BASE_URL + "/" + id, {
      method: "DELETE"
    }).then((res) => {
      if(users){
        setUsers(prevElement => {
          return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  }

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex border-b shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium tracking-wide text-left text-gray-500 uppercase">First Name</th>
                <th className="px-6 py-3 font-medium tracking-wide text-left text-gray-500 uppercase">Last Name</th>
                <th className="px-6 py-3 font-medium tracking-wide text-left text-gray-500 uppercase">Email Id</th>
                <th className="px-6 py-3 font-medium tracking-wide text-right text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                { users?.map((user) => (
                    <User user= {user} key={user.id} deleteUser={deleteUser} editUser={editUser} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser}/>
    </>
  )
}

export default UserList