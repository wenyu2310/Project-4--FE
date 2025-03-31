import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import proposalService from "../../services/proposalService";
import feedbackService from "../../services/feedbackService"
import parkService from "../../services/parkService";
import mailinglistService from "../../services/mailinglistService";

import AdminNavBar from "../NavBar/AdminNavBar.jsx";

// const googleApi = `${import.meta.env.GOOGLE_API}`;

const ParkDetails = (props) => {
  const { user } = useContext(UserContext);
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchPark = async () => {
      const parkData = await parkService.show(parkId);
      setPark(parkData);
    };

    const fetchParkProposals = async () => {
      const proposalsData = await proposalService.indexParkProposals();
      setProposals(proposalsData);
    };
    
    if (user) {
      fetchPark();
      fetchParkProposals();

    }
  }, [parkId, user]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddProposal = async (proposalFormData) => {
    console.log(parkId);
    console.log(proposalFormData);
    const newProposal = await proposalService.createProposal(
      parkId,
      proposalFormData
    );
    setProposals([newProposal, ...proposals]);
    const proposalsData = await proposalService.indexParkProposals();
    setProposals(proposalsData);
  };
  const handleAddFeedback = async (feedbackFormData) => {
    console.log(parkId);
    console.log(feedbackFormData);
    const newFeedback = await feedbackService.createFeedback(
      parkId,
      feedbackFormData
    );
    setFeedbacks([newFeedback, ...feedbacks]);
    // const feedbacksData = await feedbackService.indexParkFeedbacks();
    // setFeedbacks(feedbacksData);
  };
  const handleSubscriptionToggle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSubscribed) {
        // If already subscribed, delete subscription
        await mailinglistService.deleteMailer(parkId);
        setIsSubscribed(false);
      } else {
        // If not subscribed, create subscription
        await mailinglistService.createMailer(parkId);
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteProposal = async (proposalId) => {
    const deletedProposal = await proposalService.deleteProposal(proposalId);
    setProposals(
      proposals.filter((proposal) => proposal.id !== deletedProposal.id)
    );
  };
  const steps = [
    { title: "Planning", description: "Estimated 1 year for completion" },
    { title: "Concept Design", description: "Estimated 1 year for completion" },
    {
      title: "Environmental Impact Assessment",
      description: "Estimated 1 year for completion",
    },
    {
      title: "Authority Submission",
      description: "Estimated 1 year for completion",
    },
    { title: "Construction", description: "Estimated 2 year for completion" },
    {
      title: "Open to Public",
      description: `${
        park &&
        park.targetCompletion &&
        new Date(park.targetCompletion).toLocaleDateString()
      }`,
    },
  ];

  return (
    <>
    <AdminNavBar/>
      <main className="sm:mx-6 md:mx-8 lg:mx-16 xl:mx-24 md:max-w-7xl "></main>
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-72px)]">
          <div className="p-6 border-b border-white">
            <h2 className="text-3xl font-black text-gray-700">{park?.name}</h2>
          </div>

          <nav className="">
            <ul>
              <li>
                <button
                  onClick={() => handleTabClick("overview")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "overview"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("design")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "design"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("status")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "status"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Partnership Proposal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("partnership")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "partnership"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                 Mailing List
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Overview</h2>

             
            </div>
          )}

          {activeTab === "design" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">
                Concept Design of park{" "}
              </h2>
              <p className="text-gray-800">{park?.description}</p>
              <img alt={park?.name} src={park?.plan} />
              <br />
              <img alt={park?.name} src={park?.perspective} />
            </div>
          )}
          {activeTab === "status" && (
            <div>
              {" "}
              <h2 className="text-2xl font-medium mb-6">
                Development Status{" "}
                </h2>
              </div>
          )}
          {activeTab === "partnership" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Partnership Hub</h2>
              <h2>Our Community Partnership Proposals</h2>
            
            </div>
          )}
         
        </main>
      </div>
    </>
  );
};

export default ParkDetails;
