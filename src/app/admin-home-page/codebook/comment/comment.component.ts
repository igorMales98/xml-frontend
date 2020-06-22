import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from './comment.service';
import { Comment } from 'src/app/model/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  allComments: Comment[] = [];
  commentId: number;
  notifier: NotifierService;
  commentsCount: number;

  constructor(private modalService: NgbModal, private notifierService: NotifierService,
    private commentService: CommentService) { 
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.commentService.getAllComents().subscribe(data => {
      this.allComments = data;
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  openConfirmDeleteModal(targetModal, id) {
    this.commentId = id;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  acceptComment(id: number){
    this.commentService.acceptComment(id).subscribe(data => {
      this.showNotification('success', 'Comment is successfully approved!');
      this.ngOnInit();
    });
  }

  rejectComment(){
    this.commentService.rejectComment(this.commentId).subscribe(data => {
      this.showNotification('success', 'Comment is successfully rejected!');
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

}
