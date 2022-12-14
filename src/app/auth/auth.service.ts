import { Injectable, NgZone } from '@angular/core';
import { User } from './models/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from '@firebase/util';
import { map } from 'rxjs/operators'
import { AlertService } from '../shared/services/alert.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.firebaseConfig.databaseURL;
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private http: HttpClient,
    private alertService: AlertService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string, isUsername: boolean = false) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['money']);
          }
        });
      })
      .catch((error) => {
        if (isUsername)
          this.alertService.error("Username or password is incorrect.");
        else
          this.alertService.error("Email or password is incorrect.");
      });
  }
  // Sign up with email/password
  SignUp(username: string, email: string, password: string) {
    this.getUsernameWithEmail(username).subscribe((_email: any) => {
      if (_email) {
        this.alertService.error("Username already taken.");
        return;
      } else {
        return this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign 
            up and returns promise */
            // this.SendVerificationMail();
            this.SetUserData(result.user, username);
            this.SignIn(email, password);
          })
          .catch((error) => {
            this.alertService.error("Email address already taken.");
          });
      }
    })

  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string, isUsername: boolean) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.alertService.error('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        if (isUsername) {
          this.alertService.error("Wrong username.");
        } else {
          this.alertService.error("Wrong email.");
        }
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['money']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['money']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.alertService.error(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, username?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    // for save username
    if (username) {
      this.http.post(this.apiUrl + '/usernames.json', { email: user.email, username: username }).subscribe();
    }

    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  getUsernameWithEmail(email: string) {
    return this.http.get(this.apiUrl + '/usernames.json')
      .pipe(
        map((res: any) => {
          let req = [];
          for (const key in res) {
            req.push({ ...res[key] })
          }
          return req.find(i => i.username == email)?.email;
        })
      );
  }
}