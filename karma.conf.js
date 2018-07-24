const parts = require("./webpack.parts");

module.exports = config =>{
    const tests = "tests/*.test.js";

    config.set({
        frameworks: ["mocha"],
        files: [
            {
                pattern: tests,
            },
        ],
        preprocessors: {
            [tests]:["webpack"],
        },
        webpack: parts.loadJavaScript(),
        singleRun: true, 
    });
};