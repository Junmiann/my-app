import { useState, useEffect } from "react";
import type { Class } from "../types";

export default function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch("http://localhost:5000/classes", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await response.json();

                if (!response.ok || data.error) {
                    console.error({
                        status: response.status,
                        data: data.error,
                    });
                    alert(data.error);
                    return;
                }

                setClasses(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <h1>Classes</h1>
            {classes.length === 0 ? (
                <p>Loading classes...</p>
            ) : (
                classes.map((cls) => (
                    <div>{cls.name}</div>
                ))
            )}
        </div>
    );
}