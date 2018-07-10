'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name !== 'string' || typeof data.active !== 'boolean' || typeof data.courts !== 'object' ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the assetchain wizard.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':active': data.active,
      ':name': data.name,
      ':supply': data.supply,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET active = :active, name = :name, supply = :supply, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the assetchain wizard.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
