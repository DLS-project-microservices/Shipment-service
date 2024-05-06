import connectToRabbitMQ from './connection.js';

async function publishShipmentSent(message) {
    try{
        const connection = await connectToRabbitMQ();
        const channel = await connection.createChannel();
        const exchangeName = 'shipment_fanout';
        const exchangeType = 'fanout';

        await channel.assertExchange(exchangeName, exchangeType, {
            durable: true
        });

        channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
        console.log('shipment_sent message published successfully');
    } catch(error){
        console.error('Error publishing shipment_sent message:', error);
    }

}

export {publishShipmentSent}