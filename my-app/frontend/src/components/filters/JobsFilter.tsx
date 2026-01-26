import { JOBS, type Job } from '../../constants/jobs';

type JobsFilterProps = {
    activeJob: Job;
    onChange: (job: Job) => void;
};

export default function JobsFilter({
    activeJob,
    onChange,
}: JobsFilterProps) {
    return (
        <div>
            {JOBS.map((job) => (
                <button
                    key={job}
                    onClick={() => onChange(job)}
                    style={{
                        marginRight: "0.5rem",
                        fontWeight: activeJob === job ? "bold" : "normal",
                    }}
                >
                    {job.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
