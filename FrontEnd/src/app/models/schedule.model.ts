export class ScheduleModel {
    constructor( id?: number, title?:string,description?: string,location?: string,timeStart?: string,timeEnd?: string,user?: string,userId?: string)
    {
        this.id = id || 0,
        this.title=title || '',
        this.description=description || '',
        this.location=location || '',
        this.timeStart=timeStart ||  new Date().toString();
        this.timeEnd=timeEnd ||  new Date().toString();
        this.user=user || '',
        this.userId=userId || ''
    }
    public id: number;
    public title: string;
    public description: string;
    public location: string;
    public timeStart: string;
    public timeEnd: string;
    public user: string;
    public userId : string;
}