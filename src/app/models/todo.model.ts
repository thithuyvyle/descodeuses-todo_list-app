export interface Todo {

    id: number | null;
    title: string | null;
    completed: boolean | null;
    priority: number | null;
    dueDate: Date | null;
    description: string | null;
    memberIds : (number | null)[];
    projectId : string | null;
    userConnectedId: number | null;

}