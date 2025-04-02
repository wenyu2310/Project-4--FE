import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import proposalService from "../../services/proposalService";
import feedbackService from "../../services/feedbackService"
import parkService from "../../services/parkService";
import mailinglistService from "../../services/mailinglistService";
import ProposalCard from "../ProposalCard/ProposalCard";
import ProposalForm from "../ProposalForm/ProposalForm";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import Navbar from "../NavBar/NavBar"
import ProposalCardNoBg from "../ProposalCard/ProposalCardNoBg.jsx";

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
    <Navbar/>
    
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
        <main className="flex-1 p-8">
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
                  {/* <div>
                    <iframe
                      width="450"
                      height="250"
                      frameborder="0"
                      style="border:0"
                      referrerpolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS"
                      allowfullscreen
                    ></iframe>
                  </div> */}
                </div>
              </div>
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
              </h2>{" "}
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
              <h2 className="text-2xl font-medium mb-6">Partnership Hub</h2>
              <h2>Our Community Partnership Proposals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {proposals.map((proposal) => (
                  <ProposalCardNoBg key={proposal.id} proposal={proposal} />
                ))}
              </div>
              <br/>
              <h2>Share a Partnership Proposal</h2>
              <br/>
              <ProposalForm handleAddProposal={handleAddProposal} />
            </div>
          )}
          {activeTab === "keep-in-touch" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Mailing List</h2>
              <br/>
              <form onSubmit={handleSubscriptionToggle}>
      <button
        type="submit"
        disabled={isLoading}
        className={`font-bold py-2 px-4 rounded-full ${
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
            : "Subscribe"}
      </button>
    </form>
            
          <br/> <br/>
              <h2 className="text-2xl font-medium mb-6"> Feedback</h2>
              <FeedbackForm handleAddFeedback={handleAddFeedback} />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ParkDetails;
