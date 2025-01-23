import promptSync from 'prompt-sync';

const prompt = promptSync();

export const getStopCode = () => prompt('Please enter bus stop code:');
export const getUserPostcode = () => prompt('Please enter the postcode:');

export function validateUKPostcode(postcode) {
    // Regular expression pattern to match UK postcodes
    const postcodePattern = /^[A-Za-z]{1,2}[0-9]{1,2} ?[0-9][A-Za-z]{2}$/;
 
    // Remove any whitespace from the postcode
    const formattedPostcode = postcode.replace(/\s/g, '');
 
    // Check if the postcode matches the pattern
    if (postcodePattern.test(formattedPostcode)) {
        return true;
    } else {
        return false;
    }
}