const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            title: "webpack demo",
        }),
    ],
};