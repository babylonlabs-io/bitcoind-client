const initialRequest = {
  method: 'POST',
};

const initialHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const initialBody = {
  params: [],
  jsonrpc: '1.0',
};

/**
 * Create JsonRPC authorization header from RPC credentials.
 *
 * @param {String} rpcuser
 * @param {String} rpcpassword
 * @returns {{Authorization: string}}
 */
const createAuthorizationHeaders = (rpcuser, rpcpassword) => ({
  Authorization: `Basic ${new Buffer(rpcuser + ':' + rpcpassword).toString(
    'base64'
  )}`,
});

/**
 * Ensure params are an array form.
 *
 * @param {Array|*} params
 * @returns {Array}
 */
const toArray = params => (Array.isArray(params) ? params : [params]);

/**
 * Build the JsonRPC endpoint from scheme, host and port.
 *
 * @param {String} rpcscheme
 * @param {String} rpchost
 * @param {String} rpcport
 * @returns {String}
 */
const buildEndpoint = ({
  rpcscheme = 'http',
  rpchost = '127.0.0.1',
  rpcport = 8332,
}) => `${rpcscheme}://${rpchost}:${rpcport}`;

/**
 * Generate a string id for given method and params.
 *
 * @param {String} method
 * @param {Array} params
 * @returns {string}
 */
const generateId = (method, params = []) =>
  `${method}_${params.join('_')}_${s4()}`;

/**
 * Generate a random string of 4 characters, containing letters and numbers.
 *
 * @returns {string}
 */
const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

/**
 * Throw an `Error` if the response is not in `ok` state.
 * Return the `Response` unchanged otherwise.
 *
 * @param {Response} response
 * @returns {Response}
 * @throws Error
 */
const handleError = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

/**
 * Shorthand method, transform the `Response` to a Json object.
 *
 * @param {Response} response
 * @returns {Object}
 */
const toJson = response => response.json();

/**
 * Throw an error if the Json object contains a `JsonRPC` error.
 * Return the Json object unchanged otherwise.
 *
 * @param {Object} jsonResponse
 * @returns {Object}
 * @throws Error
 */
const handleJsonError = jsonResponse => {
  if (response.error) {
    throw new Error(response.error.message);
  }

  return jsonResponse;
};

/**
 * Return the result part of the Json response.
 *
 * @param {Object} jsonResponse
 * @returns {Object}
 */
const toResult = jsonResponse => jsonResponse.result;

/**
 * Create the JsonRPC call function for given endpoint and credentials.
 *
 * @param {String} rpcscheme
 * @param {string} rpchost
 * @param {Number|String} rpcport
 * @param {String} rpcuser
 * @param {String} rpcpassword
 * @returns {function(*=, ...[*]=): Promise<Object>}
 */
const createCall = ({
  rpcscheme = 'http',
  rpchost = '127.0.0.1',
  rpcport = 8332,
  rpcuser,
  rpcpassword,
}) => {
  const endpoint = buildEndpoint({ rpcscheme, rpchost, rpcport });
  const request = {
    ...initialRequest,
    headers: {
      ...initialHeaders,
      ...createAuthorizationHeaders(rpcuser, rpcpassword),
    },
  };

  return (method, ...params) =>
    fetch(endpoint, {
      ...request,
      body: JSON.stringify({
        ...initialBody,
        id: generateId(method, toArray(params)),
        method,
        params: toArray(params),
      }),
    })
      .then(handleError)
      .then(toJson)
      .then(handleJsonError)
      .then(toResult);
};

module.exports = {
  initialRequest,
  initialHeaders,
  initialBody,
  createAuthorizationHeaders,
  toArray,
  buildEndpoint,
  generateId,
  s4,
  handleError,
  toJson,
  handleJsonError,
  toResult,
  createCall,
};
