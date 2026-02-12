
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
        <div style={{ padding: '2rem' }}>
            <h2>Gestion des Sports</h2>

            <form onSubmit={createSport} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <input
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom du sport"
                    required
                    style={{ padding: '5px' }}
                />
                <select value={type} onChange={(e) => setType(e.target.value as any)} style={{ padding: '5px' }}>
                    <option value="INDIV">Individuel</option>
                    <option value="EQUIPE">Équipe</option>
                    <option value="MIXTE">Mixte</option>
                </select>
                <button type="submit" style={{ padding: '5px 10px' }}>Ajouter</button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {sports.map((sport) => (
                    <li key={sport.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
                        <span>{sport.nom} ({sport.type})</span>
                        <button onClick={() => deleteSport(sport.id)} style={{ color: 'red' }}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sports;
