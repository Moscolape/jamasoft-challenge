import React, { useCallback, useEffect, useState } from "react";
import useUsers, { User } from "@/hooks/useUsers";
import { Flex, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "@/App.css";
import AddUserForm from "./userForm";

// Define a functional component for listing users
const UserList: React.FC = React.memo(() => {
  // Extract users, loading state, and deleteUser function from custom hook
  const { users, loading, deleteUser } = useUsers();
  
  // State to control the visibility of the AddUserForm modal
  const [showModal, setShowModal] = useState<boolean>(false);
  
  // State to manage the list of users
  const [userList, setUserList] = useState<User[]>(users);

  // Function to show the AddUserForm modal
  const addNewUser = useCallback(() => {
    setShowModal(true);
  }, []);

  // Update userList when the users prop changes
  useEffect(() => {
    if (users) {
      setUserList(users);
    }
  }, [users]);

  // Callback function to handle addition of a new user
  const handleUserAdded = useCallback((newUser: User) => {
    setUserList((prevUserList) => {
      const updatedUsers = [...prevUserList, newUser];
      sessionStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }, []);

  // Render a spinner while data is loading
  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner
          color="blue.500"
          speed="0.65s"
          thickness="3px"
          size="lg"
          emptyColor="gray.100"
        />
      </Flex>
    );
  }

  // Render the user list and the AddUserForm modal
  return (
    <div className="flex flex-col py-5 bg-gray-100 min-h-screen">
      {/* Header section with a title and button to add a new user */}
      <div className="w-full flex justify-between items-center p-5 mb-5 fixed top-0 bg-gray-100 z-30 h-[10vh]">
        <h1 className="text-4xl font-bold text-blue-600 font-Poppins animate-bump">
          All Users
        </h1>
        <button
          className="bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-800 transition-colors duration-300 font-Montserrat"
          title="new user"
          onClick={addNewUser}
        >
          Create New User
        </button>
      </div>
      
      {/* Render message if there are no users */}
      {userList.length === 0 ? (
        <Flex height="60vh" alignItems="center" justifyContent="center">
          <span className="text-red-600 font-semibold">No users!!</span>
        </Flex>
      ) : (
        /* Render a grid of user cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-5 font-Inter relative top-[10vh]">
          {userList.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-fadeUp"
            >
              {/* Link to user detail page */}
              <Link
                to={`/user/${user.id}`}
                className="block"
                title="view details"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              {/* Button to delete the user */}
              <button
                onClick={() => deleteUser(user.id)}
                className="w-1/3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 mt-6"
                title="delete"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render AddUserForm modal if showModal is true */}
      {showModal && (
        <AddUserForm
          close={() => setShowModal(false)}
          onUserAdded={handleUserAdded}
        />
      )}
    </div>
  );
});

export default UserList;