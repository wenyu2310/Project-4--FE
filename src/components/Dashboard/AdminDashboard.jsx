import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import ParkCard from "../ParkCard/ParkCard.jsx";
import parkitect from "../../assets/Parkitect-logo.png";
import cin from "../../assets/CIN.jpg";
import ProposalCard from "../ProposalCard/ProposalCard.jsx";
import AdminNavBar from "../NavBar/AdminNavBar.jsx";

const AdminDashboard = ({ parks, proposals }) => {
  const { user } = useContext(UserContext);

  return (
    <>
    <AdminNavBar/>
    <main class= "text-grey-800">
      {/* About Platform Section */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        {/* Background image with 50% opacity - minimum 600px height on large screens */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${cin})` }}
        ></div>

        {/* Content with full opacity */}
        <div className="relative z-10 mx-auto px-4 text-center">
          <h2 className="text-7xl sm:text-5xl font-semibold mb-4 sm:mb-6">
            Admin {user.email} !
          </h2>
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl">
              Connect with the community through sharing of the 
              <br className="hidden md:block" />
              park development process, designs and status.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mx-auto max-w-2xl">
            <div className="text-center">
              <Link to="/admin/parks">
                <button className="py-2 px-4 w-full sm:w-auto lg:w-64 text-base sm:text-lg rounded-full text-white font-bold bg-gray-700 hover:bg-gray-400">
                  Your Projects
                </button>
              </Link>
            </div>
            <div className="text-center">
              <Link to="/admin/parks/new">
                <button className="py-2 px-4 w-full sm:w-auto lg:w-64 text-base sm:text-lg rounded-full text-gray-700 font-bold outline-2 outline-gray-700 hover:bg-gray-400">
                  Add a new Project
                </button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>
      


    </main>

    </>
  );
};
export default AdminDashboard;
