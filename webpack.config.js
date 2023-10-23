module.exports = {
    twin: {
        styled: "styled-components",
        config: "./src/tailwind.config.js",
        format: "auto"
    },
    resolve: {
        fallback: {
            util: require.resolve("util/"),
            querystring: require.resolve("querystring-es3"),
            path: require.resolve("path-browserify"),
            os: require.resolve("os-browserify/browser"),
            crypto: require.resolve("crypto-browserify"),
            timers: require.resolve("timers-browserify"),
            http: require.resolve("stream-http"),
            stream: require.resolve("stream-browserify"),
            process: require.resolve("process/browser"),
            https: require.resolve("https-browserify")






        }
    }
};
