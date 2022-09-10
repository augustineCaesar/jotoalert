import { Injectable } from '@angular/core';
import { addDoc, doc, collection, Firestore, setDoc, onSnapshot, getDocs, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cow } from '../interfaces/cow';
import { Notice } from '../interfaces/cow';

@Injectable({
  providedIn: 'root'
})
export class CowService {
  cowList = [];
  noticeList = [];
  noticeSubject: BehaviorSubject <any>= new BehaviorSubject([]);
  cowSubject: BehaviorSubject <any>= new BehaviorSubject([]);
  birth:  {notice: '7889400000', msg: 'Weaning'}; // 3 months in milliseconds
  checkHeat: {notice: '39447000000', msg: 'Check Signs of Heat'} // 15months in milliseconds
  checkHeatAgain: {notice: '1728000000', msg: 'Check signs of Heat again '} // 20 days in milliseconds
  doPregnancyTest: {notice: '7889400000', msg: 'Do a pregnancy test'}
  dryCow: {notice: '5259600000', msg: 'Dry the cow'}
  

  constructor( private firestore: Firestore) { }

  // notice diff btwn addDoc and setDoc
  async uploadCow(postCow: Cow) {
  //   const docRef = await addDoc(collection(this.firestore, "cows"), postCow);
  //   console.log("Document written with ID: ", docRef.id);
  // } 
  
      try {
        await setDoc(doc(this.firestore, "cows", postCow.tag_no), postCow);
        console.log('cow uploaded successfully');
        return true;
      } catch (error) {
        return null;
      }
  
  }

  async uploadNotice(postCow: Cow) {
        try {
          // await setDoc(doc(this.firestore, "cows", postCow.tag_no), postCow);
          // console.log('cow uploaded successfully');
          const docRef = await addDoc(collection(this.firestore, "notices"), postCow);
          console.log("Document written with ID: ", docRef.id);
          return true;
        } catch (error) {
          return null;
        }
    }

  async getCows() {
    console.log('gettn cows');
    this.cowList = [];
    const cowSnapshot = await getDocs(collection(this.firestore, "cows"));
    cowSnapshot.forEach(async (doc) => {
      await this.cowList.push(doc.data());
      // console.log(doc.id, " => ", doc.data());
    });
    console.dir(this.cowList);
    this.cowSubject.next(this.cowList);
  }

  async getNotices() {
    this.noticeList = [];
    const cowSnapshot = await getDocs(collection(this.firestore, "notices"));
    cowSnapshot.forEach(async (doc) => {
      await this.noticeList.push(doc.data());
      // console.log(doc.id, " => ", doc.data());
    });
    console.dir(this.noticeList);
    this.cowSubject.next(this.noticeList);
  }

  async updateCow(postCow: Cow){
    console.log(postCow);
  console.log('i got here');
    const cowRef = doc(this.firestore, "cows", postCow.tag_no);
    try {
      console.log('i got here2');
      await updateDoc(cowRef,
         {
        name: postCow.name,
        tag_no: postCow.tag_no,
        isHeifer: postCow.isHeifer,
        DOB: postCow.DOB,
        breed: postCow.breed,
        color: postCow.color,
        isServed: postCow.isServed,
        isShowingHeat: postCow.isShowingHeat,
        inseminationType: postCow.inseminationType,
        currentManager: postCow.currentManager,
        county: postCow.county,
        // cycleStage: postCow.cycleStage,
        // hasCalves: postCow.hasCalves,
        // calvingTimes: postCow.calvingTimes,
        // milkProduction: postCow.milkProduction,
        // milkingRoutine: postCow.milkingRoutine
      },
     
      );
      this.getCows();
      return true;
    } catch (error) {
      console.log('i got here3');
      console.log(error);
      return null;
    }
  }

  async deleteCow( cow: Cow) {
    try {
      const c = await deleteDoc(doc(this.firestore, "cows", cow.tag_no));
      console.log('deleted', c);
      this.getCows();
      return true; 
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteNotice( notice: Notice) {
    try {
      const c = await deleteDoc(doc(this.firestore, "notices", notice.id));
      console.log('deleted', c);
      this.getNotices();
      return true; 
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
