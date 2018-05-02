const { createCall } = require('../');
require('isomorphic-fetch');

const call = createCall({
  rpchost: '127.0.0.1',
  rpcuser: 'test',
  rpcpassword: 'test',
  rpcport: '18332',
});

test('method not found error shape', () => {
  expect.assertions(1);

  return expect(
    call('methodthatdoesntexist').catch(e => e)
  ).resolves.toMatchObject({
    code: 404,
    method: 'methodthatdoesntexist',
    params: [],
    endpoint: 'http://127.0.0.1:18332',
    rpcuser: 'test',
  });
});

test('getwalletinfo', () => {
  expect.assertions(1);

  return expect(call('getwalletinfo').then(result => result)).resolves.toEqual(
    expect.objectContaining({
      balance: expect.any(Number),
      hdmasterkeyid: expect.any(String),
      immature_balance: expect.any(Number),
      keypoololdest: expect.any(Number),
      keypoolsize: expect.any(Number),
      keypoolsize_hd_internal: expect.any(Number),
      paytxfee: expect.any(Number),
      txcount: expect.any(Number),
      unconfirmed_balance: expect.any(Number),
      walletname: expect.any(String),
      walletversion: expect.any(Number),
    })
  );
});
