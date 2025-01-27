import fetch from 'node-fetch';

export const getArrivals = async (stopPoint, apiKey) => { 
    try { 
      const result = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals?app_key=${apiKey}`);
      const json = await result.json();
      return json;
      } catch (error) { console.error('Error:', error); } 
  };
  
  
export const getPostcode = async (url) => {
  try {
    const Geo_result = await fetch(url);
    const Geo_json = await Geo_result.json();
    return Geo_json;
  } catch (error) { console.error('Error:', error); } 
}

export const getNearBusStop = async (urlNearBusStop) => {
  try {
    const BusStopID_result = await fetch(urlNearBusStop);
    const BusStopID_json = await BusStopID_result.json();
    return BusStopID_json;
  } catch (error) { console.error('Error:', error); } 
}