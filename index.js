const { JsonRpcClient } = require('json-rpc-client-fetch');
require('isomorphic-fetch');

module.exports = ({
    rpcscheme = 'http',
    rpchost = '127.0.0.1',
    rpcport = 9998,
    rpcuser,
    rpcpassword,
    debug = false,
}) => new JsonRpcClient({
    endpoint: `${rpcscheme}://${rpchost}:${rpcport}`,
    debug,
    headers: {
      'Authorization': `Basic ${new Buffer(rpcuser+':'+rpcpassword).toString('base64')}`,
    }
});
