# bitcoind-client
Bitcoind JsonRPC client for node and the browser.

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

## Developement
```
npm test
npm run prettier
```

## Licence
MIT