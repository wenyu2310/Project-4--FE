import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as parkService from "../../services/parkService";
import AdminNavBar from "../NavBar/AdminNavBar";

const AdminParkForm = (props) => {
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
    if (parkId && proposalId) {
      const submissionData = {
        ...parkFormData,
        targetCompletion: new Date(parkFormData.targetCompletion) // Ensure proper Date object for Prisma
      };
      parkService.updateProposal(parkId,submissionData);
      navigate(`/parks/${parkId}`);
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
      submissionData
      // navigate(`/parks/${parkId}`),
    );
    setParks([newPark, ...parks]);
    alert("Proposal posted successfully");
    const parksData = await parkService.index();
    setParks(parksData);
  };

  return (
    <>

      <div className="bg-white min-h-screen">
        <AdminNavBar/>
        <main className="pt-15 p-4 max-w-6xl mx-auto">
        <div className="relative z-10  px-4 text-center text-green-800 ">
        <div className="py-2">
          <h2 className="text-5xl font-semibold mb-6">
          {parkId ? "Edit Park" : "New Park"}
          </h2>
        </div>
      </div>

      <div className="py-1"></div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              Description
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
                className="block text-2xl font-medium mb-6 text-gray-700"
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
                className="block text-2xl font-medium mb-6 text-gray-700"
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
                className="block text-2xl font-medium mb-6 text-gray-700"
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
                className="block text-2xl font-medium mb-6 text-gray-700"
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
                className="block text-2xl font-medium mb-6 text-gray-700"
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
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mb-8 rounded-full"
            >
              ADD PARK
            </button>
          </div>
        </form>
      </main>
      </div>
    </>
  );
};

export default AdminParkForm;
