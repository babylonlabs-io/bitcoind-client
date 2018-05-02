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
