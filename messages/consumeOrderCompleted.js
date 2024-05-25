import channel from './connection.js';
import { publishShipmentSent } from './publishShipmentSent.js'
import { publishShipmentFailed } from './publishShipmentFailed.js';

async function consumeOrderCompleted(){
    const exchangeName = 'order_direct';
    const queueName = 'shipment_service_consume_order_completed';
    const routingKey = 'order completed';
    const exchangeType = 'direct';
    
    try{
        await channel.assertExchange(exchangeName, exchangeType, {
            durable: true
        });

        const assertQueue = await channel.assertQueue(queueName, {
            durable: true
        });

        channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

        await channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                
                const badProduct = messageContent.orderLineItems.find(lineItem => lineItem.productName === 'shipping problem');
                if (badProduct) {
                    await publishShipmentFailed(messageContent);
                }
                else {
                    await publishShipmentSent(messageContent);
                }
                console.log('order_completed consumed successfully');
                    
                channel.ack(msg);
            }   
        })
    } catch(error) { 
        console.error('Error connecting to RabbitMQ:', error);
    }
}

export { consumeOrderCompleted };