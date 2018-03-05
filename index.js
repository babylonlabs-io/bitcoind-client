const { JsonRpcClient } = require('json-rpc-client-fetch');
require('isomorphic-fetch');

module.exports = ({
    rpcscheme = 'http',
    rpchost = '127.0.0.1',
    rpcport = 8332,
    rpcuser,
    rpcpassword
}) => new JsonRpcClient({
    endpoint: `${rpcscheme}://${rpchost}:${rpcport}`,
    headers: {
      'Authorization': `Basic ${new Buffer(rpcuser+':'+rpcpassword).toString('base64')}`,
    }
});
