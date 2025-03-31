const AdminParkCard = (props) => {
  return (
    <div className="w-full h-full">
      <div className="bg-white shadow rounded-lg overflow-hidden w-full h-full flex flex-col">
        {/* Card Image */}
        <div className="w-full h-48">
          <img
            className="w-full h-full object-cover"
            alt={props.park.name}
            src={props.park.plan}
          />
        </div>
        
        {/* Card Content */}
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold">
            <a 
              href={`/admin/parks/${props.park.id}`}
              className="hover:text-blue-800"
            >
              {props.park.name}
            </a>
          </h3>
         
        </div>
      </div>
    </div>
  );
};

export default AdminParkCard;