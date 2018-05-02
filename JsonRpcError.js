class JsonRpcError extends Error {
  constructor(message, { code = -1, method, params, endpoint, rpcuser }) {
    super(message);

    this.code = code;
    this.method = method;
    this.params = params;
    this.endpoint = endpoint;
    this.rpcuser = rpcuser;

    Error.captureStackTrace(this, JsonRpcError);
  }

  set code(value) {
    Object.defineProperty(this, 'code', {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    });
  }

  set method(value) {
    Object.defineProperty(this, 'method', {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    });
  }

  set params(value) {
    Object.defineProperty(this, 'params', {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    });
  }

  set endpoint(value) {
    Object.defineProperty(this, 'endpoint', {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    });
  }

  set rpcuser(value) {
    Object.defineProperty(this, 'rpcuser', {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    });
  }
}

module.exports = JsonRpcError;
