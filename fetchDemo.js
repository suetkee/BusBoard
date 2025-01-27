import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { getStopCode} from './userInput.js';
import { getUserPostcode } from './userInput.js';
import { getArrivals } from './clientsTfl.js';
import { validateUKPostcode } from './userInput.js';
import { getPostcode } from './clientsTfl.js';
import { getNearBusStop } from './clientsTfl.js';

dotenv.config();

const api_key = process.env.API_KEY;

//const stopCode = getStopCode();
export const getNext5Arrivals = async (stopCode, api_key) =>{
  const response = await getArrivals(stopCode, api_key);
  try {
    if (response.length === 0) {
      throw "No bus arriving at the moment";
    }
  } catch (error) {
    console.log(error);
  }

  const StopArrivals = await response.map((bus)=>{
  return{
    "Bus Number": bus.lineName,
    "Destination": bus.destinationName,
    "Time_to_arrival": (bus.timeToStation/60).toFixed(1)
  }
  });
  
  StopArrivals.sort((a, b) => a.Time_to_arrival - b.Time_to_arrival);
// console.log(StopArrivals);

  const firstFive = StopArrivals.slice(0, 5);
  console.log(firstFive);
};

export const ObtainValidPostcode = () =>{
  let isNotValidPostCode = true;
  let userPostcode ;
  do {
    try {
      userPostcode = getUserPostcode();
     
      if ((validateUKPostcode(userPostcode) == false)) {
        throw 'Invalid postcode';
         }
         isNotValidPostCode = false;
    } catch (err) {
     console.log("Invalid postcode - please try again.")
     
    }
  } while(isNotValidPostCode)
      return userPostcode;
  }


const getNearestStops = async (postCode) =>{ 
const urlPostcode = `https://api.postcodes.io/postcodes/${postCode}`;
const responseGetPostcode = await getPostcode(urlPostcode);
//console.log(responseGetPostcode);
const lon = await responseGetPostcode.result.longitude;
const lat = await responseGetPostcode.result.latitude;
//console.log(lon);
//console.log(lat);

const urlNearBusStop = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram`;

const responseNearBusStop = await getNearBusStop(urlNearBusStop);
try{
if (responseNearBusStop.stopPoints.length === 0) {
    throw "No bus stops nearby";
}
} catch(error){
  console.log(error);
}
//console.log(responseNearBusStop);
const nearTwoBusStops = responseNearBusStop.stopPoints.map((nearBusStop)=>{
  return{
    "Bus_Stop_ID": nearBusStop.id,
    "Bus_Stop_Name": nearBusStop.commonName,
  }
});

//console.log(nearTwoBusStops);
return nearTwoBusStops;
}

export const getNext5Arrivals_PCode = async (postCode) =>{
const nearTwoBusStops = await getNearestStops (postCode);
let response_TwoStopsArrivals;
for(let busStop of nearTwoBusStops){
  console.log("Bus Stop Name: " + busStop.Bus_Stop_Name);
response_TwoStopsArrivals = await getNext5Arrivals(busStop.Bus_Stop_ID, api_key);

}
};
//console.log(response_TwoStopsArrivals);

// stopcode 490008660N
