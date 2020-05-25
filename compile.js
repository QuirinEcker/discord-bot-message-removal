const TscWatchClient = require('tsc-watch/client');
const watch = new TscWatchClient();
watch.on('success', () =>  {
    Object.keys(require.cache).forEach(function(key) {
        delete require.cache[key];
    });

    console.log("compile");
    require('./dist/index');
});
watch.start();