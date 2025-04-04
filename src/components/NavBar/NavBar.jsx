import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import User from '../../assets/user.svg';
import parkitect from '../../assets/Parkitect-logo.png';
import Idea from '../../assets/nparks-logo.svg';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navbarHeight = "h-16 md:h-20"; // Define a consistent height

    return (
        <>
        <nav className={`fixed top-0 left-0 w-full z-50 ${navbarHeight}`}>
            {user ? (
                <div className="navbar bg-base-100 shadow-sm py-2 px-4 md:py-4 md:px-6">
                    <div className="flex-1">
                        <Link to="/" className="flex items-center">
                            <img src={Idea} alt="Idea Logo" className="h-10 mr-3 md:h-10" />
                            <img src={parkitect} alt="Parkitect Logo" className="h-10 mr-3 md:h-14 hidden sm:block" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button onClick={toggleMenu} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex md:flex-1 md:justify-center md:items-center">
                        <div className="flex space-x-4">
                            <Link to="/" className="btn btn-ghost">Home</Link>
                            <Link to="/parks" className="btn btn-ghost">Projects</Link>
                            <Link to="/proposals" className="btn btn-ghost">Partnership Hub</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex md:flex-1 md:justify-end md:items-center md:space-x-4">
                        <img src={User} alt='icon' className='h-6 md:h-8' />
                        <span className="font-bold md:text-base">{user.name}</span>
                        <Link
                            to="/"
                            onClick={handleSignOut}
                            className="btn btn-sm md:btn-md rounded-full bg-lime-600 text-white border-[#4eaa0c]"
                        >
                            Sign out
                        </Link>
                    </div>

                    {/* Mobile navigation menu */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-md p-4 flex flex-col space-y-3 md:hidden">
                            <Link to="/" className="btn btn-ghost w-full justify-start" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/ideas" className="btn btn-ghost w-full justify-start" onClick={() => setIsMenuOpen(false)}>All Ideas</Link>
                            <Link to="/yourideas" className="btn btn-ghost w-full justify-start" onClick={() => setIsMenuOpen(false)}>Your Ideas</Link>
                            <div className="flex items-center space-x-2 pt-2 border-t">
                                <img src={User} alt='icon' className='h-6' />
                                <span className="font-bold text-sm">{user.name}</span>
                            </div>
                            <Link
                                to="/"
                                onClick={handleSignOut}
                                className="btn btn-sm rounded-full bg-lime-600 text-white border-[#4eaa0c] w-full"
                            >
                                Sign out
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="navbar bg-base-100 shadow-sm py-2 px-4 md:py-5 md:px-6">
                    <div className="flex-1">
                        <Link to="/" className="flex items-center">
                            <img src={Idea} alt="Idea Logo" className="h-8 md:h-10" />
                        </Link>
                    </div>

                    <div className="flex space-x-2 items-center">
                        <Link to="/sign-up" className="btn btn-ghost btn-sm md:btn-md">Sign up</Link>
                        <Link to="/sign-in" className="btn btn-sm md:btn-md rounded-full bg-red-400 text-white">
                            <span className="hidden sm:inline">Log in with singpass</span>
                            <span className="sm:hidden">Log in</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
         <div className={`w-full ${navbarHeight}`}></div>
         </>
    );
};

export default NavBar;