const ProposalCard = (props) => {
  return (
    <div className="w-full h-full">
      <div className="relative bg-white shadow rounded-lg overflow-hidden w-full h-full flex flex-col">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${props.proposal.park.perspective})` }}
        ></div>
        
        {/* Card Content */}
        <div className="p-4 flex-grow relative z-10">
          <h3 className="text-lg font-bold text-gray-600 mb-2">
            <a 
              href={`/proposals/${props.proposal.id}`}
              className="hover:text-blue-800"
            >
              {props.proposal.subject}
            </a>
          </h3>
          <p className="text-gray-700">{props.proposal.text}</p>
          <p className="text-gray-700">Partner: {props.proposal.user.name}</p>
          <p className="text-gray-700">Posted on: {
            new Date(props.proposal.createdAt).toLocaleDateString()
          }</p>
          <p className="text-gray-700">{props.proposal.park.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;