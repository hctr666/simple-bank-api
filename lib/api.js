const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');
const bodyParser = require('body-parser');
const { URL } = require('url')

function Api() {
  let server;

  const router = Router({
    mergeParams: true
  });

  router.use(bodyParser.json());

  /**
   * Extending response object properties
   * 
   * @param {http.ServerResponse} response
   */
  function extendServerResponse(response) {
    response.json = function (statusCode, data = {}) {
      response.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(data));
    };

    response.text = function (statusCode, text) {
      response.writeHead(statusCode, {
        'Content-Type': 'text/plain'
      });
      response.end(`${text}`);
    };

    return response;
  }

  /**
   * Server request handler
   * 
   * @param {http.IncomingMessage} request
   * @param {http.ServerResponse} response
   */
  function onRequest(request, response) {
    const { searchParams } = new URL(request.url, 'http://localhost');
    let query = {};

    searchParams.forEach((value, key) => {
      const values = searchParams.getAll(key);
      query[key] = values.length > 1 ? values : value;
    });

    request.query = query;

/*     response.json = function (statusCode, data = {}) {
      response.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(data));
    };

    response.text = function (statusCode, text) {
      response.writeHead(statusCode, {
        'Content-Type': 'text/plain'
      });
      response.end(`${text}`);
    }; */

    extendServerResponse(response);

    router(request, response, finalhandler(request, response));
  }

  /**
   * Create server and attach event listeners
   */
  function createServer() {
    server = http.createServer(onRequest);

    server.once('close', function () {
      console.log('Server has been closed');
    });

    server.on('error', function (error) {
      console.error(error);
    });
  }

  function runServer(port, callback) {
    if (server) {
      server.listen(port, function () {
        if (callback) callback();
      });
    } else {
      throw new Error('Server not created yet');
    }
  }

  function createRoutes(routes = []) {
    const routeMethodMap = {
      GET: 'get',
      POST: 'post'
    };

    routes.forEach(function ({ method, pathname, onRequest }) {
      try {
        if (routeMethodMap[method]) {
          router[routeMethodMap[method]](pathname, onRequest);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  return {
    createServer,
    runServer,
    createRoutes
  };
}

/**
 * Route object builder
 */
const Route = {
  get: function (pathname, onRequest) {
    return { method: 'GET', pathname, onRequest }
  },
  post: function (pathname, onRequest) {
    return { method: 'POST', pathname, onRequest }
  }
};

module.exports = { Api, Route };
