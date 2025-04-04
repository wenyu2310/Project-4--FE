import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as parkService from "../../services/parkService";
import AdminNavBar from "../NavBar/AdminNavBar";

const AdminParkFormSmall = (props) => {
  const {  parkId } = useParams(null);
  const [parks, setParks] = useState([]);
  const [parkFormData, setFormData] = useState({
    status: "",
    description: "",
    targetCompletion: "",
    plan: "",
    perspective: "",
    stage: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPark = async () => {
      const parkData = await parkService.show(parkId);
      setFormData(parkData);
    };
    if (parkId ) fetchPark();
  }, [parkId]);


  const handleChange = (evt) => {
    setFormData({ ...parkFormData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (parkId) {
      const submissionData = {
        ...parkFormData,
        targetCompletion: new Date(parkFormData.targetCompletion) // Ensure proper Date object for Prisma
      };
      parkService.update(parkId,submissionData);
      alert("Park updated successfully");
      navigate('/admin/parks');
    } else {
      console.log(parkFormData);
      const submissionData = {
        ...parkFormData,
        targetCompletion: new Date(parkFormData.targetCompletion) // Ensure proper Date object for Prisma
      };
      handleAddPark(submissionData, { parkId });
      setFormData({ status: "", text: "" });
      navigate("/admin");
    }
  };
  const handleAddPark = async (submissionData) => {
    console.log(submissionData);
    const newPark = await parkService.create(
      submissionData,
      navigate(`/parks/${parkId}`),
    );
    setParks([newPark, ...parks]);
    alert("Park updated successfully");
    const parksData = await parkService.index();
    setParks(parksData);
  };
    const handleDeletePark = async (parkId) => {
        try {
            await parkService.deletePark(parkId);
            alert("Proposal deleted successfully")
            console.log("Proposal deleted successfully");
            navigate(`/admin/parks`);
        } catch (error) {
            console.error("Failed to delete proposal:", error);
            // Handle the error appropriately (show user message, etc.)
        }
    };
  return (
    <>

        <AdminNavBar/>
        <main className=" max-w-6xl mx-auto">

      <div ></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div>
              <label
                htmlFor="name"
                className="block text-2xl font-medium mb-6 text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={parkFormData.name}
                name="name"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
              />
            </div>
            <br />
            <div>
            <label
              htmlFor="description"
              className="block text-2xl font-medium mb-6 text-gray-700"
            >
              Description:
            </label>
            <textarea
              required
              type="text"
              id="description"
              name= "description"
              value ={parkFormData.description}
              onChange={handleChange}
              rows="6"
              className="mt-1 mb-8 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          </div>
          <div>
              <label
                htmlFor="targetCompletion"
                className="block text-sm font-medium text-gray-700"
              >
                Target Completion:
              </label>
              <input
            type="date"
            id="targetCompletion"
            name="targetCompletion"
            value={parkFormData.targetCompletion}
            onChange={handleChange}
            required
          />
            </div>


            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status:
              </label>
              <input
                type="number"
                id="status"
                value={parkFormData.status}
                name ="status"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
  
              />
            </div>
            

            <div>
              <label
                htmlFor="plan"
                className="block text-sm font-medium text-gray-700"
              >
                Plan:
              </label>
              <input
                type="text"
                id="plan"
                value={parkFormData.plan}
                name="plan"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"

              />
            </div>

            <div>
              <label
                htmlFor="perspective"
                className="block text-sm font-medium text-gray-700"
              >
                Perspective:
              </label>
              <input
                type="text"
                id="perspective"
                value={parkFormData.perspective}
                name="perspective"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"

              />
            </div>


            <div>
              <label
                htmlFor="stage"
                className="block text-sm font-medium text-gray-700"
              >
                Stage:
              </label>
              <input
                type="text"
                id="stage"
                value={parkFormData.stage}
                name="stage"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"

              />
            </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mb-8 mr-3 rounded-full"
            >
              UPDATE PARK
            </button>
           
            <button
                                type="button" // Add this to prevent form submission
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent any form submission
                                  handleDeletePark(parkId); 
                                }}
                                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 mb-8 rounded-full"
                            >
                                DELETE PARK
                            </button>
          </div>
        </form>
      </main>

    </>
  );
};

export default AdminParkFormSmall;
