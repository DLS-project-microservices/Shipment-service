import channel from './connection.js';

const exchangeName = 'shipment_fanout';
const exchangeType = 'fanout';

await channel.assertExchange(exchangeName, exchangeType, {
    durable: true
});

async function publishShipmentSent(message) {
    try{
        channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
        console.log('shipment_sent message published successfully');
    } catch(error){
        console.error('Error publishing shipment_sent message:', error);
    }

}

export { publishShipmentSent }