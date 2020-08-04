/*
  Tom Arbeiter
  August 2020
  Utility functions used for formatting data, building the response objects and keeping the handler file clean and easy to read.
*/


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

const createResponseObject = (response) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response)
  };
}


module.exports = {
  createErrorResponseObject,
  createResponseObject
}