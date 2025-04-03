import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import * as proposalService from "../../services/proposalService";
import * as feedbackService from "../../services/feedbackService";
import * as parkService from "../../services/parkService";
import * as mailinglistService from "../../services/mailinglistService";
import FeedbackTable from "../FeedbackTable/FeedbackTable.jsx";

import AdminNavBar from "../NavBar/AdminNavBar.jsx";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// const googleApi = `${import.meta.env.GOOGLE_API}`;

const ParkDetails = (props) => {
  const { user } = useContext(UserContext);
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [mailinglist, setMailinglist] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPark = async () => {
      const parkData = await parkService.show(parkId);
      setPark(parkData);
    };

    const fetchParkProposals = async () => {
      const proposalsData = await proposalService.indexParkProposals(parkId);
      setProposals(proposalsData);
    };

    const fetchParkFeedback = async () => {
      const feedbackData = await feedbackService.indexParkFeedbacks(parkId);
      setFeedbacks(feedbackData);
    };
    const fetchMailingList = async () => {
      const mailinglistData = await mailinglistService.indexParkmailinglist(
        parkId
      );
      setMailinglist(mailinglistData);
    };

    if (user) {
      fetchPark();
      fetchParkProposals();
      fetchParkFeedback();
      fetchMailingList();
    }
  }, [parkId, user]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

  return (
    <>
      <AdminNavBar />
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
                  onClick={() => handleTabClick("feedback")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "feedback"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Feedback
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
                  Partnership Proposal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("mailinglist")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "mailinglist"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Mailing List
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("editpark")}
                  className={`w-full text-left px-6 py-3 ${
                    activeTab === "mailinglist"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Edit Park Details
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

              <p className="text-lg mb-4">In 2025,</p>

              <p className="text-lg mb-6">
                There are currently {mailinglist?.length || 0} people in the
                mailing list, {feedbacks?.length || 0} Feedbacks and{" "}
                {proposals?.length || 0} Partnership Proposals.
              </p>

              {/* Pie Chart Section */}
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Keep Me Updated",
                            value: mailinglist?.length || 0,
                            color: "#6abe52",
                          },
                          {
                            name: "Feedback",
                            value: feedbacks?.length || 0,
                            color: "#8d5024",
                          },
                          {
                            name: "Partnership Proposal",
                            value: proposals?.length || 0,
                            color: "#e99c30",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {[
                          { name: "Keep Me Updated", color: "#6abe52" },
                          { name: "Feedback", color: "#8d5024" },
                          { name: "Partnership Proposal", color: "#e99c30" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {activeTab === "feedback" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Feedback </h2>
              <div>
                <FeedbackTable feedbacks={feedbacks}/>
              </div>
            </div>
          )}
          {activeTab === "partnership" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Development Status </h2>
              <div></div>
            </div>
          )}
          {activeTab === "mailinglist" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Mailing List</h2>
              <h2>Our Community Partnership Proposals</h2>
            </div>
          )}
          {activeTab === "editpark" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Mailing List</h2>
              <h2>Our Community Partnership Proposals</h2>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ParkDetails;
