import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { Routes, Route, useNavigate } from "react-router";
import * as parkService from "./services/parkService.js";
import * as proposalService from "./services/proposalService";
import NavBar from "./components/NavBar/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import SignInForm from "./components/SignInForm/SigninForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import ParkList from "./components/ParkList/ParkList.jsx";
import ProposalList from "./components/ProposalList /ProposalList.jsx";
import ParkDetails from "./components/ParkDetails/ParkDetails.jsx";
import ProposalDetails from "./components/ProposalDetails/ProposalDetails.jsx";
import ProposalFormBig from "./components/ProposalForm/ProposalFormBig.jsx";
import AdminSignInForm from "./components/SignInForm/AdminSigninForm.jsx"
import AdminSignUpForm from "./components/SignUpForm/AdminSignUpForm.jsx"
import AdminLanding from "./components/Landing/AdminLanding.jsx";
import AdminParkList from "./components/ParkList/AdminParkList.jsx"
import AdminParkDetails from "./components/ParkDetails/AdminParkDetails.jsx"
import "./App.css";


const App = () => {
  const [parks, setParks] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [parkList, setParkList] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllParks = async () => {
      const parksData = await parkService.index();
      setParks(parksData);
    };
    const fetchAllProposals = async () => {
      const proposalsData = await proposalService.indexAllProposals();
      setProposals(proposalsData);
    };
    if (user) fetchAllParks(), fetchAllProposals();
  }, [user]);

  // console.log(user)


  return (
    <>
 
{/* <NavBar/> */}
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard parks={parks} proposals={proposals} /> : <Landing />}
        />
        <Route
          path="/admin"
          element={user?.isAdmin ? <AdminDashboard parks={parks} proposals={proposals} /> : <AdminLanding />}
        />
        {user ? (
          <>
            {/* protected routes */}
            <Route path="/parks" element={<ParkList parks={parks} proposals={proposals} />} />
            <Route path="/proposals" element={<ProposalList proposals={proposals} />} />
            <Route path="/parks/:parkId" element={<ParkDetails/>}/>
            <Route path="/parks/:parkId/proposals/:proposalId" element={<ProposalDetails />} />
            <Route path="/parks/:parkId/proposals/:proposalId/edit" element={<ProposalFormBig />} />
          
            <Route path="/admin/parks" element={<AdminParkList parks={parks} proposals={proposals} />} />
            <Route path="/admin/parks/:parkId" element={<AdminParkDetails/>} />

          </>
        ) : (
          <>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/admin/sign-in" element={<AdminSignInForm />} />
            <Route path="/admin/sign-up" element={<AdminSignUpForm />} />
          </>
        )}
       
      </Routes>
            {/* Footer */}
            <footer className="text-center py-4 bg-gray-100 text-sm">
        © 2025 kee.word.inc 
      </footer>
    </>
  );
};

export default App;
