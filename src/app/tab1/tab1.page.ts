import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { LoginPage } from '../auth/login/login.page';
import { CowService } from '../main/cow.service';
import { CreatecowPage } from '../main/createcow/createcow.page';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getAll } from '@angular/fire/remote-config';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  currentCowCount;
  filterTerm: string;
  cowList = [];
  cowSub;
  
  constructor( 
    private router: Router,
    private modalcontroller: ModalController,
    private cowService: CowService, 
    private loadingController: LoadingController,
    private alertController: AlertController ) {}

  async ngOnInit() {
     //getCows
     this.getAll();
    await LocalNotifications.requestPermissions();
  }

   async getAll() {
    (await this.loading).present();
     await this.cowService.getCows();
     console.log('hapa');
    this.cowSub = this.cowService.cowSubject.subscribe(s => {

      this.cowList = s;
      console.dir(this.cowList);
      this.currentCowCount = s.length;
      console.log(this.currentCowCount);
      console.dir(s);
     });

     (await this.loading). dismiss();
   }
  doRefresh($event){
    console.log($event);
    this.getAll();
   
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      $event.target.complete();
    }, 4000);
  }

  async basicNotifier() {
    await LocalNotifications.schedule({
         notifications: [{
          title: 'Joto Alert: weaning reminder',
          body: 'Please check cow no: 12 for weaning',
          id: 23,
          // schedule: {on:}
          extra: {
            data: "this is new for me"
          },
        }]
    })
  }

  manage(cow) {
    const navigationExtras: NavigationExtras = {
      state: cow
    }
    this.router.navigateByUrl('/manage', navigationExtras);
  }



  async presentRegister() {
    console.log('clicked!');
    const modal = await this.modalcontroller.create({
      component: CreatecowPage,
      // cssClass: 'my-custom-class'
    });
     return await modal.present();
  }

  logOut() {
    // showalert
    console.log('clidslcd');
    this.presentAlert("Are you sure you want to log out?");
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Hey',
      subHeader: 'Important message',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           //does nothing
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigateByUrl('/login');
          },
        },
      ],
    });

    await alert.present();
  }

  loading = this.loadingController.create({
    message: "Fetching cow list"
  });

  async presentLoading() {  
    (await this.loading).present();
  }
  async dismissLoading() {
    (await this.loading). dismiss();
  }

  
    
  
}
