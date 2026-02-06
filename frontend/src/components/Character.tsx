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
        <div className="flex flex-col max-w-6xl mx-auto p-4">
            <Link to="/classes" className="flex justify-start">Back to classes</Link>
            <div className="flex justify-center items-center gap-20">
                {/* Character information */}
                <div>
                    <h1 className="uppercase font-bold">{character.name}</h1>
                    <p className="justify-center text-xl uppercase font-semibold mb-4">{character.job.join(", ")} | {character.origin}</p>
                    <div className="flex flex-col w-lg max-w-lg mb-2 gap-4 text-start">
                        <p className="bg-white/20 rounded-full p-2 pl-5"><span className="uppercase font-bold">Primary weapon:</span>{" "}{character.primary_weapon.join(", ")}</p>
                        <p className="bg-white/20 rounded-full p-2 pl-5"><span className="uppercase font-bold">Secondary weapon:</span>{" "}{character.secondary_weapon.join(", ")}</p>
                    </div>
                    <div>
                        <p>Difficulty: {character.difficulty}</p>
                        <p>Mobility: {character.mobility}</p>
                        <p>Range: {character.range}</p>
                    </div>
                </div>
                <img src={character.image_url} alt={character.name} className="w-90 flex-shrink"/>
            </div>
        </div>
    );
}
