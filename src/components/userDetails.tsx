import { arrowBack } from "@/constants/assets";
import { User } from "@/hooks/useUsers";
import { getUserById } from "@/services/api";
import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "@/App.css";

const UserDetail = () => {
  // Retrieve the user ID from the URL parameters
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null); // State to store user details
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status

  // Callback function to fetch user details based on the user ID
  const fetchUser = useCallback(async () => {
    if (!id) return; // Exit if no ID is provided
    try {
      const response = await getUserById(id); // Fetch user data from API
      setUser(response.data); // Update user state with fetched data
    } catch (error) {
      console.error("Failed to fetch user details", error); // Log errors to console
    } finally {
      setLoading(false); // Set loading to false once data is fetched or an error occurs
    }
  }, [id]);

  // Effect to call fetchUser when the component mounts or when `id` changes
  useEffect(() => {
    fetchUser(); // Fetch user details
  }, [fetchUser]);

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner
          color="blue.600"
          speed="0.65s"
          thickness="3px"
          size="lg"
          emptyColor="gray.100"
        />
      </Flex>
    );
  }

  // Display an error message if no user data is found
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        USER NOT FOUND!!!
      </div>
    );
  }

  // Render the user details if data is successfully fetched
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100 min-h-screen relative">
      {/* Back button to navigate to the previous page */}
      <Link to="/">
        <div className="bg-white p-3 rounded-full animate-hop hover:scale-110 absolute top-5 left-5">
          <img
            src={arrowBack}
            alt="go back"
            title="Go back"
            className="w-7 h-7"
          />
        </div>
      </Link>
      {/* User detail card */}
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-sm animate-fadeDown w-full max-w-lg mx-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 sm:mb-8 font-Poppins">
          {user.name} {/* Display the user's name */}
        </h1>
        <div className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
            Personal Info
          </h2>
          {/* Display user personal information */}
          <p className="mb-1 sm:mb-2">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="mb-1 sm:mb-2">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
        </div>
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">Address</h2>
          {/* Display user address information */}
          <p className="text-gray-600">
            {user.address?.street}, {user.address?.suite}
          </p>
          <p className="text-gray-600">
            {user.address?.city}, {user.address?.zipcode}
          </p>
        </div>
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">Company</h2>
          {/* Display user company information */}
          <p className="text-gray-600">{user.company?.name}</p>
          <p className="text-gray-600">{user.company?.catchPhrase}</p>
          <p className="text-gray-600">{user.company?.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;