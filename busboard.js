import dotenv from 'dotenv';
import { getStopCode} from './userInput.js';
//import { getUserPostcode } from './userInput.js';
import { getNext5Arrivals } from './fetchDemo.js';
//import { validateUKPostcode } from './userInput.js';
//import { getPostcode } from './clientsTfl.js';
import { ObtainValidPostcode } from './fetchDemo.js';
import { getNext5Arrivals_PCode } from './fetchDemo.js';

dotenv.config();

const api_key = process.env.API_KEY;


const stopCode = getStopCode();
getNext5Arrivals (stopCode, api_key) ;

const postCode = ObtainValidPostcode(); 
getNext5Arrivals_PCode(postCode);