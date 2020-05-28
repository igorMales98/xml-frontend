import {Component, OnInit, TemplateRef} from '@angular/core';
import {faComments, faInfo, faCommentAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {Advertisement} from '../../model/advertisement';
import {Comment} from '../../model/comment';
import {AgentAdvertisementsService} from './agent-advertisements.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agent-advertisements',
  templateUrl: './agent-advertisements.component.html',
  styleUrls: ['./agent-advertisements.component.css']
})
export class AgentAdvertisementsComponent implements OnInit {

  faMessages = faComments;
  faInfo = faInfo;
  faCommentAlt = faCommentAlt;
  faComment = faComments;
  faUser = faUser;
  id = '1';
  allAdvertisements: Advertisement[] = [];
  allImagesForAd: string[] = [];
  closeResult: string;
  moreInfoAdvertisement: Advertisement;
  private readonly imageType: string = 'data:image/PNG;base64,';
  comments: Comment[] = [];
  clickedAuthor: string;
  isDisabled: boolean;

  constructor(private agentAdvertisementsService: AgentAdvertisementsService, private domSanitizer: DomSanitizer,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    /*this.agentAdvertisementsService.getAllAgentAdvertisements(this.id).subscribe(data => {
      this.allAdvertisements = data;

      for (const advertisement of this.allAdvertisements) {
        advertisement.image = [];
        this.agentAdvertisementsService.getAdvertisementPhotos(advertisement.id).subscribe(img => {
          console.log(img as string);
          const images = img.toString();
          this.allImagesForAd = images.split(',');
          for (let i = 0; i < this.allImagesForAd.length; i++) {
            advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
          }
        });
      }
    });*/
  }

  openMoreInfoModal(myModalMoreInfo: TemplateRef<any>, advertisement: Advertisement) {
    this.modalService.open(myModalMoreInfo, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'myCustomModalClass'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.moreInfoAdvertisement = advertisement;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openComments(myModalMoreInfo: TemplateRef<any>, advertisement: Advertisement) {
    this.comments = [];
    this.agentAdvertisementsService.getComments(advertisement.id).subscribe(data => {
      this.comments = data;
    });
    this.modalService.open(myModalMoreInfo, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'myCustomModalClass'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.moreInfoAdvertisement = advertisement;
  }

  openModal(content: TemplateRef<any>, commenter: string) {
    this.clickedAuthor = commenter;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendReply() {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].commenter.id === this.clickedAuthor) {
        this.comments[i].reply = (document.getElementById('replyComment') as HTMLInputElement).value;
        this.agentAdvertisementsService.sendReply(this.comments[i]).subscribe();
      }
    }
  }

}
