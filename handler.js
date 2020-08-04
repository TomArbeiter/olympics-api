const { query, update } = require("./services/mongo");
const { createErrorResponseObject, createResponseObject } = require("./services/util");


/*
  Function to handle GET requests made with the /events path.
*/
const events = async (event) => {
  // Query for data
  const response = await query(process.env.EVENT_COLLECTION, event.queryStringParameters, { _id: 0 });
  return createResponseObject(response);
}


/*
  Function to handle GET requests made with the /events/{eventId} path.
*/
const eventsById = async (event) => {
  // Get basic info about the event
  const eventInfo = await query(process.env.EVENT_COLLECTION, event.pathParameters, { _id: 0 });
  // Get list of athletes in the event and store it as an object to be combined with the first query
  const athletes = {
    athletes: await query(process.env.RESULTS_COLLECTION, event.pathParameters, { _id: 0, eventId: 0, eventName: 0, year: 0, city: 0 })
  };
  return createResponseObject(Object.assign(eventInfo[0], athletes));
}


/*
  Function to handle PUT requests made with the /events/{eventId} path.
  No data is actually passed to this handler; rather, the PUT call implies incrementing the likes counter on the specified event.
*/
const likeEvent = async (event) => {
  // Increment Likes counter for specified event
  await update(event.pathParameters, { $inc: { likes: 1 } }, process.env.EVENT_COLLECTION);
  return createResponseObject({message: "'Like' counter for event " + event.pathParameters.eventId + " incremented successfully."});
}


/*
  Function to handle GET requests made with the /athletes path.
*/
const athletes = async (event) => {
  // Query for data
  const response = await query(process.env.ATHLETE_COLLECTION, event.queryStringParameters, { _id: 0 });
  return createResponseObject(response);
}


/*
  Function to handle GET requests made with the /athletes/{athleteId} path.
*/
const athletesById = async (event) => {
  // Get basic info about the athlete
  const athleteInfo = await query(process.env.ATHLETE_COLLECTION, event.pathParameters, { _id: 0 });
  // Get list of events that the athlete competed in and store it as an object to be combined with the first query
  const events = {
    events: await query(process.env.RESULTS_COLLECTION, event.pathParameters, { _id: 0, athleteId: 0, athleteName: 0, sex: 0 })
  };
  return createResponseObject(Object.assign(athleteInfo[0], events));
}


/*
  Function to handle PUT requests made with the /athletes/{athleteId} path.
  No data is actually passed to this handler; rather, the PUT call implies incrementing the likes counter on the specified athlete.
*/
const likeAthlete = async (event) => {
  // Increment Likes counter for specified athlete
  await update(event.pathParameters, { $inc: { likes: 1 } }, process.env.ATHLETE_COLLECTION);
  return createResponseObject({message: "'Like' counter for athlete " + event.pathParameters.athleteId + " incremented successfully."});
}


module.exports = {
  events,
  eventsById,
  likeEvent,
  athletes,
  athletesById,
  likeAthlete
}