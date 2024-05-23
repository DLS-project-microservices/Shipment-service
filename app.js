import {consumeOrderCompleted} from './messages/consumeOrderCompleted.js'
import { publishShipmentFailed } from './messages/publishShipmentFailed.js';
import express from 'express';


const app = express();

await consumeOrderCompleted();