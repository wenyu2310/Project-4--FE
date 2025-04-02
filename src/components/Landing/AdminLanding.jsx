import React from "react";
import ideaincLogo from "../../assets/logo.png";
import ideaLogo from "../../assets/bulb-idea-light.svg";
import feedback from "../../assets/feedback.svg";
import voting from "../../assets/voteinfo.svg";
import cin from "../../assets/CIN.jpg";
import parkitect from "../../assets/Parkitect-tag.png";
import { Link } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";

const AdminLanding = () => {
  return (<>
       <AdminNavBar />
       <main className="">
      {/* Hero Section */}
      <section className="bg-white px-4 text-center">
        <div className="text-center">
          <img src={parkitect} alt="Parkitect" className="mx-auto w-4/5 sm:w-96 md:w-auto md:max-w-lg" />
        </div>
        <div className="mt-8 mb-6 mx-auto px-2 sm:px-0 sm:max-w-md md:max-w-2xl lg:max-w-3xl">

          <Link to="/admin/sign-in">
          <button className="py-2 px-4 w-full sm:w-auto lg:w-80 text-base sm:text-lg rounded-full text-white font-bold bg-green-700 hover:bg-gray-400">
    Staff Log-in
</button>
          </Link>
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

export default AdminLanding;