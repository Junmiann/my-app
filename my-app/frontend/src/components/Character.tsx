import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import type { Class } from "../types";

export default function Character() {
    const { id } = useParams();
    const [character, setCharacter] = useState<Class | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchCharacter = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `http://localhost:5000/classes/character/${id}`
                );

                const data = await response.json();

                if (!response.ok || data.error) {
                    console.error(data.error);
                    return;
                }

                setCharacter(data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <p>Loading character...</p>;
    if (!character) {
        return <Navigate to="/classes" replace />;
    }

    return (
        <div>
            <Link to="/classes">Back to classes</Link>

            <h1>{character.name}</h1>
            <p>Job: {character.job.join(", ")}</p>
            <p>Origin: {character.origin}</p>
            <p>Primary weapon: {character.primary_weapon.join(", ")}</p>
            <p>Secondary weapon: {character.secondary_weapon.join(", ")}</p>
            <p>Difficulty: {character.difficulty}</p>
            <p>Mobility: {character.mobility}</p>
            <p>Range: {character.range}</p>
            <img src={character.image_url} alt={character.name} />
        </div>
    );
}
