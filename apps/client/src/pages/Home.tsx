
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Bienvenue sur UgselWeb</h1>
            <p>Gestion des sports et compétitions</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/sports" style={{ padding: '10px 20px', background: '#007bff', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                    Gérer les Sports
                </Link>
                <Link to="/competitions" style={{ padding: '10px 20px', background: '#28a745', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                    Gérer les Compétitions
                </Link>
            </div>
        </div>
    );
}

export default Home;
