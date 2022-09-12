import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CowService } from '../cow.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {

  noticeList = [];
  cowSub;

  constructor( private router: Router,
    private modalcontroller: ModalController,
    private cowService: CowService, 
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    (await this.loading).present();
     await this.cowService.getNotices();
     console.log('hapa');
    this.cowSub = this.cowService.noticeSubject.subscribe(s => {

      this.noticeList = s;
      console.dir(this.noticeList);
      console.dir(s);
     });

     (await this.loading). dismiss();
   }
  delete(note) {
    const i = this.noticeList.indexOf(note);
    if(i > -1 ){
      this.noticeList.splice(i, 1);
    }
  }

  loading = this.loadingController.create({
    message: "Fetching notifications"
  });

}
