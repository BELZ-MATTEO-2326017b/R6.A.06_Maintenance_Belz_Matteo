
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container fade-in">
            <section className="hero">
                <h1>Bienvenue sur <span className="highlight">Ugsel</span></h1>
                <p className="subtitle">La solution moderne pour la gestion de vos championnats et compétitions sportives.</p>

                <div className="cta-container">
                    <Link to="/sports" className="cta-button primary">
                        Gérer les Sports
                    </Link>
                    <Link to="/competitions" className="cta-button secondary">
                        Gérer les Championnats
                    </Link>
                </div>
            </section>

            <section className="features-grid">
                <div className="feature-card">
                    <h3>Sports</h3>
                    <p>Ajoutez et configurez différents types de sports (individuel, équipe, mixte).</p>
                </div>
                <div className="feature-card">
                    <h3>Championnats</h3>
                    <p>Créez des championnats et organisez vos compétitions en toute simplicité.</p>
                </div>
                <div className="feature-card">
                    <h3>Suivi</h3>
                    <p>Gardez une trace de tous les événements et résultats.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;
