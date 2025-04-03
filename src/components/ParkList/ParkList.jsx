import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import ParkCard from "../ParkCard/ParkCard.jsx";
import ProposalCard from "../ProposalCard/ProposalCard.jsx"
import NavBar from "../NavBar/NavBar.jsx";

const ParkList = ({ parks,proposals }) => {
  const { user } = useContext(UserContext);

  return (
    <>
    <NavBar/>
    <main>
        {/* Park Cards Section */}
        <div className="relative z-10 mx-auto px-4 text-center text-green-800">
        <div className="py-8">
          <h2 className="text-5xl font-semibold mt-8 mb-15">Projects Directory</h2>

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
              <ParkCard key={park.id} park={park} />
            ))}
          </div>
        </div>
        </div>

  


  
    </main>
    </>
  );
};
export default ParkList;
