const PurifyCSSPlugin = require("purifycss-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

exports.devServer  =({host,port} = {}) => ({
    devServer:{
        stats:"errors-only",
 
        host:process.env.HOST,
        port:process.env.PORT,
        open:true,
        overlay:true,
     },
});

exports.loadCSS =({include,exclude} ={}) =>({
  module:{
      rules:[
          {
              test:/\.css$/,
              include,
              exclude,

              use:["style-loader","css-loader"],
          },
      ],
  }, 
});


exports.purifyCSS = ({paths}) =>({
    plugins: [new PurifyCSSPlugin({paths})],
});

exports.autoprefix = () =>({
    loader: "postcss-loader",
    options: {
        plugins: () =>[require("autoprefixer")()],
    },
});

exports.extractCSS = ({ include, exclude, use = []}) =>{
    //Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].[contenthash:4].css",
    });

    return{
        module:{
            rules:[
                {
                    test:/\.css$/,
                    include,
                    exclude,

                    use: [
                        MiniCssExtractPlugin.loader,
                    ].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};


exports.loadImages = ({ include,exclude, options} ={}) => ({
    module:{
        rules:[
            {
                test:/\.(png|jpg)$/,
                include,
                exclude,
                use:{
                    loader:"url-loader",
                    options,
                },
            },
            {
                test: /\.svg$/,
                use:"file-loader",
            }
        ],
    },
});

exports.loadJavaScript = ({include,exclude} ={}) =>({
    module:{
        rules:[
            {
                test:/\.js$/,
                include,
                exclude,
                use:"babel-loader",
            },
        ],
    },
});


exports.generateSourceMaps = ({type}) => ({
    devtool: type,
});

exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])],
});


exports.attachRevision = () =>({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
});

exports.minifyJavascript = () =>({
    optimization:{
        minimizer:[new UglifyWebpackPlugin({sourceMap: true})],
    },
});

exports.minifyCSS = ({options}) => ({
    plugins : [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});


exports.setFreeVariavble = (key, value) =>{
    const env = {};
    env[key] = JSON.stringify(value);

    return{
        plugins: [new webpack.DefinePlugin(env)],
    };
};


