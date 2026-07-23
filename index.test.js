const {
  createAuthorizationHeaders,
  toArray,
  buildEndpoint,
  generateId,
  s4,
  createCall,
} = require('.');

test('createAuthorizationHeaders', () => {
  expect(
    createAuthorizationHeaders({ rpcuser: 'test', rpcpassword: 'test' })
  ).toEqual({ Authorization: 'Basic W29iamVjdCBPYmplY3RdOnVuZGVmaW5lZA==' });
});

test('toArray', () => {
  expect(toArray('test')).toBeInstanceOf(Array);
  expect(toArray(1)).toBeInstanceOf(Array);
  expect(toArray([])).toBeInstanceOf(Array);
});

test('buildEndpoint', () => {
  expect(buildEndpoint({ rpcport: 666 })).toEqual('http://127.0.0.1:666');
  expect(
    buildEndpoint({ rpcscheme: 'https', rpchost: '192.168.0.1', rpcport: 80 })
  ).toEqual('https://192.168.0.1:80');
});

test('buildEndpoint with walletName', () => {
  expect(buildEndpoint({ rpcport: 666, walletName: 'btc-staker' })).toEqual(
    'http://127.0.0.1:666/wallet/btc-staker'
  );
  // Empty string addresses the unnamed default wallet.
  expect(buildEndpoint({ rpcport: 666, walletName: '' })).toEqual(
    'http://127.0.0.1:666/wallet/'
  );
  // Wallet names may contain path-hostile characters — must be encoded.
  expect(buildEndpoint({ rpcport: 666, walletName: 'a/b c' })).toEqual(
    'http://127.0.0.1:666/wallet/a%2Fb%20c'
  );
  expect(buildEndpoint({ rpcport: 666, walletName: null })).toEqual(
    'http://127.0.0.1:666'
  );
});

test('generateId', () => {
  expect(generateId('getwalletinfo')).toEqual(
    expect.stringContaining('getwalletinfo')
  );
  expect(generateId('getwalletinfo')).not.toEqual(generateId('getwalletinfo'));
  expect(generateId('listreceivedbyaddress', [0, true])).toEqual(
    expect.stringContaining('listreceivedbyaddress_0_true')
  );
});

test('s4', () => {
  expect(typeof s4()).toBe('string');
  expect(s4()).toHaveLength(4);
  expect(s4()).not.toEqual(s4());
});

test('createCall', () => {
  const call = createCall({
    rpcuser: 'test',
    rpcpassword: 'test',
  });

  expect(call).toBeInstanceOf(Function);
});
