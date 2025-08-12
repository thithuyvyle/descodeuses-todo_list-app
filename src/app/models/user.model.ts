export interface User { 
    id: number | null;
    username: string | null;
    lastName:string | null;
    firstName: string | null;
    genre: string | null;
    role: string | null; // ex: ['ROLE_USER']
}