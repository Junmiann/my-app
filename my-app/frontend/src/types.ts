export interface Class {
    id: number;
    name: string;
    job: string[];
    origin: string;
    primary_weapon: string[];
    secondary_weapon: string[];
    difficulty: 1 | 2 | 3 | 4 | 5;
    mobility: 1 | 2 | 3 | 4 | 5;
    range: 1 | 2 | 3 | 4 | 5;
    image_url: string;
}