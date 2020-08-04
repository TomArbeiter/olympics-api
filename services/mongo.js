/* 
  Tom Arbeiter
  August 2020
  Wrapper functions for MongoDB service.
*/

const MongoClient = require("mongodb").MongoClient;
const connectionURL = process.env.MONGO_CONNECTION;
const databaseName = process.env.DB_NAME;


/*
  Function to query a collection in MongoDB. 
  Specify the collection to query in the "collection" parameter, the selection conditions in the "filter" parameter, and the fields to return in the "projection" parameter.
  Returns a list containing all documents matching the filter criteria. 
*/
const query = async (collection, filters, projection) => {
  const client = new MongoClient(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    const results = await client
      .db(databaseName)
      .collection(collection)
      .find(filters)
      .project(projection)
      .toArray();

    client.close();
    return results;
  }
  catch (error) {
    client.close();
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
  const client = new MongoClient(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    await client
      .db(databaseName)
      .collection(collection)
      .updateOne(filters, updates)
    client.close();
  }
  catch (error) {
    client.close();
    console.log("Error occured while updating a document in MongoDB:", error);
  }
}

module.exports = {
  query,
  update
}



