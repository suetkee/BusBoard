import fetch from 'node-fetch';
import dotenv from 'dotenv';
import promptSync from 'prompt-sync';

const prompt = promptSync();

dotenv.config();

const api_key = process.env.API_KEY;

const getArrivals = async (stopPoint, apiKey) => { 
  try { 
    const result = await fetch('https://api.tfl.gov.uk/StopPoint/' + stopPoint + '/Arrivals?app_key=' + apiKey);
    const json = await result.json();
    return json;
    } catch (error) { console.error('Error:', error); } 
};

// Get bus stop code from user
const stopCode = prompt('Please enter bus stop code:');

const response = await getArrivals(stopCode, api_key);
console.log(response);


// Check number of arriving buses
const numOfArrBus = response.length;

// Print next 5 (or less if there are less than 5) buses
//let arrivingBuses = [];
for (let i = 0; i < 5 && i < numOfArrBus; i++) {
  //arrivingBuses.push(response[i].lineName);
  console.log(response[i].lineName);
}


const getPostcode = async (url) => {
  try {
    const result = await fetch(url);
    const json = await result.json();
    return json;
  } catch (error) { console.error('Error:', error); } 
}

// Get postcode from user
const userPostcode = prompt('Please enter the postcode:');
const urlPostcode = 'https://api.postcodes.io/postcodes/' + userPostcode;

const responseGetPostcode = await getPostcode(urlPostcode);
// console.log(responseGetPostcode);

const lon = responseGetPostcode.result.longitude;
const lat = responseGetPostcode.result.latitude;

// console.log(lon);
// console.log(lat);

const urlNearBusStop = 'https://api.tfl.gov.uk/StopPoint/?lat=' + lat + '&lon=' + lon + '&stopTypes=NaptanPublicBusCoachTram';
const getNearBusStop = async () => {
  try {
    const result = await fetch(urlNearBusStop);
    const json = await result.json();
    return json;
  } catch (error) { console.error('Error:', error); } 
}

const responseNearBusStop = await getNearBusStop();
console.log(responseNearBusStop);

//console.log(responseNearBusStop.stopPoints[0].id);
//console.log(responseNearBusStop.stopPoints[0].commonName);
