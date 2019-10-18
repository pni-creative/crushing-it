import AWS from "aws-sdk"

AWS.config.update({
  accessKeyId: process.env.REACT_APP_DYNAMO_KEY,
  secretAccessKey: process.env.REACT_APP_DYNAMO_SECRET,
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

// CHANGE TO "CrushinDev" WHEN DEVELOPING
const table = process.env.REACT_APP_TABLE;

const DB = class  {

  getNominationsById = (items, id) => {
    let tCount = 0;
    
    items.Items.forEach((item) => {
      let count = 0;

      for (let i = 0; i < item.names.length; i++) {
        if (item.names[i].toLowerCase() === id) {
          count++;
        }
      }
      
      tCount += count;
    });
    
    return tCount
  }

  getWinsById = (items, id) => {
    let tCount = 0;

    items.Items.forEach((item) => {
      let count = 0;
      if (item.winner.toLowerCase() === id) {
        count++;
      }
      
      tCount += count;
    });
    
    return tCount
  }

  getLeaderBoard = async () => {
    let params = {
      TableName: table,
    };

    let items;
    let users = [];
    let obj = {};
    let leaderBoard = [];

    do {
      
      items =  await docClient.scan(params).promise();

      items.Items.forEach((i) => { users.push(i.names) })

      //JOIN ARRAYS
      let allUsers = [].concat.apply([], users);

      //SANITIZE USERS TO LOWER CASE
      let allUsersSanitized = allUsers.map(function (val) { return val.toLowerCase(); });

      //COUNT AND GROUP USERS IN ARRAY
      allUsersSanitized.forEach(function(item) {
        if (typeof obj[item] == 'number') {
          obj[item]++;
        } else {
          obj[item] = 1;
        }
      });

      // // Reverse sorting on key
      const keysSorted = Object.keys(obj).sort(function(a, b){return b - a})

      // COMPOSES OBJECT TO RETURN
      for (let i = 0; i < keysSorted.length; i++) {
        const winnerItem = {};
        winnerItem.user= keysSorted[i];
        winnerItem.wins= this.getWinsById(items, keysSorted[i]);
        winnerItem.nominations = this.getNominationsById(items, keysSorted[i]);
        winnerItem.total = (this.getWinsById(items, keysSorted[i]) * 5) + this.getNominationsById(items, keysSorted[i]);
        
        leaderBoard.push(winnerItem);
      }

      // SORT BY NUMBER OF WINS
      leaderBoard.sort(function(a, b) {
        return parseFloat(b.total) - parseFloat(a.total);
      })

      params.ExclusiveStartKey  = items.LastEvaluatedKey;
    
    } while ( typeof items.LastEvaluatedKey != "undefined" );

    return leaderBoard.splice(0, 5)
  }

  getProfile = async (id) => {
    let params = {
        TableName: table,
    };

    let scanResults = {};
    let items;
    do {

      items =  await docClient.scan(params).promise();

      scanResults = {
        wins: this.getWinsById(items, id),
        nominations: this.getNominationsById(items, id)
      }

      params.ExclusiveStartKey  = items.LastEvaluatedKey;
    
    } while ( typeof items.LastEvaluatedKey != "undefined" );

    return scanResults;
  };

  addNomineesToDb = async (nominees, winner) => {
    let date = new Date();
    let dateString = date.toString();
    let params = {
      TableName: table,
      Item:{
        "date": dateString,
        "winner": winner,
        "names": nominees,
      }
    }

    docClient.put(params, (err, data) => {
      if(err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  }

  getJson = async () => {
    let params = {
      TableName: table,
    };

    let scanResults = [];

    do {

      await docClient.scan(params).promise()
        .then(function(data) {
           data.Items.forEach(function(data) {
             scanResults.push(JSON.stringify(data, null, 2));
           });
           params.ExclusiveStartKey = data.LastEvaluatedKey;
         })
         .catch(function(err) {
           console.log(err);
         });

    } while ( typeof params.LastEvaluatedKey != "undefined" );

    scanResults.join(',');

    return `[${scanResults}]`;
  }
}

// Initialize the Class
const db = new DB();

// Export the Class
export default db;



