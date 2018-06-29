var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var base = require("./webpack.config.base.js");
var address = base.address; //'localhost';//base.address;
var port = base.port;


var config = {
    context: __dirname,


    entry: {
        app: ["./client/client.js"]
    },
    output: {
        path: __dirname,

        filename: 'bundle.js',

        publicPath: 'http://' + address + ':' + port + '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),


        new htmlWebpackPlugin({
            filename: 'index.html', //占位符，无法用chunkhash//[name]-[id]-[hash]-
            template: './index.html', //模版html
            inject: 'body', //放在head还是body
            title: 'Redux Todos Example',

            manifest: {
                removeComments: true, //删除注释
                collapseWhitespace: true //删除空格
            },

        }),

        new webpack.NoEmitOnErrorsPlugin()

    ],

    module: {
        rules: [{
            test: /\.js$/,
            loaders: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        },
        ]
    }
}

module.exports = config;