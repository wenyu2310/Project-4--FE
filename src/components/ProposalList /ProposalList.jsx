import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Link } from "react-router-dom";
import ProposalCard from "../ProposalCard/ProposalCard.jsx";
import PartnerCard from "../PartnerCard/PartnerCard.jsx";
import Navbar from "../NavBar/NavBar";

const ProposalList = ({ proposals }) => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("allproposals");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Navbar />

      <div className="relative z-10 mx-auto px-4 text-center text-green-800">
        <div className="py-8">
          <h2 className="text-5xl font-semibold mt-8 mb-15">Partnership Hub</h2>
        </div>
      </div>
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
                    onClick={() => handleTabClick("allproposals")}
                    className={`w-full text-left px-6 py-3 ${
                      activeTab === "allproposals"
                        ? "bg-gray-100 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    All Partnership Proposals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabClick("myproposals")}
                    className={`w-full text-left px-6 py-3 ${
                      activeTab === "myproposals"
                        ? "bg-gray-100 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    My Proposals
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {activeTab === "allproposals" && (
              <div>
                <h2 className="text-2xl font-medium mb-6">
                  All Partnership Proposals
                </h2>
                <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
                  {proposals.map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "myproposals" && (
              <div>
                <h2 className="text-2xl font-medium mb-6">My Proposals</h2>
                {user &&
                  proposals && proposals.length > 0 ? (proposals
                    .filter((proposal) => proposal.user.id === user.id)
                    .map((proposal) => (
                      <ProposalCard key={proposal.id} proposal={proposal} />
                    ))
                  ):(
                      <p className="text-gray-600 col-span-full">
                        No proposals for {park?.name} yet. Be the first to propose
                        a partnership!
                      </p>
                    )}

          
              </div>
            )}
          </main>
        </div>
      </div>

      <main>
        {/* Park Cards Section */}
        <div className="relative z-10 mx-auto px-4 text-center text-emerald-800">
          <div className="py-8">
            <h2 className="text-5xl font-semibold mt-9 mb-6">
              Partnership Hub
            </h2>

            <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
              {user &&
                proposals
                  .filter((proposal) => proposal.user.id === user.id)
                  .map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                  ))}
            </div>
          </div>
          <div className="py-8">
            <h2 className="text-5xl font-bold mb-6">Community Contributions</h2>

            <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
              {proposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ProposalList;
