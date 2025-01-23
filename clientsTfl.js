export const getArrivals = async (stopPoint, apiKey) => { 
    try { 
      const result = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals?app_key=${apiKey}`);
      const json = await result.json();
      return json;
      } catch (error) { console.error('Error:', error); } 
  };
  
  
export const getPostcode = async (url) => {
  try {
    const result = await fetch(url);
    const json = await result.json();
    return json;
  } catch (error) { console.error('Error:', error); } 
}
/*
export const urlNearBusStop = 'https://api.tfl.gov.uk/StopPoint/?lat=' + lat + '&lon=' + lon + '&stopTypes=NaptanPublicBusCoachTram';
export const getNearBusStop = async () => {
  try {
    const result = await fetch(urlNearBusStop);
    const json = await result.json();
    return json;
  } catch (error) { console.error('Error:', error); } 
}*/