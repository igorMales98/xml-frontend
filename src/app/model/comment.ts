import { User } from './user';
import { Advertisement } from './advertisement';

export class Comment {
    commenter: User;
    comment: string;
    reply: string;
    id: string;
    approved: boolean;
    advertisementDto: Advertisement;
    rejected: boolean;

    constructor(commenter: User, comment: string, advertisementDto: Advertisement) {
      this.commenter = commenter;
      this.comment = comment;
      this.advertisementDto = advertisementDto;
    }
  }
