import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserSelect from "./pages/UserSelect";
import Protected from "./pages/Protected";
import Dashboard from "./components/Dashboard";
import LoginForm from "./pages/Authentication";
import Elections from "./components/ElectionsPage";
import QueriesPage from "./components/Queries";
import VotePage from "./components/VotePage";
import ResultsPage from "./components/Results";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LoginForm />} />
        <Route path="home" element={<Home />} />
        <Route path="user-select" element={<UserSelect />} />
        <Route path="login" element={<Login />} />
        <Route path="protected" element={<Protected />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="elections" element={<Elections/>} />
        <Route path="queries" element={<QueriesPage/>} />
        <Route path="vote" element={<VotePage/>} />
        <Route path="results" element={<ResultsPage/>} />
        <Route path="*" element={<Navigate to="/" />} />
        
      </Route>
    </>
  ),
  // { basename: import.meta.env.DEV ? "/" : "/react-face-auth/" }
  { basename: "/" }
);

export default router;
