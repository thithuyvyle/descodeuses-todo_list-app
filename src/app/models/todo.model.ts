// modèles sont entités du système: fichier qui décrit la forme des données semblable à une table de données

export interface Todo {
// | null : champ optionnel: en TS possib. d'avoir plusieurs types
    id: number | null;
    title: string | null;
    completed: boolean | null;
    priority: number | null;
    dueDate: Date | null;
    description: string | null;
}