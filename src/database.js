var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIASTVPISGV5DOV477Q",
  secretAccessKey: "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",
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Crushin";

module.exports = {
  
  add: function(nominees, winner) {

    var date = new Date();

    var dateString = date.toString()

    var params = {
      TableName: table,
      Item:{
        "date": dateString,
        "winner": winner,
        "names": nominees	
      }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  },
  
  read: function(elementID) {

    var params = {
        TableName: table,
    };

    console.log("Scanning Crushin table.");
    docClient.scan(params, onScan);

    function onScan(err, data) {
      if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Scan succeeded.");

        data.Items.forEach(function(data) {
          var el = document.getElementById(elementID);					
          el.innerHTML += JSON.stringify(data, null, 2) + '\n';
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        } 
        }
    }
  }
}


