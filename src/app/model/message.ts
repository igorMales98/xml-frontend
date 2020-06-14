import { User } from './user';

export class Message {
    id: string;
    message: string;
    messageDate: string;
    receiver: User;
    sender: User;
    type: string;

    constructor(message: string, receiver: User, sender: User) {
        this.message = message;
        this.receiver = receiver;
        this.sender = sender;
    }
}