import 'dotenv/config';
import {consumeOrderCompleted} from './messages/consumeOrderCompleted.js'
import {publishShipmentFailed} from './messages/publishShipmentFailed.js';
import { publishShipmentSent } from './messages/publishShipmentSent.js';

await consumeOrderCompleted();

// await publishShipmentFailed('Test message');