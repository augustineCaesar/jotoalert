import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { CowService } from '../cow.service';
import { LocalNotification, LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { Cow } from 'src/app/interfaces/cow';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { } from "@capacitor/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  constructor( private modal: ModalController, private fb: FormBuilder, public alertController: AlertController, private router: Router,
    private loadingController: LoadingController, private cowService: CowService, private plt: Platform, private fileOpener: FileOpener) { }

  myCow: Cow;
  x;
  cowForm: FormGroup;
  isCow = false;
  izHeifer = false;
  pdf;

  ngOnInit() {
    this.x = this.router.getCurrentNavigation().extras.state;
    this.myCow = this.x;
    console.dir(this.myCow);
    this.cowForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      tag_no: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      DOB: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      breed: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      color: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      currentManager: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      county: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      isHeifer: [],
      isServed: [],
      inseminationType: [],
      isShowingHeat: [],
      milkProduction: [],
      milkingRoutine: [],
      cycleStage: []
    });

    this.cowForm.patchValue({
      name: this.myCow.name,
      tag_no: this.myCow.tag_no,
      DOB: this.myCow.DOB,
      breed: this.myCow.breed,
      color: this.myCow.color,
      currentManager: this.myCow.currentManager,
      county: this.myCow.county,
      isHeifer:this.myCow.isHeifer,
      isServed: this.myCow.isServed,
      isShowingHeat: this.myCow.isShowingHeat,
      milkProduction: this.myCow.milkProduction,
      milkingRoutine: this.myCow.milkingRoutine,
      cycleStage: this.myCow.cycleStage
    })
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
    });

    LocalNotifications.addListener('localNotificationReceived',(notification: LocalNotificationSchema)=>{
      // remember to update notification page, and update cycle stage? and schedule another notification? 
      this.presentAlert(`Received: ${notification.id}`,`Custom Data: ${JSON.stringify(notification.extra)}`);
      console.log(notification.id);
    });

  }

  manageCow() {
    // if state changed, schedule notification else just update
    this.updateCow();
  }

  async updateCow() {
    const loading = this.loadingController.create({
      message: 'Updating cow....'
    });
    (await loading).present();

    console.log(this.cowForm.value);
     const cow = await this.cowService.updateCow(this.cowForm.value);

    (await loading).dismiss();

    if (cow) {
      // store ui in local storage --! not safe eventually use ionic secure storage
    const loading = this.loadingController.create({
      message: 'Successful..'
    });
      // this.router.navigateByUrl('/tabs/tab1', {replaceUrl: true}); 
      this.router.navigate(['tabs/tab1']);
    } else {
      this.presentAlert('Updating cow failed', 'Please try again'); 
    }
  }

 async deleteCow(moo: Cow) {
  const loading = this.loadingController.create({
    message: 'Deleting cow....'
  });
  (await loading).present();
  const cow = await this.cowService.deleteCow(moo);

    (await loading).dismiss();

    if (cow) {
      // store ui in local storage --! not safe eventually use ionic secure storage
    const loading = this.loadingController.create({
      message: `Successfully deleted ${moo.name}`
    });
      // this.router.navigateByUrl('/tabs/tab1', {replaceUrl: true}); 
      this.router.navigate(['tabs/tab1']);
    } else {
      this.presentAlert('Deleting cow failed', 'Please try again'); 
    }
  }

  async delete( ) {
    const alert = await this.alertController.create({
      header: 'Hey',
      subHeader: 'Are you sure you want to delete?',
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
            this.deleteCow(this.myCow);
          },
        },
      ],
    });

    await alert.present();
  }

 async report() {
    let x = this.cowForm.value;
    const  dd = {
      watermark: {text: 'Joto Alert', color: 'blue', opacity: 0.2, bold: true}, 
      header: `${new Date().toDateString()}: ${new Date().toTimeString()}`,
  
    footer: {
      columns: [
        'Left part',
        { text: 'Right part', alignment: 'right' }
      ]
    },
      content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', '*', ],
  
          body: [
            [ 'Characteristic', 'Value',  ],
            ['Cow Name', x.name],
            ['Tag_ No', x.tag_no],
            ['Heifer or Cow', 'Heifer'],
            ['Milk Production in Litres', x.milkProduction || ''],
            ['Milking Routine', x.milkingRoutine|| ''],
            ['Gave Birth', x.hasCalves|| '']
          ]
        }
      }
    ]  
  };

  this.pdf = await pdfMake.createPdf(dd);
  console.dir(this.pdf);
  //  now download the pdf

  if(this.plt.is('cordova')) {
    this.pdf.getBase64(async (data) => {
      try {
        let path =  `pdf/cowReport_${Date.now()}.pdf`;
        const result = await Filesystem.writeFile({
          path,
          data,
          directory: Directory.Documents,
          recursive: true
        });
        this.fileOpener.open(`${result.uri}`, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
      } catch (error) {
        console.log('unable to write file' , error);
      }
    });

  } else {
    this.pdf.download();
  }
  }

  changeCowState({state: string, date: Date}) {
    this.basicNotifier
  }

  reset() {

  }

  async presentAlert(header, message){
    const alert= await this.alertController.create({
      header,
      message,
      buttons:['OK']
    });
    alert.present();
  }

  get name() {
    return this.cowForm.get('name');
  }

  get DOB() {
    return this.cowForm.get('DOB');
  }

  get inseminationType() {
    return this.cowForm.get('inseminationType');
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

  get milkProduction() {
    return this.cowForm.get('milkProduction');
  }
}
