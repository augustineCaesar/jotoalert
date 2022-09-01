import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  get email() {
    return this.credentials.get('email');  
  }

  get password() {
    return this.credentials.get('password');
  }

  async register() {
    const loading = this.loadingController.create();
    (await loading).present();
    const user = await this.authService.register(this.credentials.value);
    (await loading).dismiss();

    if (user) {
      const loading = this.loadingController.create({
        message: 'Creating...'
      });
      
      this.router.navigateByUrl('/tabs/tab1', {replaceUrl: true}); 

    } else {
      this.showAlert('Registration failed', 'Please try again'); 
    }
  }

  async showAlert(header, message){

    const alert = this.alertController.create({
        header, message, buttons: ['okay'],
      });
       
      (await alert).present();  
    }

}
