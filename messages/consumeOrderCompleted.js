import { connectToRabbitMQ } from 'amqplib-retry-wrapper-dls';
import { publishShipmentSent } from './publishShipmentSent.js'

const channel = await connectToRabbitMQ(process.env.AMQP_HOST);

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
            try{
                if (msg !== null) {
                    const messageContent = JSON.parse(msg.content.toString());
                    await publishShipmentSent(messageContent);
                    console.log('order_completed consume successfully', messageContent);
                    
                    channel.ack(msg);
                }

            } catch(error){
                console.error('Error processing order_completed:', error);
            }
        })

    } catch(error) { 
        console.error('Error connecting to RabbitMQ:', error);
    }
}

export { consumeOrderCompleted };