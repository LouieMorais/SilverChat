const request = require('supertest');
const app = require('../server');
const db = require('../db/knex');

describe('Server Root Endpoint', () => {
    it('GET returns status 200', async () => {
        const response = await request(app).get('/'); // supertest makes this request

        console.log('Status code: ' + response.statusCode);
        console.log('Status text: ' + response.text);
        console.log('Status headers: ' + response.headers['content-type']);
        console.log('Status body: ' + response.body);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('SilverChat API is running!');
        expect(response.body.message).toBe('SilverChat API is running!');
        expect(response.headers['content-type'].toMatch(/json/));
        expect(response.body).toBeDefined();
    });
    afterAll(async () => {
        await db.destroy();
    });
});