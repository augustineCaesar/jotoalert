import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
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
      currentManager: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
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

  async createCow() {
    const loading = this.loadingController.create({
      message: 'Adding cow....'
    });
    (await loading).present();

     const cow = await this.cowService.uploadCow(this.cowForm.value);

    (await loading).dismiss();

    if (cow) {
      // store ui in local storage --! not safe eventually use ionic secure storage
    const loading = this.loadingController.create({
      message: 'Successful..'
    });
      this.dismissModal();
      // this.router.navigateByUrl('/tabs/tab1', {replaceUrl: true}); 
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.showAlert('Adding cow failed', 'Please try again'); 
    }

  }


  async showAlert(header, message){

    const alert = this.alertController.create({
        header, message, buttons: ['okay'],
      });
       
      (await alert).present();  
    }


}
