import { User } from './user';
import { Advertisement } from './advertisement';

export class Comment {
    commenter: User;
    comment: string;
    id: number;
    approved: boolean;
    rejected: boolean;
    advertisementDto: Advertisement;

    constructor(commenter: User, comment: string, advertisementDto: Advertisement, approved: boolean, rejected: boolean) {
      this.commenter = commenter;
      this.comment = comment;
      this.id = id;
      this.approved = approved;
      this.rejected = rejected;
      this.advertisementDto = advertisementDto;
    }

  }
