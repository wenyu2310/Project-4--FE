import { useState, useEffect, useContext } from "react";
import * as proposalService from "../../services/proposalService"
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


const ProposalDetails = (props) => {
    const [proposal, setProposal] = useState(null);
    const { parkId, proposalId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDeleteProposal = async (parkId, proposalId) => {
        try {
            // Assuming your import looks like: import proposalService from '../../services/proposalService';
            await proposalService.deleteProposal(parkId, proposalId);
            alert("Proposal deleted successfully")
            // Add any success handling like UI updates or navigation
            console.log("Proposal deleted successfully");
            navigate(`/parks/${parkId}`);
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
        <NavBar/>
        <main className="pt-20 p-4 max-w-6xl mx-auto">
            <p>{proposal?.subject}</p><div className="mt-1">{proposal?.text}</div>
            <p>{proposal?.user.name}</p>
            <p>{proposal?.createdAt}</p>
            
            {proposal?.user.id === user?.id && (
                        <div className="flex space-x-2">
                            <Link
                                to={`/parks/${parkId}/proposals/${proposalId}/edit`}
                                className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Edit Proposal
                            </Link>
                            <button
                                onClick={() => handleDeleteProposal(parkId, proposalId)}
                                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Delete Proposal
                            </button>
                        </div>
            )}


                 </main>
                 </>
                 )   

};

export default ProposalDetails;