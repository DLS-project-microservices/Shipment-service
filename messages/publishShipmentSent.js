import { connectToRabbitMQ } from 'amqplib-retry-wrapper-dls';

const channel = await connectToRabbitMQ(process.env.AMQP_HOST);

async function publishShipmentSent(message) {
    const exchangeName = 'shipment_fanout';
    const exchangeType = 'fanout';
    
    try{
        await channel.assertExchange(exchangeName, exchangeType, {
            durable: true
        });

        channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
        console.log('shipment_sent message published successfully');
    } catch(error){
        console.error('Error publishing shipment_sent message:', error);
    }

}

export { publishShipmentSent }