import { Injectable } from '@angular/core';
import { addDoc, doc, collection, Firestore, setDoc } from '@angular/fire/firestore';
import { Cow } from '../interfaces/cow';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  constructor( private firestore: Firestore) { }

  async uploadCow(postCow: Cow) {
  //   const docRef = await addDoc(collection(this.firestore, "cows"), postCow);
  //   console.log("Document written with ID: ", docRef.id);
  // }
  console.log('called0');
      try {
        console.log('called1');
        await setDoc(doc(this.firestore, "cows", postCow.tag_no), postCow);
        console.log('cow uploaded successfully');
        return true;
      } catch (error) {
        return null;
        // console.log('this is ze error', error.message);
        //   return error.message
      }
  
  }
}