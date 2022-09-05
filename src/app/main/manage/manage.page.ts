import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CowService } from '../cow.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Cow } from 'src/app/interfaces/cow';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  constructor( private modal: ModalController, private fb: FormBuilder, public alertController: AlertController, private router: Router,
    private loadingController: LoadingController, private cowService: CowService) { }

  myCow: Cow;
  x;
  cowForm: FormGroup;
  isCow = false;
  izHeifer = false;

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

    LocalNotifications.addListener  
  }

  manageCow() {
    // if state changed, schedule notification else just update
  }

  changeCowState({state: string, date: Date}) {
    this.basicNotifier
  }

  reset() {

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

  get milkProduction() {
    return this.cowForm.get('milkProduction');
  }
}
