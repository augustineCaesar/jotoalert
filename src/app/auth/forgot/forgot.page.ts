import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  emailForm: FormGroup;
  showLoading: boolean;
  loadingMessage : any = '';

  constructor(private authProvider: AuthService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
    })
  }

  get email() {
    return this.emailForm.get('email');  
  }

  async resetPasswordEmail() {
    this.showLoading = true;
    this.loadingMessage = 'please wait...'
    const errorMessage = await this.authProvider.passwordResetEmail(this.emailForm.value.email);
    this.showLoading = false;
    this.loadingMessage = errorMessage;
    console.log (this.loadingMessage);
  }

}
