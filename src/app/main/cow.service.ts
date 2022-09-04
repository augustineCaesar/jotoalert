import { Injectable } from '@angular/core';
import { addDoc, doc, collection, Firestore, setDoc, onSnapshot, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cow } from '../interfaces/cow';

@Injectable({
  providedIn: 'root'
})
export class CowService {
  cowList = [];
  cowSubject: BehaviorSubject <any>= new BehaviorSubject([]);

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


  // async getOneCows() {
  //   console.log('gettn cows');
  //   const unsub = onSnapshot(doc(this.firestore, "cows", ), (doc) => {
  //     console.log("Current data: ", doc.data());
  //   });
  // }

  async getCows() {
    console.log('gettn cows');
    const cowSnapshot = await getDocs(collection(this.firestore, "cows"));
    cowSnapshot.forEach(async (doc) => {
      await this.cowList.push(doc.data());
      // console.log(doc.id, " => ", doc.data());
    });
    console.dir(this.cowList);
    this.cowSubject.next(this.cowList);
  }
}
