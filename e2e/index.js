const { createCall } = require('../');
require('isomorphic-fetch');

const call = createCall({
  rpchost: '127.0.0.1',
  rpcuser: 'test',
  rpcpassword: 'test',
  rpcport: '18443',
});

call('methodthatdoesntexist')
  .then(result => console.info(result))
  .catch(e => console.error(e));

call('getwalletinfo', 'help')
  .then(result => console.info(result))
  .catch(e => console.error(e));

call('getwalletinfo')
  .then(result => console.info(result))
  .catch(e => console.error(e));

const call2 = createCall({
  rpchost: '127.0.0.1',
  rpcuser: 'test',
  rpcpassword: 'test2',
  rpcport: '18443',
});

call2('help', 'getwalletinfo')
  .then(result => console.info(result))
  .catch(e => console.error(e));

const call3 = createCall({
    rpchost: '127.0.0.2',
    rpcuser: 'test',
    rpcpassword: 'test2',
    rpcport: '18443',
});

call3('getwalletinfo')
    .then(result => console.info('call3', result))
    .catch(e => console.error('call3', e));