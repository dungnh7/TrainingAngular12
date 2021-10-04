export class UserModel {
    constructor( id?: number, name?:string,address?: string,position?: string)
    {
        this.id = id || 0,
        this.name=name || '',
        this.address=address || '',
        this.position=position || ''
    }
    public id: number;
    public name: string;
    public address: string;
    public position: string ;
}