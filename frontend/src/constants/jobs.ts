export const JOBS = [
    "all",
    "warrior",
    "magician",
    "bowman",
    "thief",
    "pirate",
] as const;

export type Job = typeof JOBS[number];