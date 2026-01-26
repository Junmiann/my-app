import { useState, useEffect } from "react";
import type { Class } from "../types";
import JobsFilter from "./filters/JobsFilter";
import { type Job } from "../constants/jobs";
import { type Origin } from "../constants/origins";
import OriginFilter from "./filters/OriginsFilter";

export default function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [job, setJob] = useState<Job>("all");
    const [origin, setOrigin] = useState<Origin>("explorer");

    const [activeFilter, setActiveFilter] = useState<"job" | "origin">("job");

    const handleFilterSwitch = (filter: "job" | "origin") => {
        setActiveFilter(filter);

        if (filter === "job") {
            setJob("all");
        } else if (filter === "origin") {
            setOrigin("explorer");
        }
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                let url = "http://localhost:5000/classes";

                if (activeFilter === "job") {
                    url =
                        job === "all"
                            ? "http://localhost:5000/classes"
                            : `http://localhost:5000/classes/job?name=${job}`;
                } else if (activeFilter === "origin") {
                    url = `http://localhost:5000/classes/origin?name=${origin}`;
                }

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
    }, [activeFilter, job, origin]);

    return (
        <div>
            <h1>Classes</h1>

            <button onClick={() => handleFilterSwitch("job")}>Jobs</button>
            <button onClick={() => handleFilterSwitch("origin")}>Origin</button>

            {/* Show fiter based on active filter */}
            {activeFilter === "job" && (
                <JobsFilter activeJob={job} onChange={setJob} />
            )}
            {activeFilter === "origin" && (
                <OriginFilter activeOrigin={origin} onChange={setOrigin} />
            )}

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
