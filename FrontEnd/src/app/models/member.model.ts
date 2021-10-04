export class MemberModel {
    constructor( id?: number, name?:string,email?: string,token?: string)
    {
        this.id = id || 0,
        this.name=name || '',
        this.email=email || '',
        this.token=token || ''
    }
    public id: number;
    public name: string;
    public email: string;
    public token: string;
}