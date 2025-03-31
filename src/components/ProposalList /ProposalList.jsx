import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Link } from "react-router-dom";
import ProposalCard from "../ProposalCard/ProposalCard.jsx"
import PartnerCard from "../PartnerCard/PartnerCard.jsx";

const ProposalList = ({ proposals }) => {
  const { user } = useContext(UserContext);

  return (
    <main>

        {/* Park Cards Section */}
        <div className="relative z-10 mx-auto px-4 text-center text-emerald-800">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Join the Community</h2>
          <p className="text-center mx-70 my-10">Be involved in the design, development and management of Singapore's parks and green spaces across Singapore! 
 
 Sign up below and we will contact you for engagement sessions by the National Parks Board (NParks) if there are park redevelopments or new park developments near your area of residence.</p>
 <div className="carousel w-full bg-white rounded-box">
 <div className="carousel-item relative w-full">
            {proposals.map((proposal) => (
              <PartnerCard key={proposal.id} proposal={proposal} />
            ))}
          </div>

</div>
          {/* Map through parks array to create cards */}
        </div>
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Community Contributions</h2>
          {/* Map through parks array to create cards */}
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </div>
        </div>

  
    </main>
  );
};
export default ProposalList;
