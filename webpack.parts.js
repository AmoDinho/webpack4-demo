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
              test:/\.scss$/,
              include,
              exclude,

              use:["style-loader","css-loader","sass-loader"],
          },
      ],
  },
});