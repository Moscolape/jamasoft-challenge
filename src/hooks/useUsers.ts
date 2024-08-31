import { useState, useEffect, useCallback } from "react";
import { getUsers } from "@/services/api";
import { User } from "@/global.types";


const useUsers = () => {
  // State to store the list of users
  const [users, setUsers] = useState<User[]>([]);
  
  // State to manage the loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Callback function to fetch users from API and store in session storage
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getUsers();
      // Update the state with fetched users
      setUsers(response.data);
      // Store fetched users in session storage
      sessionStorage.setItem("users", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch users", error);
      // Display an alert if there is an error fetching users
      alert("Error fetching users!!");
    } finally {
      // Set loading to false after fetching
      setLoading(false);
    }
  }, []);

  // Effect to check session storage and fetch users if not present
  useEffect(() => {
    const storedUsers = sessionStorage.getItem("users");
    if (storedUsers) {
      // Use stored users if available
      setUsers(JSON.parse(storedUsers));
      setLoading(false);
    } else {
      // Fetch users if not in session storage
      fetchUsers();
    }
  }, [fetchUsers]);

  // Callback function to delete a user by ID
  const deleteUser = useCallback((id: number) => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      // Update the state and session storage with the filtered list
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== id);
        sessionStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    }
  }, []);

  // Return users, loading state, and deleteUser function for use in components
  return { users, loading, deleteUser };
};

export default useUsers;