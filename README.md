# socialNetworkApi

# Installation

To install this on your local environment, git clone the repo. Then run 'npm i' to install the dev dependencies associated with the app. Then copy and paste routes from the thoughtRoutes.js and userRoutes.js into a testing app like Insomnia or Postman. Before running GET routes, it is helpful to run POST routes to create new users and respective thoughts so that GET routes will retrieve some type of data.

# Usage

To start the server and sync the Mongoose models with the MongoDB database, run the following command: npm i

To retrieve user data, make a GET request to http://localhost:3001/api/users.

To retrieve thought data, make a GET request to http://localhost:3001/api/thoughts.

To create a new user, make a POST request to http://localhost:3001/api/users.

To create a new thought, make a POST request to http://localhost:3001/api/thoughts.

To create a reaction to a thought, make a POST request to http://localhost:3001/api/thoughts/{thoughtId}/reactions, where {thoughtId} is the ID of an existing thought.

To delete a user, thought, or reaction, make a DELETE request to the appropriate route. Example: DELETE http://localhost:3001/api/users/{userId} should delete the user with the specified ID.

Adding and Removing Friends To add or remove friends to a user's friend list, make a POST or DELETE request to the http://localhost:3001/api/users/{userId}/friends/{friendId} route.
