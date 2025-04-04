import { useState, useEffect, useContext } from "react";
import * as proposalService from "../../services/proposalService"
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import User from '../../assets/user.svg';


const AdminProposalDetails = (props) => {
    const [proposal, setProposal] = useState(null);
    const { parkId, proposalId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDeleteProposal = async (parkId, proposalId) => {
        try {
            await proposalService.deleteProposal(parkId, proposalId);
            alert("Proposal deleted successfully")
            console.log("Proposal deleted successfully");
            navigate(`/admin/proposals`);
        } catch (error) {
            console.error("Failed to delete proposal:", error);
            // Handle the error appropriately (show user message, etc.)
        }
    };

    useEffect(() => {
        const fetchproposal = async () => {
            const proposalData = await proposalService.showProposal(parkId, proposalId);
            setProposal(proposalData);
        };
        fetchproposal();
    }, [proposalId]);

    if (!proposal) return <main className="pt-20 p-4">Loading...</main>;

    return (
        <>
            <div className="bg-white min-h-screen">
        <NavBar/>
        <main className="pt-15 p-4 max-w-6xl mx-auto">
        <div className="relative z-10  px-4 text-center text-green-800 ">
        <div className="py-2">
          <h2 className="text-5xl font-semibold mb-6">
            {proposal.park.name}
          </h2>
        </div>
      </div>
      <div>
                <h2 className="text-2xl font-medium mb-6">{proposal?.subject}</h2>
                <span className="flex items-center gap-1 ">
                            <img src={User} alt='icon' className='flex items-center h-6' /><p className="text-sm text-gray-600 text-center">
                                { `${proposal?.user?.name} posted on ${new Date(proposal?.createdAt).toLocaleDateString()}`
                                    }
                            </p>
                        </span>

                <div className="space-y-6">
                  <div>
                    {/* <h3 className="text-gray-500 mb-1">About :</h3> */}
                    <p className="text-gray-800 mt-5">{proposal?.text}</p>
                  </div>
 
                </div>
              </div>

                        <div className="flex mt-5 space-x-2">

                            <button
                                onClick={() => handleDeleteProposal(parkId, proposalId)}
                                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Delete Proposal
                            </button>
                        </div>
            
            <div className="flex mt-5 space-x-2">
            <Link
                                to={`/parks/${parkId}/`}
                                className="bg-white hover:bg-gray-200 text-black font-bold mt-2 py-2 px-4 rounded-full"
                            >
                                 ← Back 
                            </Link>
                
                        </div>


                 </main>
                 </div>
                 </>
                 )   

};

export default AdminProposalDetails;