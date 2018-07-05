const htmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const parts = require("./webpack.parts");

const commonConfig = merge([
    {

     
        plugins:[
            new htmlWebpackPlugin({
                title:"Webpack demo",
            })
        ]
    },
    
]);

const PATHS = {
    app: path.join(__dirname, "src"),
};

const productionConfig = merge([

    parts.extractCSS({
        use: ["css-load0er",parts.autoprefix()],
    }),

    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`,{nodir:true}),
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        //customize ports if necessary
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
]);

module.exports = mode => {
    if (mode === "production"){
        return merge(commonConfig,productionConfig, {mode});
    }
    return merge(commonConfig, developmentConfig,{mode});
};


