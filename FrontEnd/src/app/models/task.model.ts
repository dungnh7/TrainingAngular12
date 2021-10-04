export class TaskModel {
    constructor( id?: number, name?:string,description?: string,statusId?: string,userId?: string)
    {
        this.id = id || 0,
        this.name=name || '',
        this.description=description || '',
        this.statusId=statusId || '',
        this.userId=userId || ''
    }
    public id: number;
    public name: string;
    public description: string;
    public statusId: string;
    public userId: string;
}