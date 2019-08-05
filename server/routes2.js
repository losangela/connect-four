const AWS = require('aws-sdk');
const config = require('../db/config.js');
const isDev = process.env.NODE_ENV !== 'production';


module.exports = {

  get: (req, res, next) => {
      console.log('getting')
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    const gameID = req.query.id;
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      KeyConditionExpression: 'gameID = :i',
      ExpressionAttributeValues: {
        ':i': gameID
      }
    };
    docClient.query(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        const { Items } = data;
        res.send({
          success: true,
          message: 'Here is a game for u',
          game: Items
        });
      }
    });
  }

};