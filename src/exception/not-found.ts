import ClientError from "./client-error";

export default class NotFoundError extends ClientError{
    constructor(public message:string) {
        super(message, 404);
        this.name = "NotFoundError"
    }
}