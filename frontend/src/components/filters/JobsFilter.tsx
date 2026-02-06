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
        <div className="border-b border-white/20">
            {JOBS.map((job) => (
                <button
                    key={job}
                    onClick={() => onChange(job)}
                    className={`pb-2 mr-6 transition
                        ${activeJob === job
                            ? "font-semibold border-b-2 border-white"
                            : "text-white/60 hover:text-white"
                        }`}>
                            {job.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
