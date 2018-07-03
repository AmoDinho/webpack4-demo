const htmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const parts = require("./webpack.parts");

const commonConfig = merge([
    {
        plugins:[
            new htmlWebpackPlugin({
                title:"Webpack demo",
            })
        ]
    },
    parts.loadCSS(),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    parts.devServer({
        //customize ports if necessary
        host: process.env.HOST,
        port: process.env.PORT,
    }),
]);

module.exports = mode => {
    if (mode === "production"){
        return merge(commonConfig,productionConfig, {mode});
    }
    return merge(commonConfig, developmentConfig,{mode});
};


