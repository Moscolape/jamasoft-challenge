import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const UserList = lazy(() => import('@components/userList'))
const UserDetail = lazy(() => import('@components/userDetails'))

const App = () => (
  <Suspense
    fallback={
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner
          color="blue.500"
          speed="0.65s"
          thickness="3px"
          size="lg"
          emptyColor="gray.100"
        />
      </Flex>
    }
  >
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  </Suspense>
);

export default App;
