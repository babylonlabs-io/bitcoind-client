const createJsonRpcClient = require('..');

const dashClient = createJsonRpcClient({
    rpchost: '127.0.0.1',
    rpcuser: 'user',
    rpcpassword: 'password',
    rpcport: '9998',
});

dashClient.request('getwalletinfo').then(res => console.log(res));
