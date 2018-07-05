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
