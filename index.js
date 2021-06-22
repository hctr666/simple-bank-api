const { Api } = require('./lib/api');

const api = new Api();

api.createServer();

api.runServer(4444, function () {
  console.log('Running API on 4444');
});

const routes = require('./api/routes/routes');

api.createRoutes(routes);
