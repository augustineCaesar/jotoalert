import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  constructor( private router: Router) { }
  myCow = {};
  ngOnInit() {
    this.myCow = this.router.getCurrentNavigation().extras.state;
    console.dir(this.myCow);
  }

  async basicNotifier(state, date) {
    await LocalNotifications.schedule({
         notifications: [{
          title: 'Joto Alert: weaning reminder',
          body: 'Please check cow no: 12 for weaning',
          id: 23,
          // schedule: {on: date}
          extra: {
            data: "this is new for me"
          },
        }]
    })
  }

  changeCowState({state: string, date: Date}) {
    this.basicNotifier
  }
}
