import { FormControl } from "@angular/forms";

export interface User {
    id: FormControl<number | null>;
    lastName: FormControl< string | null> ;
    firstName: FormControl< string | null> ;
    genre: FormControl< string | null> ;
}