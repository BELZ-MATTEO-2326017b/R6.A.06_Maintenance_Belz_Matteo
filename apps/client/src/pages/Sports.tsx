
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Sport {
    id: string;
    nom: string;
    type: 'INDIV' | 'EQUIPE' | 'MIXTE';
}

function Sports() {
    const [sports, setSports] = useState<Sport[]>([]);
    const [nom, setNom] = useState('');
    const [type, setType] = useState<'INDIV' | 'EQUIPE' | 'MIXTE'>('INDIV');

    useEffect(() => {
        fetchSports();
    }, []);

    const fetchSports = async () => {
        try {
            const response = await axios.get('http://localhost:3000/sports');
            setSports(response.data);
        } catch (error) {
            console.error('Error fetching sports', error);
        }
    };

    const createSport = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/sports', { nom, type });
            setNom('');
            fetchSports();
        } catch (error) {
            console.error('Error creating sport', error);
        }
    };

    const deleteSport = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/sports/${id}`);
            fetchSports();
        } catch (error) {
            console.error('Error deleting sport', error);
        }
    };

    return (
        <div className="page-container fade-in">
            <header className="page-header">
                <h2>Gestion des Sports</h2>
                <p className="page-description">Ajoutez et gérez la liste des sports disponibles.</p>
            </header>

            <div className="content-wrapper">
                <section className="form-section">
                    <h3>Ajouter un sport</h3>
                    <form onSubmit={createSport} className="modern-form">
                        <div className="form-group">
                            <label htmlFor="nom">Nom du sport</label>
                            <input
                                id="nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Ex: Football"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value as any)}
                            >
                                <option value="INDIV">Individuel</option>
                                <option value="EQUIPE">Équipe</option>
                                <option value="MIXTE">Mixte</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-btn">Ajouter le sport</button>
                    </form>
                </section>

                <section className="list-section">
                    <h3>Liste des sports</h3>
                    {sports.length === 0 ? (
                        <p className="empty-state">Aucun sport enregistré.</p>
                    ) : (
                        <ul className="modern-list">
                            {sports.map((sport) => (
                                <li key={sport.id} className="list-item">
                                    <div className="item-info">
                                        <span className="item-name">{sport.nom}</span>
                                        <span className={`item-badge ${sport.type.toLowerCase()}`}>{sport.type}</span>
                                    </div>
                                    <button
                                        onClick={() => deleteSport(sport.id)}
                                        className="delete-btn"
                                        aria-label={`Supprimer ${sport.nom}`}
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Sports;
