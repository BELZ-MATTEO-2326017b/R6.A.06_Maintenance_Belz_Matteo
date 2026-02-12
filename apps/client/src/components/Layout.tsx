import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="app-layout">
            <header className="navbar">
                <div className="logo">
                    <Link to="/">Ugsel</Link>
                </div>
                <nav>
                    <Link to="/" className={isActive('/')}>Accueil</Link>
                    <Link to="/sports" className={isActive('/sports')}>Sports</Link>
                    <Link to="/competitions" className={isActive('/competitions')}>Championnats</Link>
                    <Link to="/about" className={isActive('/about')}>A Propos</Link>
                </nav>
            </header>

            <main className="main-content">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
