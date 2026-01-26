import { useState, useEffect } from "react";
import type { Class } from "../types";
import JobsFilter from "./filters/JobsFilter";
import { type Job } from "../constants/jobs";

export default function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [job, setJob] = useState<Job>("all");

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const url =
                    job === "all"
                        ? "http://localhost:5000/classes"
                        : `http://localhost:5000/classes/job?name=${job}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();

                if (!response.ok || data.error) {
                    console.error({
                        status: response.status,
                        data: data.error,
                    });
                    return;
                }

                setClasses(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClasses();
    }, [job]);

    return (
        <div>
            <h1>Classes</h1>

            {/* Job filter */}
            <JobsFilter activeJob={job} onChange={setJob} />

            {/* Classes list */}
            {classes.length === 0 ? (
                <p>Loading classes...</p>
            ) : (
                classes.map((cls) => (
                    <div key={cls.id}>{cls.name}</div>
                ))
            )}
        </div>
    );
}
