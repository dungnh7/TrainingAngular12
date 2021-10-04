export class RegisterModel {
    constructor( id?: number, name?:string,email?: string,password?: string, token?: string)
    {
        this.id = id || 0,
        this.name=name || '',
        this.email=email || '',
        this.password=password || '',        
        this.token=token || ''
    }
    public id: number;
    public name: string;
    public email: string ;
    public password: string;    
    public token: string;
}