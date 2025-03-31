import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Link } from "react-router-dom";
import AdminParkCard from "../ParkCard/AdminParkCard.jsx";
import ProposalCard from "../ProposalCard/ProposalCard.jsx"
import AdminNavBar from "../NavBar/AdminNavBar.jsx";


const ParkList = ({ parks,proposals }) => {
  const { user } = useContext(UserContext);

  return (
    <>
    <AdminNavBar/>
    <main>


        {/* Park Cards Section */}
        <div className="relative z-10 mx-auto px-4 text-center text-emerald-800">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Projects Directory</h2>

          {/* Display message if no parks or not logged in */}
          {(!user || parks.length === 0) && (
            <p className="text-gray-600">
              {!user
                ? "Please log in to view parks"
                : "No parks available at this time"}
            </p>
          )}

          {/* Map through parks array to create cards */}
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
            {parks.map((park) => (
              <AdminParkCard key={park.id} park={park} />
            ))}
          </div>
        </div>
        </div>

        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Available Proposals</h2>

          {/* Display message if no parks or not logged in */}
          {(!user || proposals.length === 0) && (
            <p className="text-gray-600">
              {!user
                ? "Please log in to view parks"
                : "No parks available at this time"}
            </p>
          )}

          {/* Map through parks array to create cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </div>

  
    </main>
    </>
  );
};
export default ParkList;
