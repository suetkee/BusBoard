import fetch from 'node-fetch';
import dotenv from 'dotenv';
import promptSync from 'prompt-sync';

dotenv.config();

const api_key = process.env.API_KEY;

    
     
    const getArrivals = async () => { 
        try { 
        //const result = await fetch(`https://api.tfl.gov.uk/StopPoint/${input}/Arrivals?app_key=${api_key}`);
       const result = await fetch(`https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals?app_key=1517ae8774c749cfa2e031ac2ec64c28`);

     const json = await result.json();
        return json;
        } catch (error) { console.error('Error:', error); } 
       
    };
       
    //getArrivals("490008660N",api_key);
        



  //  const prompt = promptSync();
   // const userInput = prompt("Please enter bus stop code:");
   const response = await getArrivals();
    //const response = await getArrivals(userInput, api_key);
    console.log(response);

console.log(response[0].lineName);
