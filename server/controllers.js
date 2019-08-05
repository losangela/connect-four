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
    const gameID = req.body.id;
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
        // console.log('data', data);
        const { Items } = data;
        res.send( Items[0]
          // {
          //   success: true,
          //   message: 'Here is a game for u',
          //   game: Items
          // }
        );
      }
    });
  },

  post: (req, res, next) => {
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    // Not actually unique and can create problems.
    const gameID = Math.floor(Math.random() * 100)
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      Item: {
        gameID: gameID,
        scoreR: 0,
        scoreY: 0,
        nameR: "Red",
        nameY: "Yellow",
        turn: "R",
        board: "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]"
      }
    };
    console.log(params)
    docClient.put(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        const { Items } = data;
        res.send(
          // Items
          {
          success: true,
          message: 'Added fruit',
          gameID: gameID
        }
        
        );
      }
    });
  },

  put: (req, res, next) => {
    console.log('editing')
    if (isDev) {
      console.log('isdev')
      AWS.config.update(config.aws_local_config);
    } else {
      console.log('isprod')
      AWS.config.update(config.aws_remote_config);
    }
    const { gameID, scoreR, scoreY, nameR, nameY, turn, board, col1, col2, col3, col4, col5, col6, col7 } = req.body.params;
    const docClient = new AWS.DynamoDB.DocumentClient();
    let UpdateExpression = "set ";
    let ExpressionAttributeValues = {}
    if (scoreR) {
      UpdateExpression += "scoreR = :sr, "
      ExpressionAttributeValues[":sr"] = scoreR
    }
    if (scoreY) {
      UpdateExpression += "scoreY = :sy, "
      ExpressionAttributeValues[":sy"] = scoreY
    }
    if (nameR) {
      UpdateExpression += "nameR = :nr, "
      ExpressionAttributeValues[":nr"] = nameR
    }
    if (nameY) {
      UpdateExpression += "nameY = :ny, "
      ExpressionAttributeValues[":ny"] = nameY
    }
    if (turn) {
      UpdateExpression += "turn = :t, "
      ExpressionAttributeValues[":t"] = turn
    }
    if (col1) {
      UpdateExpression += "col1 = :c1, "
      ExpressionAttributeValues[":c1"] = col1
    }
    if (col2) {
      UpdateExpression += "col2 = :c2, "
      ExpressionAttributeValues[":c2"] = col2
    }
    if (col3) {
      UpdateExpression += "col3 = :c3, "
      ExpressionAttributeValues[":c3"] = col3
    }
    if (col4) {
      UpdateExpression += "col4 = :c4, "
      ExpressionAttributeValues[":c4"] = col4
    }
    if (col5) {
      UpdateExpression += "col5 = :c5, "
      ExpressionAttributeValues[":c5"] = col5
    }
    if (col6) {
      UpdateExpression += "col6 = :c6, "
      ExpressionAttributeValues[":c6"] = col6
    }
    if (col7) {
      UpdateExpression += "col7 = :c7, "
      ExpressionAttributeValues[":c7"] = col7
    }
    UpdateExpression = UpdateExpression.slice(0, -2)
    const params = {
      TableName: config.aws_table_name,
      Key: {
        gameID: 1
      },
      UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues:"ALL_NEW",
    };
    console.log(params)
    docClient.update(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        res.send(
          data.Attributes
        
        );
      }
    });
  }
};