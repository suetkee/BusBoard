import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { getStopCode} from './userInput.js';
import { getUserPostcode } from './userInput.js';
import { getArrivals } from './clientsTfl.js';
import { validateUKPostcode } from './userInput.js';
//import { getPostcode } from './clientsTfl.js';
//import { getNearBusStop } from './clientsTfl.js';

dotenv.config();

const api_key = process.env.API_KEY;

const stopCode = getStopCode();

const response = await getArrivals(stopCode, api_key);
console.log(response);

// Check number of arriving buses
const numOfArrBus = response.length;

// Print next 5 (or less if there are less than 5) buses
/* let arrivingBuses = [{
  
}];
for (let i = 0; i < numOfArrBus; i++) {
  arrivingBuses.push(response[i].lineId);
  console.log(response[i].lineId);
} */
const StopArrivals = response.map((bus)=>{
  return{
    "Bus Number": bus.lineName,
    "Destination": bus.destinationName,
    "Time_to_arrival": (bus.timeToStation/60).toFixed(1)
  }
});
// console.log(StopArrivals);
StopArrivals.sort((a, b) => a.Time_to_arrival - b.Time_to_arrival);
// console.log(StopArrivals);

const firstFive = StopArrivals.slice(0, 5);
console.log(firstFive);

/*

        do{
            try {
                triangle = getTriangleDim();
                bError=false;
                }
                //([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})
            catch (Exception e){
                System.out.println("You did not enter an integer, please enter an integer value");
                triangle = getTriangleDim();

                }
        }while (bError);



*/

let beRror = true;
let userPostcode ;
do {
  try {
    userPostcode = getUserPostcode();
   
    if ((validateUKPostcode(userPostcode) == false)) {
      throw 'Invalid postcode';
       }
       beRror = false;
  } catch (err) {
   console.log("Invalid postcode - please try again.")
   
  }
} while(beRror)


const urlPostcode = 'https://api.postcodes.io/postcodes/' + userPostcode;


const responseGetPostcode = await getPostcode(urlPostcode);
console.log(responseGetPostcode);

/*
const lon = responseGetPostcode.result.longitude;
const lat = responseGetPostcode.result.latitude;

// console.log(lon);
// console.log(lat);



const responseNearBusStop = await getNearBusStop();
console.log(responseNearBusStop);

//console.log(responseNearBusStop.stopPoints[0].id);
//console.log(responseNearBusStop.stopPoints[0].commonName);
*/
// stopcode 490008660N
