import { User } from './user';

export class Comment {
    commenter: User;
    comment: string;
    reply: string;
    id: number;
    approved: boolean;
    rejected: boolean;

    constructor(commenter: User, comment: string, reply: string, id: number, approved: boolean, rejected: boolean) {
      this.commenter = commenter;
      this.comment = comment;
      this.reply = reply;
      this.id = id;
      this.approved = approved;
      this.rejected = rejected;
    }
  }