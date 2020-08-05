/*
  Tom Arbeiter
  August 2020
  Utility functions used mainly for error handling and data validation to keep handler file as readable as possible.
*/

const {validTeams, validYears} = require("./constants");

// Function to create an error response object with the specified code and message
const createErrorResponseObject = (code, message) => {
  return {
    statusCode: code,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      errorCode: code,
      errorMessage: message
    })
  }
}


// Function to create standard 200 response with passed response body
const createResponseObject = (response) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response)
  };
}


// Function used to handle validating path parameters for the 4 methods that require them
// Returns either an error response object if any error is found or "false" if the parameters are valid ("false" may be misleading to some people, but it helps keep the logic in handler.js clean)
const validatePathParameters = (pathParameters) => {
  // Validate that pathParamters object has exactly 1 property
  if (pathParameters == undefined || pathParameters == null){
    return createErrorResponseObject(400, "Path parameter is required.");
  }
  if (Object.keys(pathParameters).length > 1){
    return createErrorResponseObject(400, "Too many path parameters. Expected number of path parameters: 1.")
  }

  // Validate path parameter value based on the requesting method
  // Need to convert the ID from a string to a number (gets stringified when passed as path parameter) to match data types in database
  switch (Object.keys(pathParameters)[0]){
    case 'eventId':
      const convertedEventID = Number(pathParameters.eventId);
      if (Number.isNaN(convertedEventID) || convertedEventID < 10000 || convertedEventID > 10997){
        return createErrorResponseObject(400, "Invalid eventId: " + convertedEventID);
      }
      else break;

    case 'athleteId':
      const convertedAthleteId = Number(pathParameters.athleteId);
      if (Number.isNaN(convertedAthleteId) || convertedAthleteId < 20000 || convertedAthleteId > 42074){
        return createErrorResponseObject(400, "Invalid athleteId: " + convertedAthleteId);
      }
      else break;
    
    default:
      return createErrorResponseObject(400, "Unexpected bad request error. Please try again.");
  }
  return false;
}


// Function used to handle validating query string parameters for the 2 methods that require them
// Takes in the "path" of the request because the "team" parameter cannot be used for the "/events" path - instead of duplicating this whole function for that little quirk, I've opted to just hard check it in here
// Returns either an error response object if any error is found or "false" if the parameters are valid ("false" may be misleading to some people, but it helps keep the logic in handler.js clean)
const validateQueryParameters = (queryParameters, path) => {
  // Check if any query string paramters are present (though they are highly recommended to filter the results, they aren't technically required)
  // If there are none, the request is valid but the results will be truncated after 150 records are returned
  if (queryParameters == undefined || queryParameters == null){
    return false;
  }

  // Loop over all of the parameters in the query string object, checking first that the parameter name is valid, then checking that the value is valid
  for (let [param, value] of Object.entries(queryParameters)) {
    if (param != "year" && param != "team" && param != "sex"){
      return createErrorResponseObject(400, "Invalid query parameter: " + key + ". Please reference the Swagger docs for the appropriate parameter names.");
    }

    switch (param){
      case "year":
        if (!validYears.includes(Number(value))){
          return createErrorResponseObject(400, "Invalid 'year' value.")
        }
        else break;

      case "team": 
        if (path == "/events"){
          return createErrorResponseObject(400, "'team' is not a valid query parameter for this method.");
        }
        else if (!validTeams.includes(value)){
          return createErrorResponseObject(400, value + " is not a valid team.");
        }
        else break;
      
      case "sex":
        if (value != "M" && value != "F"){
          return createErrorResponseObject(400, value + " is not a valid sex (M/F).");
        }
        else break;
      
      default:
        return createErrorResponseObject(400, "Unexpected bad request error. Please try again.");
    }
  }
  return false;
}


module.exports = {
  createErrorResponseObject,
  createResponseObject,
  validatePathParameters,
  validateQueryParameters
}