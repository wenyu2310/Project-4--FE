import { useParams, Link } from "react-router-dom";
const ProposalCard = (props) => {
  const { parkId } = useParams();
  
  return (
    <div className="w-full h-full">
      <div className="relative bg-white shadow rounded-lg overflow-hidden w-full h-full flex flex-col">
        
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${props.proposal.park.perspective})` }}
        ></div>
        
      
        <div className="p-4 flex-grow relative z-10">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            <a 
              href={`/parks/${props.parkId}/proposals/${props.proposal.id}`}
              className="hover:text-green-800"
            >
              {props.proposal.subject}
            </a>
          </h3>
          
          
          <div className="text-sm text-green-800 mt-3">
            <p>Contributed by : {props.proposal.user.name}
              <p> for {props.proposal.park.name}</p></p>

            <p className="text-sm text-gray-800 font-semibold mt-3">
             
          </p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;