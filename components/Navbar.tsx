import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon } from './icons';

// Fix: Add explicit types for NavLink component props.
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
    <a href={href} onClick={onClick} className="block md:inline-block text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300">
        {children}
    </a>
);

const Navbar = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleHomeLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" onClick={handleHomeLinkClick} className="text-lg font-bold font-orbitron text-emerald-400">
                         
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink href="#highlights" onClick={(e) => handleNavLinkClick(e, '#highlights')}>Highlights</NavLink>
                            <NavLink href="#venue" onClick={(e) => handleNavLinkClick(e, '#venue')}>Venue</NavLink>
                            <button onClick={() => onNavigate('terms')} className="bg-emerald-500 text-black font-bold px-5 py-2 rounded-md hover:bg-emerald-400 transition-all transform hover:scale-105">
                                Book Pass
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        <NavLink href="#highlights" onClick={(e) => { handleNavLinkClick(e, '#highlights'); setIsOpen(false); }}>Highlights</NavLink>
                        <NavLink href="#venue" onClick={(e) => { handleNavLinkClick(e, '#venue'); setIsOpen(false); }}>Venue</NavLink>
                        <button onClick={() => { onNavigate('terms'); setIsOpen(false); }} className="block bg-emerald-500 text-black font-bold px-5 py-3 rounded-md hover:bg-emerald-400 transition-all w-full mt-2">
                           Book Pass
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
