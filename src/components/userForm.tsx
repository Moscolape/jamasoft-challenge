import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { User } from "@/hooks/useUsers";
import { cancel } from "@/constants/assets";

// Interface defining the input fields for the user form
interface UserFormInput {
  name: string;
  email: string;
  phone: string;
}

// Props interface for the AddUserForm component
interface AddUserFormProps {
  close: () => void; // Function to close the form
  onUserAdded: (newUser: User) => void; // Callback function to handle new user addition
}

// Functional component for adding a new user
const AddUserForm: React.FC<AddUserFormProps> = React.memo(
  ({ close, onUserAdded }) => {
    // Initialize react-hook-form with UserFormInput type
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserFormInput>();

    // Handler function to be called when the form is submitted
    const onSubmit = (data: UserFormInput) => {
      // Trim the input values to remove extra whitespace
      const trimmedData = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
      };

      // Check if any of the trimmed values are empty
      if (!trimmedData.name || !trimmedData.email || !trimmedData.phone) {
        alert("All fields must be filled."); // Show alert if any field is empty
        return;
      }

      // Create a new user object with a unique ID
      const newUser = { id: Date.now(), ...trimmedData };

      // Retrieve existing users from local storage and add the new user
      const storedUsers = localStorage.getItem("users");
      const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update local storage

      // Call the callback function to update the user list in parent component
      onUserAdded(newUser);

      close(); // Close the modal after submission
    };

    // Reference to the modal div element for detecting clicks outside
    const modalRef = useRef<HTMLDivElement>(null);

    // Function to handle clicks outside the modal
    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          close(); // Close the modal if click is outside the modal
        }
      },
      [close]
    );

    // Effect to add and clean up the event listener for clicks outside the modal
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    return (
      <div className="w-screen h-screen bg-[#00000080] flex items-center justify-center z-50 fixed top-0 left-0">
        <div
          className="bg-white w-full sm:w-[35%] m-auto rounded-lg p-6 font-Inter animate-fadeDown relative"
          ref={modalRef} // Attach ref to the modal div
        >
          <img
            src={cancel}
            alt="close"
            className="cursor-pointer absolute top-3 right-3"
            title="close modal"
            onClick={close}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                {...register("name", { required: true })} // Register input with react-hook-form
                className="block border p-2 w-full rounded-lg hover:border-gray-400 outline-none mt-3"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span> // Display error message if name is missing
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                {...register("email", { required: true })} // Register input with react-hook-form
                className="block border p-2 w-full rounded-lg hover:border-gray-400 outline-none mt-3"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span> // Display error message if email is missing
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                {...register("phone", { required: true })} // Register input with react-hook-form
                className="block border p-2 w-full rounded-lg hover:border-gray-400 outline-none mt-3"
              />
              {errors.phone && (
                <span className="text-red-500">Phone is required</span> // Display error message if phone is missing
              )}
            </div>

            <div className="w-full flex justify-end mt-10">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                title="add"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default AddUserForm;
