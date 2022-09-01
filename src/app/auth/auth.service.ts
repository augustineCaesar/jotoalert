
import { Injectable } from '@angular/core';
import  {Auth,getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  authUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private auth: Auth, private router: Router) { }

  async register({email,password}) {
    try { 
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.authUser.next(user);
      return user; 
    } catch (error) {
      return null;
    } 
  }

  async login({email, password}) {
    try { 
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.authUser.next(user);
      return user; 
    } catch (error) {
      return null;
    } 

  }

    async passwordResetEmail(email) {
        var message;
        try {
          await sendPasswordResetEmail(this.auth, email);
          message = 'Password email has been sent, check your email'
          return message;
        } catch (error) {
          message =  `Try creating account: user not found`;
          return message;
        }
    }



}

