try{
  var mysql_import = require('../node_modules/mysql');
}catch(err){
  console.log("Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`.");
}

//- Connection configuration
var db_config = {
  host         : process.env.HOST,
  user         : process.env.DB_USER,
  password     : process.env.PASSWORD,
  database     : process.env.DATABASE,
};

//- Create the connection variable
var connection = mysql_import.createPool(db_config);

//- Establish a new connection
// connection.connect(function(err){
//   if(err) {
//       // mysqlErrorHandling(connection, err);
//       console.log("\n\t *** Cannot establish a connection with the database. ***");

//       connection = reconnect(connection);
//   }else {
//       console.log("\n\t *** New connection established with the database. ***")
//   }
// });

//- Reconnection function
async function reconnect(connection){
  console.log("\n New connection tentative...");

  //- Destroy the current connection variable
  if(connection) connection.destroy();

  //- Create a new one
  var connection = await mysql_import.createConnection(db_config);

  //- Try to reconnect
  connection.connect(function(err){
      if(err) {
        console.log("Error", err);
          //- Try to connect every 2 seconds.
          setTimeout(reconnect, 2000);
      }else {
          console.log("\n\t *** New connection established with the database. ***")
          return connection;
      }
  });
}

//- Error listener
connection.on('error', function(err) {

  //- The server close the connection.
  if(err.code === "PROTOCOL_CONNECTION_LOST"){    
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      connection = reconnect(connection);
  }

  //- Connection in closing
  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      connection = reconnect(connection);
  }

  //- Fatal error : connection variable must be recreated
  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      connection = reconnect(connection);
  }

  //- Error because a connection is already being established
  else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
  }

  //- Anything else
  else{
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      connection = reconnect(connection);
  }

});

var db = connection;

module.exports = db;
