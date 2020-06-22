import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {AgentRegisterService} from './agent-register.service';
import {Agent} from '../model/agent';


@Component({
  selector: 'app-agent-register',
  templateUrl: './agent-register.component.html',
  styleUrls: ['./agent-register.component.css']
})
export class AgentRegisterComponent implements OnInit {

  agentData: FormGroup;
  notifier: NotifierService;

  constructor(private notifierService: NotifierService, private formBuilder: FormBuilder,
              private agentRegisterService: AgentRegisterService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.agentData = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, this.emailDomainValidator, Validators.pattern(/[^ @]*@[^ @]*/)]],
        address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]],
        businessSocialNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(5), Validators.maxLength(5)]]


      },
      {validator: this.checkPasswords});
  }

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    const [name, domain] = email.split('@');
    if (domain !== 'gmail.com' && domain !== 'yahoo.com' && domain !== 'uns.ac.rs') {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      };
    } else {
      return null;
    }
  }

  checkPasswords(group: FormGroup) {
    if (!group.controls.password.touched) {
      return null;
    }
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordRepeat.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  get f() {
    return this.agentData.controls;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  register() {
    const agent = new Agent(this.agentData.value.firstName, this.agentData.value.lastName, this.agentData.value.username,
      this.agentData.value.password, this.agentData.value.email, this.agentData.value.address,
      this.agentData.value.city, this.agentData.value.country, this.agentData.value.phone,
      this.agentData.value.businessSocialNumber);

    this.agentRegisterService.register(agent).subscribe(data => {
      this.showNotification('success', 'Agent is registered successfully!');
      this.ngOnInit();
    });

  }

}
