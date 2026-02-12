
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
    sport: Sport;
}

interface Championnat {
    id: string;
    nom: string;
    competitions: Competition[];
}

function Competitions() {
    const [championnats, setChampionnats] = useState<Championnat[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);
    const [nomChamp, setNomChamp] = useState('');

    // For adding a competition to a championship
    const [newCompNames, setNewCompNames] = useState<{ [key: string]: string }>({});
    const [newCompSportIds, setNewCompSportIds] = useState<{ [key: string]: string }>({});

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
            await axios.post('http://localhost:3000/championnats', { nom: nomChamp });
            setNomChamp('');
            fetchChampionnats();
        } catch (error) {
            console.error('Error creating championnat', error);
        }
    };

    const deleteChampionnat = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/championnats/${id}`);
            fetchChampionnats();
        } catch (error) {
            console.error('Error deleting championnat', error);
        }
    };

    const createCompetition = async (championnatId: string) => {
        const nom = newCompNames[championnatId];
        const sportId = newCompSportIds[championnatId];
        if (!nom || !sportId) {
            alert('Veuillez renseigner un nom et sélectionner un sport.');
            return;
        }
        try {
            await axios.post('http://localhost:3000/competitions', { nom, sportId, championnatId });
            setNewCompNames({ ...newCompNames, [championnatId]: '' });
            setNewCompSportIds({ ...newCompSportIds, [championnatId]: '' });
            fetchChampionnats();
        } catch (error) {
            console.error('Error creating competition', error);
        }
    };

    const deleteCompetition = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/competitions/${id}`);
            fetchChampionnats();
        } catch (error) {
            console.error('Error deleting competition', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Gestion des Championnats & Compétitions</h2>

            <form onSubmit={createChampionnat} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <input
                    value={nomChamp}
                    onChange={(e) => setNomChamp(e.target.value)}
                    placeholder="Nouveau Championnat"
                    required
                    style={{ padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px' }}>Créer Championnat</button>
            </form>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {championnats.map((champ) => (
                    <div key={champ.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>{champ.nom}</h3>
                            <button onClick={() => deleteChampionnat(champ.id)} style={{ color: 'red' }}>Supprimer Championnat</button>
                        </div>

                        <div style={{ marginLeft: '1rem', borderLeft: '2px solid #eee', paddingLeft: '1rem' }}>
                            <h4>Compétitions associées</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {champ.competitions && champ.competitions.map((comp) => (
                                    <li key={comp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                                        <span>
                                            <strong>{comp.nom}</strong>
                                            {comp.sport && (
                                                <span style={{ marginLeft: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                                                    ({comp.sport.nom})
                                                </span>
                                            )}
                                        </span>
                                        <button onClick={() => deleteCompetition(comp.id)} style={{ color: 'red', fontSize: '0.8rem' }}>Suppr.</button>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: '10px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <input
                                    value={newCompNames[champ.id] || ''}
                                    onChange={(e) => setNewCompNames({ ...newCompNames, [champ.id]: e.target.value })}
                                    placeholder="Nouvelle compétition"
                                    style={{ padding: '2px' }}
                                />
                                <select
                                    value={newCompSportIds[champ.id] || ''}
                                    onChange={(e) => setNewCompSportIds({ ...newCompSportIds, [champ.id]: e.target.value })}
                                    style={{ padding: '2px' }}
                                >
                                    <option value="">-- Sport --</option>
                                    {sports.map((sport) => (
                                        <option key={sport.id} value={sport.id}>
                                            {sport.nom}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => createCompetition(champ.id)}>Ajouter</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Competitions;
