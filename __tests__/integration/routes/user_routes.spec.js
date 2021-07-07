const request = require('supertest');
const User = require('../../../models/user');
const testHelper = require("../../setup/db");

let server;
let data = {
    firstname:"John",
    lastname:"doe",
    email:"johndoe@gmail.com",
    password:"123456789",
    occupation:"DevOps @ johndoeinc"
};

describe('/api/users', ()=>{
    //connect to test database before all tests
    beforeAll(async()=> await testHelper.connectToTestDb());

    //retrieve server connection before each test
    beforeEach(()=>{
        jest.setTimeout(10000);
        server = require('../../../server')
    });

    //clear database after each test and close server
    afterEach(async()=>{
        await testHelper.clearTestDb();
        await server.close();
    });

    //close mongoose connection and drop database after all test
    afterAll(async()=> await testHelper.closeTestDbConnection());
    
    describe('POST /', ()=>{
        test('Should return status 400, if validation fails', async()=>{
            const response = await request(server).post('/api/users').send({});
            expect(response.status).toBe(400);
            expect(response).toHaveProperty('error');
        });

        test('should return 400 if user with given email already exists', async()=>{
            const user = new User(data);
            await user.save();
           
            const response = await request(server).post('/api/users').send(data);            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("msg");
        });

        test('should return 200, if registration succeeds', async()=>{
            const response = await request(server).post('/api/users').send(data);
            expect(response.status).toBe(200);

            const user = await User.find({});
            expect(user[0]).toHaveProperty('email','johndoe@gmail.com');
            expect(user.length).toBe(1);            
        })
    })
})