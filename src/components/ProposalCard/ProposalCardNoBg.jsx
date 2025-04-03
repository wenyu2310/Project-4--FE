
import { useParams, Link } from "react-router-dom";

const ProposalCardNoBg = (props) => {
  const { parkId } = useParams();

  return (
    <div className="w-full h-full">
      <div className="relative bg-white shadow rounded-lg overflow-hidden w-full h-full flex flex-col">
        
        {/* Card Content */}
        <div className="p-4 flex-grow relative z-10">
          {/* Main Subject (Top Level) */}
          <h3 className="text-lg font-bold text-gray-600 mb-3">
            <a 
              href={`/parks/${props.parkId}/proposals/${props.proposal.id}`}
              className="hover:text-blue-800"
            >
              {props.proposal.subject}
            </a>
          </h3>
          
          {/* Author and Date (Second Level) - with visual hierarchy */}
          <div className="ml-2 mt-1">
            <p className="text-sm text-gray-500">
              Partner: <span className="font-medium text-gray-700">{props.proposal.user.name}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Posted on: {new Date(props.proposal.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCardNoBg;