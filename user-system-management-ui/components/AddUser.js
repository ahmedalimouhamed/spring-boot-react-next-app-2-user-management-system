import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import UserList from '../components/UserList'

const AddUser = () => {
  const USER_API_BASE_URL = "http://localhost:8180/api/v1/users";
  
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const [responseUser, setResponseUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  })
  
  function closeModal(){
    setIsOpen(false);
  }
  
  function openModal(){
    setIsOpen(true);
  }

  const saveUser = async (e) => {
    e.preventDefault();
    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if(!response.ok){
      throw new Error("Something went wrong");
    }
    const _user = await response.json();
    setResponseUser(_user);
    reset(e);
    
  };

  const reset = (e) => {
    e.preventDefault();
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
    setIsOpen(false);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({...user, [event.target.name]: value});
  }
  
  return (
    <>
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button onClick={openModal} className="px-6 py-2 font-semibold text-white rounded bg-slate-600 hover:bg-slate-800">Add User</button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child 
            as={Fragment} 
            enter="ease-out duration-300" 
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in dduration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left transform bg-white rounded shadow-xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Add new User</Dialog.Title>
                <div className="flex max-w-md mx-auto">
                  <div className="py-2">
                    <div className="my-4 h-14">
                      <label className="block text-sm font-normal text-gray-600">FirstName</label>
                      <input type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} className="h-10 px-2 py-2 mt-2 border w-96"/>
                    </div>
                    <div className="my-4 h-14">
                      <label className="block text-sm font-normal text-gray-600">LastName</label>
                      <input type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} className="h-10 px-2 py-2 mt-2 border w-96"/>
                    </div>
                    <div className="my-4 h-14">
                      <label className="block text-sm font-normal text-gray-600">emailId</label>
                      <input type="text" name="emailId" value={user.emailId} onChange={(e) => handleChange(e)} className="h-10 px-2 py-2 mt-2 border w-96"/>
                    </div>
                    <div className="pt-4 my-4 space-x-4 h-14">
                      <button onClick={saveUser} className="px-6 py-2 font-semibold text-white bg-green-400 rounded hover:bg-green-700">Save</button>
                      <button onClick={reset} className="px-6 py-2 font-semibold text-white bg-red-400 rounded hover:bg-red-700">Close</button>
                    </div>
                  </div>
                </div>
              </div>
              
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <UserList user={responseUser}/>
    </>

  )
}

export default AddUser