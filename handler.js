/* 
  Tom Arbeiter
  August 2020
  Main handler file to interface with API requests coming from API Gateway. Each request path has its own handler function to execute the corresponding API method. 
*/

const { query, update } = require("./services/mongo");
const { createResponseObject, validatePathParameters, validateQueryParameters } = require("./services/util");

// Function to handle GET requests made with the /events path
const events = async (event) => {
  const isNotValid = validateQueryParameters(event.queryStringParameters, event.path);
  if (isNotValid) return isNotValid;

  else {
    // Convert year parameter to number type if it exists
    if (event.queryStringParameters != undefined && event.queryStringParameters != null && event.queryStringParameters.hasOwnProperty("year")){
      event.queryStringParameters.year = Number(event.queryStringParameters.year);
    }

    // Query for data
    const response = await query(process.env.EVENT_COLLECTION, event.queryStringParameters, { _id: 0 });
    return createResponseObject(response);
  }
}


// Function to handle GET requests made with the /events/{eventId} path
const eventsById = async (event) => {
  // Validate path parameter - if not valid, return an error response object, else query for and return requested data
  const isNotValid = validatePathParameters(event.pathParameters);
  if (isNotValid) return isNotValid;

  else {
    // Need to convert the ID from a string to a number (gets stringified when passed as path parameter) to match data types in database
    const convertedParam = { eventId: Number(event.pathParameters.eventId) };

    // Get basic info about the event
    const eventInfo = await query(process.env.EVENT_COLLECTION, convertedParam, { _id: 0 });
    // Get list of athletes in the event and store it as an object to be combined with the first query
    const athletes = {
      athletes: await query(process.env.RESULTS_COLLECTION, convertedParam, { _id: 0, eventId: 0, eventName: 0, year: 0, city: 0 })
    };
    return createResponseObject(Object.assign(eventInfo[0], athletes));
    }
  }


// Function to handle PUT requests made with the /events/{eventId} path
// No data is actually passed to this handler; rather, the PUT call implies incrementing the likes counter on the specified event
const likeEvent = async (event) => {
  // Validate path parameter - if not valid, return an error response object, else query for and return requested data
  const isNotValid = validatePathParameters(event.pathParameters);
  if (isNotValid) return isNotValid;

  else {
    // Need to convert the ID from a string to a number (gets stringified when passed as path parameter) to match data types in database
    const convertedParam = { eventId: Number(event.pathParameters.eventId) };
    
    // Increment Likes counter for specified event
    await update(convertedParam, { $inc: { likes: 1 } }, process.env.EVENT_COLLECTION);
    return createResponseObject({message: "'Like' counter for event " + convertedParam.eventId + " incremented successfully."});
  }
}


 // Function to handle GET requests made with the /athletes path.
const athletes = async (event) => {
  const isNotValid = validateQueryParameters(event.queryStringParameters, event.path);
  if (isNotValid) return isNotValid;

  else {
    // Convert year parameter to number type if it exists
    if (event.queryStringParameters != undefined && event.queryStringParameters != null && event.queryStringParameters.hasOwnProperty("year")){
      event.queryStringParameters.year = Number(event.queryStringParameters.year);
    }

    // Query for data
    const response = await query(process.env.ATHLETE_COLLECTION, event.queryStringParameters, { _id: 0 });
    return createResponseObject(response);
  }
}


// Function to handle GET requests made with the /athletes/{athleteId} path
const athletesById = async (event) => {
  // Validate path parameter - if not valid, return an error response object, else query for and return requested data
  const isNotValid = validatePathParameters(event.pathParameters);
  if (isNotValid) return isNotValid;

  else {
    // Need to convert the ID from a string to a number (gets stringified when passed as path parameter) to match data types in database
    const convertedParam = { athleteId: Number(event.pathParameters.athleteId) };

    // Get basic info about the athlete
    const athleteInfo = await query(process.env.ATHLETE_COLLECTION, convertedParam, { _id: 0 });
    // Get list of events that the athlete competed in and store it as an object to be combined with the first query
    const events = {
      events: await query(process.env.RESULTS_COLLECTION, convertedParam, { _id: 0, athleteId: 0, athleteName: 0, sex: 0 })
    };
    return createResponseObject(Object.assign(athleteInfo[0], events));
  }
}


// Function to handle PUT requests made with the /athletes/{athleteId} path
// No data is actually passed to this handler; rather, the PUT call implies incrementing the likes counter on the specified athlete
const likeAthlete = async (event) => {
  // Validate path parameter - if not valid, return an error response object, else query for and return requested data
  const isNotValid = validatePathParameters(event.pathParameters);
  if (isNotValid) return isNotValid;

  else {
    // Need to convert the ID from a string to a number (gets stringified when passed as path parameter) to match data types in database
    const convertedParam = { athleteId: Number(event.pathParameters.athleteId) };

    // Increment Likes counter for specified athlete
    await update(convertedParam, { $inc: { likes: 1 } }, process.env.ATHLETE_COLLECTION);
    return createResponseObject({message: "'Like' counter for athlete " + convertedParam.athleteId + " incremented successfully."});
  }
}


module.exports = {
  events,
  eventsById,
  likeEvent,
  athletes,
  athletesById,
  likeAthlete
}