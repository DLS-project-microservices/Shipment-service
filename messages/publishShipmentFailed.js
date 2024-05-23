import { connectToRabbitMQ } from 'amqplib-retry-wrapper-dls';

async function publishShipmentFailed(message) {
    const exchangeName = 'order_direct';
    const exchangeType = 'direct';
    const routingKey = 'shipment_sent_failed'
    
    try {
        const channel = await connectToRabbitMQ(process.env.AMQP_HOST);
        await channel.assertExchange(exchangeName, exchangeType, {
            durable: true
        });
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('shipment_failed message published successfully');
    } catch(error){
        console.error('Error publishing shipment_failed message:', error);
    }
};

export { publishShipmentFailed }