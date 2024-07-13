import connectMongoDB, { disconnectMongoDB } from '../database/index';
import { app } from '../../app/app';
import request from 'supertest';


describe('Test sequence of users, pixkey, auth & tokens routes - leaky-bucket-graphql-relay', () => {

  beforeAll(async () => {
    connectMongoDB();    
  });

  afterAll(async () => {    
    disconnectMongoDB();
  });

 
  let userId1: string;
  let userId2: string;
  let userId3: string;

  let pixkeyId1: string;
  let pixkeyId2: string;
  let pixkeyId3: string;  

  let authToken: string;

  const userName1 = "user1@email.com"
  const userName2 = "user2@email.com"
  const userName3 = "user3@email.com"

  const userPassword1 = "user1password";
  const userPassword2 = "user2password";
  const userPassword3 = "user3password";

  const pixkey_type1 = "CPF";
  const pixkey_type2 = "EVP";
  const pixkey_type3 = "PHONE";
  const pixkey_type4 = "EMAIL";

  const pixkey1 = "59887594083";  
  const pixkey2 = "669139a718c8805979fa0cca669139a718c1";
  const pixkey3 = "+5511922334455";
  const pixkey4 = "unsaved@email.com";


  /* Users Tests */

  test('1-mutation-CreateUser - create 1th user', async () => {
    const createUserMutation = `
      mutation CreateUser {
        createUser(input: { 
          username: "${userName1}", 
          password: "${userPassword1}" }) {
            user {
                id
                username
                tokens
                createdAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createUserMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createUser.user).toHaveProperty('id');
    expect(response.body.data.createUser.user.username).toBe(userName1);
    expect(response.body.data.createUser.user.tokens).toBe(10);

    userId1 = response.body.data.createUser.user.id;
  });


  test('2-mutation-CreateUser - create 2nd user', async () => {
    const createUserMutation = `
      mutation CreateUser {
        createUser(input: { 
          username: "${userName2}", 
          password: "${userPassword2}" }) {
            user {
                id
                username
                tokens
                createdAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createUserMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createUser.user).toHaveProperty('id');
    expect(response.body.data.createUser.user.username).toBe(userName2);
    expect(response.body.data.createUser.user.tokens).toBe(10);

    userId2 = response.body.data.createUser.user.id;
  });


  test('3-mutation-CreateUser - create 3rd user', async () => {
    const createUserMutation = `
      mutation CreateUser {
        createUser(input: { 
          username: "${userName3}", 
          password: "${userPassword3}" }) {
            user {
                id
                username
                tokens
                createdAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createUserMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createUser.user).toHaveProperty('id');
    expect(response.body.data.createUser.user.username).toBe(userName3);
    expect(response.body.data.createUser.user.tokens).toBe(10);

    userId3 = response.body.data.createUser.user.id;
  });


  test('4-mutation-UpdateUser - update 3rd user', async () => {
    const updateUserMutation = `
      mutation UpdateUser {
        updateUser(input: { 
          id: "${userId3}", 
          password: "${userPassword3+"x"}" }
        ) {
            user {
                id
                username
                tokens
                createdAt
                updatedAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: updateUserMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.updateUser.user).toHaveProperty('id');
    expect(response.body.data.updateUser.user.username).toBe(userName3);

  });

  test('5-mutation-DeleteUser - delete 3rd user', async () => {
    const deleteUserMutation = `
      mutation {
        deleteUser(input: { 
            id: "${userId3}" }) {
          deletedUserId          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: deleteUserMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.deleteUser.deletedUserId).toBe(userId3)

  });  

  test('6-query-UserById - find 1h user', async () => {
    const userByIdQuery = `
      query UserById {
        userById(id: "${userId1}") {
          id
          username
          tokens
          createdAt          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: userByIdQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.userById.username).toBe(userName1);
    expect(response.body.data.userById.tokens).toBe(10);

  });    


  /* PixKeys Tests */

  test('7-mutation-CreatePixKey - create 1th pixkey', async () => {
    const createPixKeyMutation = `
      mutation CreatePixKey {
        createPixKey(input: { 
          pixkey_type: "${pixkey_type1}", 
          pixkey: "${pixkey1}" 
        }) {
            pixkey {
                id
                pixkey_type
                pixkey
                createdAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createPixKeyMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createPixKey.pixkey).toHaveProperty('id');
    expect(response.body.data.createPixKey.pixkey.pixkey_type).toBe(pixkey_type1);
    expect(response.body.data.createPixKey.pixkey.pixkey).toBe(pixkey1);

    pixkeyId1 = response.body.data.createPixKey.pixkey.id;
  });


  test('8-mutation-CreatePixKey - create 2nd pixkey', async () => {
    const createPixKeyMutation = `
      mutation CreatePixKey {
        createPixKey(input: { 
          pixkey_type: "${pixkey_type2}", 
          pixkey: "${pixkey2}" 
        }) {
            pixkey {
                id
                pixkey_type
                pixkey
                createdAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createPixKeyMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createPixKey.pixkey).toHaveProperty('id');
    expect(response.body.data.createPixKey.pixkey.pixkey_type).toBe(pixkey_type2);
    expect(response.body.data.createPixKey.pixkey.pixkey).toBe(pixkey2);

    pixkeyId2 = response.body.data.createPixKey.pixkey.id;
  });


  test('9-mutation-CreatePixKey - create 3rd pixkey', async () => {
    const createPixKeyMutation = `
      mutation CreatePixKey {
        createPixKey(input: { 
          pixkey_type: "${pixkey_type3}", 
          pixkey: "${pixkey3}" 
        }) {
            pixkey {
                id
                pixkey_type
                pixkey
                createdAt
            }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createPixKeyMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createPixKey.pixkey).toHaveProperty('id');
    expect(response.body.data.createPixKey.pixkey.pixkey_type).toBe(pixkey_type3);
    expect(response.body.data.createPixKey.pixkey.pixkey).toBe(pixkey3);

    pixkeyId3 = response.body.data.createPixKey.pixkey.id;
  });


  test('10-mutation-DeletePixKey - delete 3rd pixkey', async () => {
    const deletedPixKeyMutation = `
      mutation DeletePixKey {
        deletePixKey(input: { 
            id: "${pixkeyId3}" }) {
          deletedPixKeyId          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: deletedPixKeyMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.deletePixKey.deletedPixKeyId).toBe(pixkeyId3)

  });   

  
  test('11-query-PixkeyById - find 1h pixkey', async () => {
    const pixkeyByIdQuery = `
      query PixkeyById {
        pixkeyById(
          id: "${pixkeyId1}") {
          id
          pixkey_type
          pixkey
          createdAt
          updatedAt
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: pixkeyByIdQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.pixkeyById.pixkey_type).toBe(pixkey_type1);
    expect(response.body.data.pixkeyById.pixkey).toBe(pixkey1);

  }); 


  test('12-query-PixkeyByValue - find 2h pixkey', async () => {
    const pixkeyByValueQuery = `
      query PixkeyByValue {
        pixkeyByValue(
          pixkey: "${pixkey2}") {
          id
          pixkey_type
          pixkey
          createdAt
          updatedAt
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: pixkeyByValueQuery });
    
    expect(response.status).toBe(200);
    expect(response.body.data.pixkeyByValue.pixkey_type).toBe(pixkey_type2);
    expect(response.body.data.pixkeyByValue.pixkey).toBe(pixkey2);

  });   


    /* Auth & Tokens Tests */


  test('13-query-Auth - authenticate & generate token for the 1th user and verify a valid pixkey', async () => {
    const authQuery = `
      query Auth {
        auth(
          username: "${userName1}", 
          password: "${userPassword1}")
      }
    `;

    const responseAuthQuery = await request(app.callback())
      .post('/graphql')
      .send({ query: authQuery });
    
    expect(responseAuthQuery.status).toBe(200);
    expect(responseAuthQuery.body.data).toHaveProperty('auth');
    
    authToken = responseAuthQuery.body.data.auth.split(' ')[1];

    const pixkeyVerificationQuery = `
      query pixkeyVerification {
        pixkeyVerification(
          pixkey_type: "${pixkey_type1}", 
          pixkey: "${pixkey1}" 
        )
      }
    `;

    const responsePixkeyVerification = await request(app.callback())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: pixkeyVerificationQuery });
    
    expect(responsePixkeyVerification.status).toBe(200);
    expect(responsePixkeyVerification.body.data).toHaveProperty('pixkeyVerification');
    expect(responsePixkeyVerification.body.data.pixkeyVerification).toBe('Type and pixkey validated successfully!');
    
  });   


  test('14-query-UserById - verify if the 1th user has 10 tokens', async () => {
    const userByIdQuery = `
      query UserById {
        userById(id: "${userId1}") {
          id
          username
          tokens
          createdAt          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: userByIdQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.userById.username).toBe(userName1);
    expect(response.body.data.userById.tokens).toBe(10);

  });    


  const cases = Array.from({ length: 10 }, (_, i) => i + 1);
  test.each(cases)("15-query-Auth - authenticate & generate token for the 2th user and verify an invalid pixkey - interaction number %i", async (value) => {
    
    const authQuery = `
    query Auth {
      auth(
        username: "${userName2}", 
        password: "${userPassword2}")
      }
    `;

    const responseAuth = await request(app.callback())
      .post('/graphql')
      .send({ query: authQuery });

    expect(responseAuth.status).toBe(200);
    expect(responseAuth.body.data).toHaveProperty('auth');

    authToken = responseAuth.body.data.auth.split(' ')[1];

    const pixkeyVerificationQuery = `
      query PixkeyVerification {
        pixkeyVerification(
          pixkey_type: "${pixkey_type4}", 
          pixkey: "${pixkey4}" 
        )
      }
    `;

    const responsePixkeyVerification = await request(app.callback())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: pixkeyVerificationQuery });

    expect(responsePixkeyVerification.status).toBe(200);
    expect(responsePixkeyVerification.body.data).toHaveProperty('pixkeyVerification');
    expect(responsePixkeyVerification.body.data.pixkeyVerification).toBe('Pixkey type and value are invalid!');

    await new Promise(resolve => setTimeout(resolve, 1000));

    });


  test('16-query-UserById - verify if the 2th user has 0 tokens', async () => {
    const userByIdQuery = `
      query UserById {
        userById(id: "${userId2}") {
          id
          username
          tokens
          createdAt          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: userByIdQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.userById.username).toBe(userName2);
    expect(response.body.data.userById.tokens).toBe(0);

  });    


  test("17-query-Auth - try to authenticate & generate token for the 2th user with 0 tokens and get an empty bucket message", async () => {
    
    const authQuery = `
    query Auth {
      auth(
        username: "${userName2}", 
        password: "${userPassword2}")
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: authQuery });

    const empty_bucket = 'Your bucket is currently empty. ' +              
      'If you haven\'t used the tokens you generated earlier, please use them now. ' +
      'Otherwise, please wait for the bucket to be refilled before generating more tokens.'
    
      expect(response.status).toBe(200);
      expect(response.body.data.auth).toBe(empty_bucket);

    });  

});
