import { Injectable } from '@angular/core';
/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {

    //Provide all the Application Configs here
    public version:string = "1.0.0";

    // API Related configs
    public apiProtocol:string= "http:";
    public apiHostName:string="172.26.41.252";
    public apiPort:string="9000";
    public baseApiPath:string="";
    public ifLoggedIn: boolean = false;
    public users = ['Sandeep Roy', 'Shailesh Nayak', 'Sahil Sharma'] ;
    public password = 'password123';
    public loggedinuser = '';
    public symptoms= ["headache","nausea","vomiting","high fever","diarrhea","fatigue","muscle aches","coughing","pain","stiffness",
          "swelling","redness","wheezing","learning disability","epilepsy","chronic pain","blood discharge","sneezing",
          "pain during urination","genital pain","palpitation","weakness","faster heartbeat", "nasal dryness","sore throat",
          "abdominal pain","weight loss","chills","chest pain","back pain","tired","blindness","blurred vision","dry mouth",
          "paralysis","dizziness","memory loss","nose bleed","jaundice","constipation"];
    constructor(){
        this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + ":" + this.apiPort +"/";
    }
}

