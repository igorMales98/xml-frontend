import {Component, OnInit, TemplateRef} from '@angular/core';
import {faCartPlus, faCheckDouble, faCommentAlt, faInfo, faUser} from '@fortawesome/free-solid-svg-icons';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';
import {AgentHomePageService} from './agent-home-page.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from '../app.component';
import {NotifierService} from 'angular-notifier';
import {UserService} from '../security/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-agent-home-page',
  templateUrl: './agent-home-page.component.html',
  styleUrls: ['./agent-home-page.component.css']
})
export class AgentHomePageComponent implements OnInit {
  faInfo = faInfo;
  faComment = faCommentAlt;
  faUser = faUser;

  allAdvertisements: Advertisement[] = [];
  comments: Comment[] = [];
  moreInfoAdvertisement: Advertisement;
  allImagesForAd: string[] = [];
  private readonly imageType: string = 'data:image/PNG;base64,';

  closeResult: string;
  notifier: NotifierService;

  loggedInUser: User;

  loadContent = false;

  constructor(private agentHomePageService: AgentHomePageService, private domSanitizer: DomSanitizer, private modalService: NgbModal,
              private appComponent: AppComponent, private notifierService: NotifierService, private userService: UserService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.appComponent.role = localStorage.getItem('role');
    this.userService.getMyInfo();
    this.loggedInUser = this.userService.currentUser;
    this.loadContent = true;

    setTimeout(() => {
      this.agentHomePageService.getAllAdvertisements().subscribe(data => {
        for (const ad of data) {
          if (ad.advertiser.id !== this.loggedInUser.id) {
            this.allAdvertisements.push(ad);
          }
        }

        for (const advertisement of this.allAdvertisements) {
          advertisement.image = [];
          this.agentHomePageService.getAdvertisementPhotos(advertisement.id).subscribe(img => {
            console.log(img as string);
            const images = img.toString();
            this.allImagesForAd = images.split(',');
            for (let i = 0; i < this.allImagesForAd.length; i++) {
              advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
            }
          });
        }
        this.loadContent = false;
      });
    }, 2000);
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
    this.agentHomePageService.getComments(advertisement.id).subscribe(data => {
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

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
