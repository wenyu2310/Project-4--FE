import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import * as proposalService from "../../services/proposalService";
import * as feedbackService from "../../services/feedbackService"
import * as parkService from "../../services/parkService";
import * as mailinglistService from "../../services/mailinglistService";
import ProposalCard from "../ProposalCard/ProposalCard";
import ProposalForm from "../ProposalForm/ProposalForm";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import Navbar from "../NavBar/NavBar"
import ProposalCardNoBg from "../ProposalCard/ProposalCardNoBg.jsx";


// const googleApi = `${import.meta.env.GOOGLE_API}`;

const ParkDetails = (props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchPark = async () => {
      try {
        const parkData = await parkService.show(parkId);
        console.log(parkData.proposals)
        setPark(parkData);
        
        // If the park data includes proposals, set them directly
        if (parkData && parkData.proposals) {
          setProposals(parkData.proposals);
        }
      } catch (error) {
        console.error("Error fetching park data:", error);
      }
    };
    
    if (user) {
      fetchPark();
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
      proposalFormData,
      // navigate(`/parks/${parkId}`),
    );
    setProposals([newProposal, ...proposals]);
    alert("Proposal posted successfully");
    const proposalsData = await proposalService.indexParkProposals(parkId);
    setProposals(proposalsData);
  };
  const handleAddFeedback = async (feedbackFormData) => {
    console.log(parkId);
    console.log(feedbackFormData);
    const newFeedback = await feedbackService.createFeedback(
      parkId,
      feedbackFormData,

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
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="relative z-10 mx-auto px-4 text-center text-green-800">
        <div className="py-8">
          <h2 className="text-5xl font-semibold mt-8 mb-15">{park?.name}</h2>
</div></div>
      {/* Content Container with Margins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow overflow-hidden">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white border-r border-gray-100">


            <nav className="sticky top-0">
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
                    Design
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
                    Development Status
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
                    Partnership Hub 🤝
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabClick("keep-in-touch")}
                    className={`w-full text-left px-6 py-3 ${
                      activeTab === "feedback"
                        ? "bg-gray-100 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Keep in Touch 🌱
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-medium mb-6">Overview</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-500 mb-1">Vision :</h3>
                    <p className="text-gray-800">{park?.description}</p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 mb-1">Target Completion :</h3>
                    <p className="text-gray-800">
                      {park &&
                        park.targetCompletion &&
                        new Date(park.targetCompletion).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 mb-1">Location :</h3>
                    {/* Google Maps would go here */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "design" && (
              <div>
                <h2 className="text-2xl font-medium mb-6">
                  Concept Design of Park
                </h2>
                <p className="text-gray-800 mb-6">{park?.description}</p>
                <div className="space-y-6">
                  <img 
                    alt={`${park?.name} plan`} 
                    src={park?.plan} 
                    className="w-full rounded-lg shadow-md"
                  />
                  <img 
                    alt={`${park?.name} perspective`} 
                    src={park?.perspective} 
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}

            {activeTab === "status" && (
              <div>
                <h2 className="text-2xl font-medium mb-6">
                  Development Status
                </h2>
                <div className="py-4">
                  <div className="flex items-center w-full mb-8">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                            index <= park?.status
                              ? "border-green-700 bg-green-700 text-white"
                              : "border-gray-300 bg-white text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div className="text-center mt-2">
                          <div
                            className={`text-sm font-medium ${
                              index <= park?.status
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {step.description}
                          </div>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                          <div
                            className={`h-0.5 w-full mt-4 ${
                              index < park?.status
                                ? "bg-green-600"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "partnership" && (
              <div>
                <h2 className="text-2xl font-medium mb-5">Partnership Hub</h2>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {proposals && proposals.length > 0 ? (
                    proposals.map((proposal) => (
                      <ProposalCardNoBg key={proposal.id} proposal={proposal} parkId={parkId} />
                    ))
                  ) : (
                    <p className="text-gray-600 col-span-full">No proposals  for {park?.name} yet. Be the first to propose a partnership!</p>
                  )}
                </div>
                
                <h3 className="text-xl font-medium mb-4 mt-8">Share a Partnership Proposal</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ProposalForm handleAddProposal={handleAddProposal} />
                </div>
              </div>
            )}

            {activeTab === "keep-in-touch" && (
              <div>
                <h2 className="text-2xl font-medium mb-6">Stay Updated</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-medium mb-3">Mailing List</h3>
                  <p className="mb-4 text-gray-600">
                    Subscribe to receive updates about {park?.name} directly to your email.
                  </p>
                  <form onSubmit={handleSubscriptionToggle}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`font-bold py-2 px-6 rounded-full ${
                        isLoading 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : isSubscribed
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-lime-600 hover:bg-lime-700 text-white"
                      }`}
                    >
                      {isLoading 
                        ? "Processing..." 
                        : isSubscribed 
                          ? "Unsubscribe" 
                          : "Subscribe to Updates"}
                    </button>
                  </form>
                </div>
              
                <div className="mt-10">
                  <h3 className="text-xl font-medium mb-4">Share Your Feedback</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <FeedbackForm handleAddFeedback={handleAddFeedback} />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParkDetails;