# Olympic Track & Field REST API

## Overview
This project was born out of both my love for running and my interest in serverless computing platforms like AWS Lambda. This API sits on top of a small MongoDB instance that stores some basic historical information about Olympic Track & Field events and athletes. Because this is a project more for expanding my knowledge about API development and the AWS platform, and beacuse I don't want a big AWS bill every month, there are very limited request quotas and usage limits. If you would like to try the API out, feel free to send me an email (arbeitertom@gmail.com) to request a temporary API key and get more details.

## Documentation
To view the Swagger Docs for this API, please visit: https://api.tomarbeiter.com/docs. Here you will find detailed information about each API method including parameters and response objects. The base URL for the API methods is: https://api.tomarbeiter.com.

## Architecture
This API makes use of Swagger for documentation, AWS API Gateway for handling requests, AWS Lambda to execute the handler functions, AWS Route 53 to manage custom domains and routing, Serverless Framework for easy deployment, and MongoDB for lightweight, easy-to-use (and free!) storage. 

## Performance
Minimizing response time and latency is obviously very important for APIs. AWS Lambda presents some unique challenges when it comes to optimizing performance because it is not "always-on" like a webserver. This introduces overhead that must be dealt with to maintain usable latencies. 

Although you only pay for the time the function spends executing, Lambda functions remain "warm" for some time after they are invoked (~5-10min). When a function is warm, the container the function executes in remains active and the code outside of the handler method remains initialized. This means that we can actually keep the database connection open between requests that are temporally local to one another and on the same API method. To prevent the Lambda from timing out because the database connection is not closed after a request is fulfilled, we can set: ```context.callbackWaitsForEmptyEventLoop = false;``` within the handler function for each method. This tells Lambda to close the invocation even if there are events to process after a value is returned (i.e., an open database connection). Using this method of keeping the database connection alive between requests when Lambdas are "warm" results in about a 2x performance boost. This means that all of the API methods, when running on a "warm" Lambda, have a <100ms response latency. Not bad!

However, since Lambda is not an "always-on" service, the API can suffer large performance hits when "cold-starts" occur; that is, when the Lambda function is invoked for the first time in a long time (~5-10min) and AWS has to spin up a container for it to run in before servicing the request. Cold-starts in this API fall in the range of 700-900ms. Not horrible, but also not great. Cold-starts can be prevented through a technique called "warming" whereby a "dummy" request is sent to each Lambda function every 5 minutes or so to keep them warm. The idea is that you could prevent the containers from ever being destroyed, thus eliminating the potential for cold-starts. I have opted not to implement this warming technique in the API simply because the API isn't actually going to be used for anything and I don't want to risk exceeding AWS free tier limits for my Lambdas. In a real production enivornment where latency is strictly monitored and controlled, the added expense of warming might be justified.

## Feedback
If you have any questions, comments, feedback, or if you find any bugs or experience any unexpected errors, please send me an email! This is my first pass at designing and developing an API from start to finish so I'm always open to feedback!
