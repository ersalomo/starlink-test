
export default class ClientError extends Error {
    public name:string;
    constructor(public message:string, public code:number = 400) {
        super(message);
        this.name = "ClientError"
    }
}