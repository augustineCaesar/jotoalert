import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Notice } from 'src/app/interfaces/cow';
import { CowService } from '../cow.service';

@Component({
  selector: 'app-createcow',
  templateUrl: './createcow.page.html',
  styleUrls: ['./createcow.page.scss'],
})
export class CreatecowPage implements OnInit {

  constructor( private modal: ModalController, private fb: FormBuilder, public alertController: AlertController, private router: Router,
    private loadingController: LoadingController, private cowService: CowService) { }

  cowForm: FormGroup;
  isCow = false;
  izHeifer = false;
  ngOnInit() {
    this.cowForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      tag_no: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      DOB: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      breed: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      color: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      currentManager: ['', [Validators.required, Validators.minLength(2), ]],
      county: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      isHeifer: [],
      isServed: [],
      isShowingHeat: []
    });

    this.cowForm.get('isHeifer').valueChanges
    .subscribe(value => {
      console.log(value);
      if(value == 'isHeifer') {
        this.izHeifer = true;
        this.isCow = false;
      };
      if(value == 'isCow') {
        this.isCow = true;
        this.izHeifer = false;
      };
    });
  }

  async createCow() {
    // schedule first notification
    if(this.cowForm.value.isHeifer = 'isHeifer'){
      
      if(this.cowForm.value.isShowingHeat = 'Yes') {
        //show notification now
        this.cowForm.value.cycleStage = 'Inseminate';
        let val = Math.floor(1000 + Math.random() * 9000);
        this.basicNotifier(this.cowForm.value.tag_no, "Inseminate the Heifer", val);
      } else {
        let val = Math.floor(1000 + Math.random() * 9000);
        this.cowForm.value.cycleStage = 'Check Heat';
        this.AdvancedNotifier(this.cowForm.value.tag_no, "Check Heat Signs", val, 3000);
      }
      
    }
    // 
    if(this.cowForm.value.isHeifer = 'isCow'){
      if(this.cowForm.value.isServed = 'true'){
        let val = Math.floor(1000 + Math.random() * 9000);
        this.basicNotifier(this.cowForm.value.tag_no, "Check Heat again", val);
      } else {
        let val = Math.floor(1000 + Math.random() * 9000);
        this.AdvancedNotifier(this.cowForm.value.tag_no, "Check Heat Signs", val, 3000);
      }
    }
    const loading = this.loadingController.create({
      message: 'Adding cow....'
    });
    (await loading).present();
    if(this.cowForm)
    var cow = await this.cowService.uploadCow(this.cowForm.value);

    (await loading).dismiss();

    if (cow) {
      // store ui in local storage --! not safe eventually use ionic secure storage
    const loading = this.loadingController.create({
      message: 'Successful..'
    });
      this.dismissModal();
      // this.router.navigateByUrl('/tabs/tab1', {replaceUrl: true}); 
      this.router.navigate(['tabs/tab1']);
    } else {
      this.showAlert('Adding cow failed', 'Please try again'); 
    }

  }

  uploadNotification(id: any,name: string,  message: string ) {
    console.log(' call back triggered');
    let val = Math.floor(1000 + Math.random() * 9000);
    let nu: Notice;
    nu.id = id || val;
    nu.name = name ;
    nu.message = message;
    this.cowService.uploadNotice(nu);
  }

  async basicNotifier(cID:string, msg: string, nid: number ) {
    await LocalNotifications.schedule({
         notifications: [{
          title: 'Joto Alert: weaning reminder',
          body: `cow tag_no ${cID} : msg`,
          id: nid,
          iconColor: '#0000ff', 
          // schedule: {on: date}
          extra: {
            data: "this is new for me"
          },
        }]
    });

    LocalNotifications.addListener('localNotificationReceived',(notification: LocalNotificationSchema)=>{
      // remember to update notification page, and update cycle stage? and schedule another notification? 
      // this.showAlert(`Received: ${notification.id}`,`Custom Data: ${JSON.stringify(notification.extra)}`);
      // console.log(notification.id);
      this.uploadNotification(notification.id, notification.title, notification.body);
    });

  }


  async AdvancedNotifier(cID:string, msg: string, nid: number, schedule: any ) {
    await LocalNotifications.schedule({
         notifications: [{
          title: 'Joto Alert: ',
          body: `cow tag_no ${cID} : ${msg}`,
          id: nid,
          iconColor: '#0000ff', 
          schedule: {at: new Date(Date.now() + schedule)},
          extra: {
            data: "this is new for me"
          },
        }]
    });
  }



  get name() {
    return this.cowForm.get('name');
  }

  get DOB() {
    return this.cowForm.get('DOB');
  }

  get tag_no() {
    return this.cowForm.get('tag_no');
  }

  get isHeifer() {
    return this.cowForm.get('isHeifer');
  }

  get breed() {
    return this.cowForm.get('breed');
  }

  get color() {
    return this.cowForm.get('color');
  }

  get currentManager() {
    return this.cowForm.get('currentManager');
  }

  get county(){
    return this.cowForm.get('county');
  }

  get isServed(){
    return this.cowForm.get('isServed');
  }

  get isShowingHeat(){
    return this.cowForm.get('isShowingHeat');
  }
  reset() {

  }

  async dismissModal() {
    await this.modal.dismiss();
  }

  async showAlert(header, message){

    const alert = this.alertController.create({
        header, message, buttons: ['okay'],
      });
       
      (await alert).present();  
    }


}
