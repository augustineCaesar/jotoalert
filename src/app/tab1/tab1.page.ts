import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController } from '@ionic/angular';
import { CreatecowPage } from '../main/createcow/createcow.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  
  constructor( private modalcontroller: ModalController, ) {}

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
  }

  async basicNotifier() {
    await LocalNotifications.schedule({
         notifications: [{
          title: 'Joto Alert: weaning reminder',
          body: 'Please check cow no: 12 for weaning',
          id: 23,
          extra: {
            data: "this is new for me"
          },
        }]
    })
  }

  async presentRegister() {
    console.log('clicked!');
    const modal = await this.modalcontroller.create({
      component: CreatecowPage,
      // cssClass: 'my-custom-class'
    });
     return await modal.present();
  }
}
