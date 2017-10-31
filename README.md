# compose-app
Example of creating an entire app through function composition

## POC for viewing an app as a single linear flow.

This is intended to be a shell of an app that passes the results of each function to the next, in the end creating the entire app.

The flow is something like this.

1. Get configuration (env variables).
2. Get dependencies.
3. Create logger.
4. Create routes.
5. Initialize the app.

Each step has the results of the last that can be used (but not modified).
