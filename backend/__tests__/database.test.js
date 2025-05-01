const db = require('../db/knex');
describe('1. DB Connection', () => {
    it('a. connects to the database and runs a simple query', async () => {
        try {
            const result = await db.raw('SELECT 1+1 AS result');
            expect(result).toBeDefined();
            expect(result.rows).toBeDefined();
            expect(result.rows[0].result).toBe(2);
        } catch (error) {
            throw new Error(`Database connection failed: ${error.message}`);
        }
    });
    it('exports a valid Knex instance', () => {
        expect(db).toBeDefined();
        expect(typeof db.select).toBe('function');
        expect(typeof db.insert).toBe('function');
        expect(typeof db.raw).toBe('function');
    });

    // Close the connection pool
    afterAll(async () => {
        await db.destroy();
    });
});