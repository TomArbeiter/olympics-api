/* 
  Tom Arbeiter
  August 2020
  Wrapper functions for MongoDB service.
*/

const MongoClient = require("mongodb").MongoClient;

// Will store connected Mongo Client here for potential reuse in temporally local Lambda invocations
// Takes advantage of the fact that everything outside of the handler functions remains initialized in the Lambda container for ~5 minutes after cold-start invocation
let dbClient = null;

/*
  Function to manage the connection to Mongo DB.
  Will check if a connection still exists from a previous invocation in the same Lambda container, otherwise creates a new one.
  Results in an average latency improvement of 2x for every call in a given Lambda container after the first one (cold-starts are still slow).
*/
const connectDB = async (connectionString) => {
  if (dbClient) return dbClient;
  else {
    try {
      dbClient = new MongoClient(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});      
      return await dbClient.connect();
    }
    catch (error){ 
      console.log("Error creating connection to MongoDB:", error);
    }
  } 
}


/*
  Function to query a collection in MongoDB. 
  Specify the collection to query in the "collection" parameter, the selection conditions in the "filter" parameter, and the fields to return in the "projection" parameter.
  Returns a list containing all documents matching the filter criteria. 
*/
const query = async (collection, filters, projection) => {
  try {
    await connectDB(process.env.MONGO_CONNECTION);
    const results = await dbClient
      .db(process.env.DB_NAME)
      .collection(collection)
      .find(filters)
      .project(projection)
      .toArray();
    return results;
  }
  catch (error) {
    console.log("Error occured while querying MongoDB:", error);
  }
}


/*
  Function to update a document in MongoDB.
  Specify the filters object to find the document to be updated in the "filters" parameter, the update operations in the "updates" parameter,
  and the collection where the document resides in the "collection" parameter.
  The "_id" field on both documents must match in order for the replacement to succeed.
*/
const update = async (filters, updates, collection) => {
  try {
    await connectDB(process.env.MONGO_CONNECTION);
    await dbClient
      .db(process.env.DB_NAME)
      .collection(collection)
      .updateOne(filters, updates)
  }
  catch (error) {
    console.log("Error occured while updating a document in MongoDB:", error);
  }
}

module.exports = {
  query,
  update
}



