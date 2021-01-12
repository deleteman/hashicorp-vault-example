const options = {
    apiVersion: 'v1', // default
    endpoint: 'http://127.0.0.1:8200', // default
    token: process.env.VAULT_TOKEN //'s.2cqu7AHEi9rOMxM8xFhFabZ7'
};

module.exports = async function getSecrets() {
    // get new instance of the client
    const vault = require("node-vault")(options);

    try {
        const health = await vault.health()
        if (!health.initialized) {
            // init vault server
            const result = await vault.init({
                secret_shares: 1,
                secret_threshold: 1
            })
            var keys = result.keys;
            // set token for all following requests
            vault.token = result.root_token;
            // unseal vault server
            vault.unseal({
                secret_shares: 1,
                key: keys[0]
            })
        }
    } catch (e) {
        console.error(e)
    }

    const secrets = await vault.read("cubbyhole/MongoDBAccess")
    console.log(`Secrets retrieved, mongo_usr: ${secrets.data.mongo_username} - mongo_pwd: ${secrets.data.mongo_pwd}`)

}