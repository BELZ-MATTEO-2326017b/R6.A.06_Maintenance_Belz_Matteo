
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Sport {
    id: string;
    nom: string;
    type: string;
}

interface Competition {
    id: string;
    nom: string;
    championnatId?: string;
}

interface Championnat {
    id: string;
    nom: string;
    sport: Sport;
    competitions: Competition[];
}

function Competitions() {
    const [championnats, setChampionnats] = useState<Championnat[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);
    const [nomChamp, setNomChamp] = useState('');
    const [sportChamp, setSportChamp] = useState('');
    const [newCompNames, setNewCompNames] = useState<{ [key: string]: string }>({});

    const [expandedChamp, setExpandedChamp] = useState<string | null>(null);

    useEffect(() => {
        fetchChampionnats();
        fetchSports();
    }, []);

    const fetchChampionnats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/championnats');
            setChampionnats(response.data);
        } catch (error) {
            console.error('Error fetching championnats', error);
        }
    };

    const fetchSports = async () => {
        try {
            const response = await axios.get('http://localhost:3000/sports');
            setSports(response.data);
        } catch (error) {
            console.error('Error fetching sports', error);
        }
    };

    const createChampionnat = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/championnats', { nom: nomChamp, sportId: sportChamp });
            setNomChamp('');
            setSportChamp('');
            fetchChampionnats();
        } catch (error) {
            console.error('Error creating championnat', error);
        }
    };

    const deleteChampionnat = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling accordion
        if (!window.confirm('Voulez-vous vraiment supprimer ce championnat ?')) return;
        try {
            await axios.delete(`http://localhost:3000/championnats/${id}`);
            fetchChampionnats();
        } catch (error) {
            console.error('Error deleting championnat', error);
        }
    };

    const createCompetition = async (championnatId: string) => {
        const nom = newCompNames[championnatId];
        if (!nom) {
            alert('Veuillez renseigner un nom.');
            return;
        }
        try {
            await axios.post('http://localhost:3000/competitions', { nom, championnatId });
            setNewCompNames({ ...newCompNames, [championnatId]: '' });
            fetchChampionnats();
        } catch (error) {
            console.error('Error creating competition', error);
        }
    };

    const deleteCompetition = async (id: string) => {
        if (!window.confirm('Supprimer cette compétition ?')) return;
        try {
            await axios.delete(`http://localhost:3000/competitions/${id}`);
            fetchChampionnats();
        } catch (error) {
            console.error('Error deleting competition', error);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedChamp(expandedChamp === id ? null : id);
    };

    return (
        <div className="page-container fade-in">
            <header className="page-header">
                <h2>Gestion des Championnats</h2>
                <p className="page-description">Créez des championnats et organisez les compétitions associées.</p>
            </header>

            <div className="content-wrapper">
                <section className="form-section">
                    <h3>Nouveau Championnat</h3>
                    <form onSubmit={createChampionnat} className="modern-form">
                        <div className="form-group">
                            <label htmlFor="nomChamp">Nom du championnat</label>
                            <input
                                id="nomChamp"
                                value={nomChamp}
                                onChange={(e) => setNomChamp(e.target.value)}
                                placeholder="Ex: Championnat Régional"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sportChamp">Sport associé</label>
                            <select
                                id="sportChamp"
                                value={sportChamp}
                                onChange={(e) => setSportChamp(e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionner un Sport --</option>
                                {sports.map((sport) => (
                                    <option key={sport.id} value={sport.id}>{sport.nom}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="submit-btn">Créer Championnat</button>
                    </form>
                </section>

                <section className="list-section">
                    <h3>Championnats en cours</h3>
                    <div className="championships-list">
                        {championnats.length === 0 ? (
                            <p className="empty-state">Aucun championnat créé.</p>
                        ) : (
                            championnats.map((champ) => (
                                <div key={champ.id} className={`championship-item ${expandedChamp === champ.id ? 'expanded' : ''}`}>
                                    {/* En-tête cliquable pour déplier/replier */}
                                    <div className="championship-header" onClick={() => toggleExpand(champ.id)}>
                                        <div className="championship-info">
                                            <h4>{champ.nom}</h4>
                                            {champ.sport && <span className="sport-tag">{champ.sport.nom}</span>}
                                        </div>
                                        <div className="accordion-indicator">
                                            <span className="arrow-icon">{expandedChamp === champ.id ? '▲' : '▼'}</span>
                                        </div>
                                    </div>

                                    {/* Contenu déplié : BOX CLAIRE */}
                                    {expandedChamp === champ.id && (
                                        <div className="championship-details-box fade-in">
                                            <div className="details-header">
                                                <h5>Compétitions associées</h5>
                                            </div>

                                            <div className="competitions-container">
                                                <ul className="competitions-list">
                                                    {champ.competitions && champ.competitions.length > 0 ? (
                                                        champ.competitions.map((comp) => (
                                                            <li key={comp.id} className="competition-item">
                                                                <span>{comp.nom}</span>
                                                                <button
                                                                    onClick={() => deleteCompetition(comp.id)}
                                                                    className="btn-delete-text"
                                                                    title="Supprimer la compétition"
                                                                >
                                                                    Supprimer
                                                                </button>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="empty-competitions">Aucune compétition</li>
                                                    )}
                                                </ul>

                                                <div className="add-competition-form">
                                                    <input
                                                        value={newCompNames[champ.id] || ''}
                                                        onChange={(e) => setNewCompNames({ ...newCompNames, [champ.id]: e.target.value })}
                                                        placeholder="Nom de la nouvelle compétition..."
                                                    />
                                                    <button onClick={() => createCompetition(champ.id)} className="btn-add-mini">Ajouter</button>
                                                </div>
                                            </div>

                                            {/* Actions globales du championnat */}
                                            <div className="championship-footer-actions">
                                                <button
                                                    onClick={(e) => deleteChampionnat(champ.id, e)}
                                                    className="btn-danger-outline"
                                                >
                                                    Supprimer le championnat
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Competitions;
