import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private modalCtrl: ModalController, ) { }

  credentials: FormGroup;


  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4),]],
    })
  }

  get email() {
    return this.credentials.get('email');  
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {

    const loading = this.loadingController.create({
      message: 'Logging in...'
    });
    (await loading).present();
    const user = await this.authService.login(this.credentials.value);
    (await loading).dismiss();

    if (user) {
      // store ui in local storage --! not safe eventually use ionic secure storage
    const loading = this.loadingController.create({
      message: 'Successful..'
    });
    
    // console.log('hii manenoz',this.auth.currentUser.uid);
      this.router.navigateByUrl('tabs/tab1', {replaceUrl: true}); 
    } else {
      this.showAlert('Login failed', 'Please try again'); 
    } 
  }

  async showAlert(header, message){

    const alert = this.alertController.create({
        header, message, buttons: ['okay'],
      });
       
      (await alert).present();  
    }

}
