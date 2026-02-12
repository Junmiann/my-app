import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import type { Class } from "../types";
import StatBar from "../components/StatBar";

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
        <div className="flex flex-col max-w-6xl p-4 m-10 mx-auto mt-28">
            <Link to="/classes" className="flex justify-start w-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </Link>
            <div className="flex justify-between gap-4 mt-4 text-start">
                {/* Character information */}
                <div className="flex flex-col justify-center w-2/5 p-8 overflow-hidden rounded-xl bg-gradient-to-t from-[#315965] to-white/20 border-2 border-white/40">
                    <h1 className="mb-2 font-bold uppercase drop-shadow-[10px_8px_8px_#2F545A]">{character.name}</h1>
                    <p className="mb-6 text-xl uppercase border-b border-white/20">{character.job.join(", ")} | {character.origin}</p>
                    <div className="flex flex-col gap-4 mb-2 w-lg">
                        <p className="p-2 text-sm rounded-full bg-white/20"><span className="font-bold uppercase">Primary weapon:</span>{" "}{character.primary_weapon.join(", ")}</p>
                        <p className="p-2 text-sm rounded-full bg-white/20"><span className="font-bold uppercase">Secondary weapon:</span>{" "}{character.secondary_weapon.join(", ")}</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-6">
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                            <p className="font-bold uppercase">Difficulty</p>
                            <div className="ml-auto">
                                <StatBar value={character.difficulty} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <p className="font-bold uppercase">Mobility</p>
                            <div className="ml-auto">
                                <StatBar value={character.mobility} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                            <p className="font-bold uppercase">Range</p>
                            <div className="ml-auto">
                                <StatBar value={character.range} />
                            </div>
                        </div>
                    </div>
                </div>
                <img src={character.image_url} alt={character.name} className="w-2/5 drop-shadow-[10px_8px_8px_#FFF]"/>
            </div>
        </div>
    );
}
