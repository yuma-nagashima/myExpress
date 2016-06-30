var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './client/entry.jsx',
    output: {
        filename: './server/public/js/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        extensions: [
            '', '.js', '.jsx'
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};