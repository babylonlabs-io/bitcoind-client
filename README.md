# bitcoind-client

[![NPM package version][npm-svg]][npm-url]
[![Build Status on Travis][travis-svg]][travis-url]

Bitcoind JsonRPC client for node and the browser.

> This client should be compatible with all `bitcoin` forks, to name a few: Dash, PivX, etc...

## Install
```
npm install --save bitcoind-client
```

## Usage
```
const { createCall } = require('bitcoind-client');
const call = createCall({
    rpchost: '127.0.0.1',
    rpcuser: 'user',
    rpcpassword: 'password',
    rpcport: '9998',
});

call('getwalletinfo')
    .then(result => console.info(result))
    .catch(e => console.error(e))
;
```

> For node you need to require a `fetch` implementation.
> `isomorphic-fetch` is recommended and marked as a peerDependency.
> ```
> npm install --save isomorphic-fetch
> ```

## Development
```
npm test
npm run prettier
```

## Licence
MIT

[npm-svg]: https://img.shields.io/npm/v/bitcoind-client.svg
[npm-url]: https://npmjs.org/package/bitcoind-client
[travis-svg]: https://travis-ci.org/LePetitBloc/bitcoind-client.svg
[travis-url]: https://travis-ci.org/LePetitBloc/bitcoind-client
