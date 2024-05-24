import 'dotenv/config';
import { consumeOrderCompleted } from './messages/consumeOrderCompleted.js'

await consumeOrderCompleted();
