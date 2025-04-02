import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import ParkCard from "../ParkCard/ParkCard.jsx";
import parkitect from "../../assets/Parkitect-logo.png";
import cin from "../../assets/CIN.jpg";
import ProposalCard from "../ProposalCard/ProposalCard.jsx";
import NavBar from "../NavBar/NavBar";

const Dashboard = ({ parks, proposals }) => {
  const { user } = useContext(UserContext);

  return (
    <>
    <NavBar/>
    <main className= "text-green-800">
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
            Hello {user.name} !
          </h2>
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl">
              Discover ongoing park development projects, explore designs, track
              timelines,
              <br className="hidden md:block" />
              and get involved through partnerships and community engagement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mx-auto max-w-2xl">
            <div className="text-center">
              <Link to="/parks">
                <button className="py-2 px-4 w-full sm:w-auto lg:w-64 text-base sm:text-lg rounded-full text-white font-bold bg-green-700 hover:bg-gray-400">
                  Explore Projects
                </button>
              </Link>
            </div>
            <div className="text-center">
              <Link to="/proposals">
                <button className="py-2 px-4 w-full sm:w-auto lg:w-64 text-base sm:text-lg rounded-full text-green-700 font-bold outline-2 outline-green-700 hover:bg-gray-400">
                  Partner Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-6 bg-white ">
        <h2 className="text-3xl font-bold text-center  mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-orange-500">
          How Parkitect Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="text-4xl mb-4">🌳</div>
            <h3 className="text-xl font-semibold mb-4">Design & Planning</h3>
            <p className="text-gray-700">
              Explore innovative park designs and development plans created with
              community input and sustainable practices.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-4">Project Timeline</h3>
            <p className="text-gray-700">
              View detailed timelines for all park development projects, from
              initial planning to completion and maintenance.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-4">
              Partnership Opportunities
            </h3>
            <p className="text-gray-700">
              Submit proposals to partner with us on park development,
              maintenance, or community programming initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-100 text-sm">
        © 2025 kee.word.inc ALL RIGHTS RESERVED.
      </footer>
    </main>
    </>
    
  );
};
export default Dashboard;
