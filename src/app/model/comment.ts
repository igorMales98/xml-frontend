import { User } from './user';

export class Comment {
    commenter: User;
    comment: string;
    reply: string;
    id: number;

    constructor(commenter: User, comment: string, reply: string, id: number) {
      this.commenter = commenter;
      this.comment = comment;
      this.reply = reply;
      this.id = id;
    }
  }