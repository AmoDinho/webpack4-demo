const PurifyCSSPlugin = require("purifycss-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        filename: "[name].css",
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