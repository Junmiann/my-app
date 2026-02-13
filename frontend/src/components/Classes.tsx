import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <div className="flex flex-col max-w-6xl mx-auto mt-20 mb-6">
            <h1 className="uppercase text-start">Classes</h1>
            <div className="flex justify-end gap-6 border-b border-white/20">
                <button onClick={() => handleFilterSwitch("job")} 
                    className={`pb-2 transition 
                        ${activeFilter === "job"
                            ? "font-semibold border-b-2 border-white"
                            : "text-white/60 hover:text-[#B1E1E9] hover:font-bold"
                        }`}>
                            Jobs
                </button>
                <button onClick={() => handleFilterSwitch("origin")} 
                    className={`pb-2 transition 
                        ${activeFilter === "origin"
                            ? "font-semibold border-b-2 border-white"
                            : "text-white/60 hover:text-[#B1E1E9] hover:font-bold"
                        }`}>
                            Origin
                </button>
            </div>
            
            <div className="pt-4 pb-4">
                {/* Show fiter based on active filter */}
                {activeFilter === "job" && (
                    <JobsFilter activeJob={job} onChange={setJob} />
                )}
                
                {activeFilter === "origin" && (
                    <OriginFilter activeOrigin={origin} onChange={setOrigin} />
                )}
            </div>
            

            {/* Classes list */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                {classes.map((cls) => (
                    <Link
                        key={cls.id}
                        to={`/classes/${cls.id}`}
                        className="flex flex-col items-center gap-2 p-4 transition border rounded-lg group border-white/5 bg-white/5">
                            <img src={cls.image_url} alt={cls.name} 
                                className="drop-shadow-[0_6px_10px_#00000066] transition group-hover:drop-shadow-[0_5px_10px_#B1E1E9]"/>
                            <p className="text-sm border-t md:text-base lg:text-lg border-white/20">{cls.name}</p> 
                    </Link>
                ))}
            </div>
            
        </div>
    );
}
