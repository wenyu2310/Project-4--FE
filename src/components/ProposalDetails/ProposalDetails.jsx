import { useState, useEffect, useContext } from "react";
import proposalservice from "../../services/proposalService";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


const ProposalDetails = (props) => {
    const [proposal, setProposal] = useState(null);
    const { parkId, proposalId } = useParams();
    const { user } = useContext(UserContext);

    const handleDeleteProposal = async (parkId, proposalId) => {
        await proposalservice.deleteProposal(parkId, proposalId);
    };

    useEffect(() => {
        const fetchproposal = async () => {
            const proposalData = await proposalservice.showProposal(parkId, proposalId);
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
            
          
                        <div className="flex space-x-2">
                            <Link
                                to={`/ideas/${ideaId}/edit`}
                                className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Edit Idea
                            </Link>
                            <button
                                onClick={() => handleDeleteProposal(parkId, proposalId)}
                                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Delete Idea
                            </button>
                        </div>


                 </main>
                 </>
                 )   

};

export default ProposalDetails;