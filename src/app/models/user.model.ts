export interface User { 
    id: number;
    username: string | null;
    lastName:string | null;
    firstName: string | null;
    genre: string | null;
    role: string; // ex: ['ROLE_USER']
}