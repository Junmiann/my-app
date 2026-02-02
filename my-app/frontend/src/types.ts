export interface Class {
    id: number;
    name: string;
    job: string;
    origin: string;
    main_stat: string;
    primary_weapon: string;
    description?: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    mobility: 1 | 2 | 3 | 4 | 5;
<<<<<<< Updated upstream
=======
    range: 1 | 2 | 3 | 4 | 5;
    image_url: string;
>>>>>>> Stashed changes
}