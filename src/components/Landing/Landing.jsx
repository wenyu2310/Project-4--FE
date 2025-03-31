import React from "react";
import ideaincLogo from "../../assets/logo.png";
import ideaLogo from "../../assets/bulb-idea-light.svg";
import feedback from "../../assets/feedback.svg";
import voting from "../../assets/voteinfo.svg";
import man from "../../assets/man.svg";
import woman from "../../assets/woman.svg";
import cin from "../../assets/CIN.jpg";
import parkitect from "../../assets/Parkitect-tag.png";
import Wishes from "../../assets/wishes2.png";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Landing = () => {
  return (<>
       <NavBar />
       <main className="">
      {/* Hero Section */}
      <section className="bg-white px-4 text-center">
        <div className="text-center">
          <img src={parkitect} alt="Parkitect" className="mx-auto w-4/5 sm:w-96 md:w-auto md:max-w-lg" />
        </div>
        <div className="mt-8 mb-6 mx-auto px-2 sm:px-0 sm:max-w-md md:max-w-2xl lg:max-w-3xl">

          <Link to="/sign-in">
          <button className="py-2 px-4 w-full sm:w-auto lg:w-80 text-base sm:text-lg rounded-full text-white font-bold bg-red-400 hover:bg-gray-400">
    Log in with singpass
</button>
          </Link>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="relative py-12 sm:py-16 bg-gray-100">
        {/* Background image with 50% opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${cin})` }}
        ></div>

        {/* Content with full opacity */}
        <div className="relative z-10 mx-auto px-4 text-center text-emerald-800">
        < h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-green-900">
        Get involved today to build a greener Singapore for tomorrow
          </h2>
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
            <div className="text-center mb-4 sm:mb-0">
              <h1 className="text-5xl sm:text-6xl font-semibold mb-2">🤝</h1> 
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Partnership Proposals</h3>
              <p className=" text-sm sm:text-base">
                Easily submit and share innovative ideas with the community.
              </p>
            </div>
            <div className="text-center mb-4 sm:mb-0">
              <h1 className="text-5xl sm:text-6xl font-semibold mb-2">🌱 </h1> 
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Shape greener spaces</h3>
              <p className=" text-sm sm:text-base">
                Share constructive feedback to refine and improve concepts.
              </p>
            </div>
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-semibold mb-2">📧</h1> 
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Keep me posted
              </h3>
              <p className=" text-sm sm:text-base">
                Get updates on the latest project milestones and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-8 sm:py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
          Your efforts shapes our City in Nature!
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-8">
          Our platform empowers the community to share, discuss, and develop
          innovative ideas, fostering a culture of collaboration and growth.
        </p>
        <p className="text-base sm:text-lg text-gray-700">
          Join a vibrant park community where volunteers of all ages come together to care for green spaces, organize programs, and build lasting connections across generations.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-100 text-sm">
        © 2025 kee.word.inc ALL RIGHTS RESERVED.
      </footer>
    </main>
  </>
    
  );
};

export default Landing;