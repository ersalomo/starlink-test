import ClientError from "./client-error";

export default class InvariantError extends ClientError{
    constructor(public message:string) {
        super(message)
        this.name = "InvariantError";
    }
}