const htmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const parts = require("./webpack.parts");


const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname,"dist"),
};

const commonConfig = merge([
    {

     
        plugins:[
            new htmlWebpackPlugin({
                title:"Webpack demo",
            })
        ]
    },

    parts.loadJavaScript({include: PATHS.app}),
    parts.setFreeVariavble("HELLO","Wad up from config!")
    
]);


const productionConfig = merge([

    parts.extractCSS({
        use: ["css-loader",parts.autoprefix()],
    }),

    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`,{nodir:true}),
    }),
    {
          output:{
              chunkFilename: "[name].[chunkhash:4].js",
              filename: "[name].[chunkhash:4].js",
          },
    },
      
    parts.loadImages({
        options:{
            limit: 15000,
            name:"[name].[hash:4].[ext]",
        },
    }),
    {
        optimization:{
            splitChunks:{
                cacheGroups:{
                    commons:{
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial",
                    }
                }
                
            },
            runtimeChunk:{
                name: "manifest",
            },
        },
    },
    parts.generateSourceMaps({type: "source-map"}),
    parts.clean(PATHS.build),
    parts.minifyJavascript(),
    
    parts.minifyCSS({
        options: {
            discardComments:{
                removeAll:true,
            },
            //runn cssnano in safe mode to aviod unsafe transformaion
            safe:true,
            parser: require("postcss-safe-parser"),
        },
    }),
    parts.attachRevision(),
    {
        recordsPath: path.join(__dirname,"records.json"),
    },
]);

const developmentConfig = merge([
    parts.devServer({
        //customize ports if necessary
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
]);

module.exports = mode => {
    if (mode === "production"){
        return merge(commonConfig,productionConfig, {mode});
    }
    return merge(commonConfig, developmentConfig,{mode});
};


