var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.REACT_APP_DYNAMO_KEY,
  secretAccessKey: process.env.REACT_APP_DYNAMO_SECRET,
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

    function ordinal_suffix_of(i) {
      var j = i % 10,
          k = i % 100;
      if (j === 1 && k !== 11) {
          return i + "st";
      }
      if (j === 2 && k !== 12) {
          return i + "nd";
      }
      if (j === 3 && k !== 13) {
          return i + "rd";
      }
      return i + "th";
    }

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        //
        var params = {
          TableName: table,
        };
        docClient.scan(params, onScan);
        function onScan(err, data) {
          var tCount = 0;
          var wins = 0;

          if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          } else {
            console.log("Scan succeeded.");

            data.Items.forEach(function(data) {

              var count = 0;

              for (var i = 0; i < data.names.length; i++) {
                if (data.names[i].toLowerCase() === winner.toLowerCase()) {
                  count++;
                }
              }
              if (data.winner.toLowerCase() === winner.toLowerCase()) {
                wins++;
              }
              tCount += count;					
            });

            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
              console.log("Scanning for more...");
              params.ExclusiveStartKey = data.LastEvaluatedKey;
              docClient.scan(params, onScan);
            } else {
              console.log("count: ", ordinal_suffix_of(tCount));
              console.log("wins: ", ordinal_suffix_of(wins));
              var wEl = document.getElementById("w-count");
              var nEl = document.getElementById("w-nom");
              wEl.innerHTML = ordinal_suffix_of(wins);
              nEl.innerHTML = ordinal_suffix_of(tCount);

            }
          }
        }
        //
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
  },
  profile: function(elementID, profileID) {

    var params = {
        TableName: table,
    };

    console.log("Scanning Crushin table.");
    docClient.scan(params, onScan);

    function onScan(err, data) {
      var tCount = 0;
      var wins = 0;
      var el = document.getElementById(elementID);
      if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Scan succeeded.");

        data.Items.forEach(function(data) {

          var count = 0;

          for (var i = 0; i < data.names.length; i++) {
            if (data.names[i].toLowerCase() === profileID) {
              count++;
            }
          }
          if (data.winner.toLowerCase() === profileID) {
            wins++;
          }
          tCount += count;					
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        } else {
          var nomNode = document.createElement("H3");
          var nomStr = "nominated " + tCount + " times";
          nomNode.innerHTML = nomStr;
          var winNode = document.createElement("H3");
          winNode.innerHTML = wins +  " wins";
          el.appendChild(nomNode);
          el.appendChild(winNode);
        }
      }
    }
  }
}


