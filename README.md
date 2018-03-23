# bitcoind-client

Bitcoind JsonRPC client.

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

## Developement
```
npm test
npm run prettier
```

## Licence

MIT