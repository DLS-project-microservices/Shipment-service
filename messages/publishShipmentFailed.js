import channel from './connection.js';

const exchangeName = 'order_direct';
const exchangeType = 'direct';

await channel.assertExchange(exchangeName, exchangeType, {
            durable: true
        });

async function publishShipmentFailed(message) {
    const routingKey = 'shipment_sent_failed'

    try {
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('shipment_failed message published successfully');
    } catch(error){
        console.error('Error publishing shipment_failed message:', error);
    }
};

export { publishShipmentFailed }