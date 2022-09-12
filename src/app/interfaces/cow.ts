export interface Cow {
    serverID: string;
    name: string;
    tag_no: string;
    isHeifer: boolean;
    DOB: any;
    breed: string;
    color: string;
    isServed: boolean;
    isShowingHeat: boolean;
    inseminationType: string;
    currentManager: string;
    county: string;
    cycleStage: any;
    hasCalves: boolean;
    calvingTimes: string;
    milkProduction: any;
    milkingRoutine: string;

}

export interface Notice {
    idx: string;
    name: string;
    message: string
}

// var yob = value.slice(-5);
// var today = new Date().getFullYear();
// if (today - yob >= 1) {
//   console.log('is heifa')
// }