const redis = require('redis');

const client = redis.createClient({
    url: 'redis://:123456789@redis-16301.c1.asia-northeast1-1.gce.redns.redis-cloud.com:16301'
});

client.on('connect', () => {
    console.log('Connected to Redis...');
});

client.on('error', (err) => {
    console.error('Redis error: ' + err);
});

client.connect().catch(console.error);

module.exports = client;