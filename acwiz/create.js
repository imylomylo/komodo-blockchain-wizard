'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.name !== 'string' || typeof data.active !== 'boolean' || typeof data.supply !== 'string' ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the assetchain wizard entry.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      ticker: data.ticker,
      supply: data.supply,
      notarisation: data.notarisation,
      email: data.email,
      password: data.password,
      status: data.status,
      active: data.active,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the assetchain wizard entry.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
