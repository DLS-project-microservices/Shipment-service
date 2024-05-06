import {consumeOrderCompleted} from './messages/consumeOrderCompleted.js'
import express from 'express';


const app = express();

await consumeOrderCompleted();