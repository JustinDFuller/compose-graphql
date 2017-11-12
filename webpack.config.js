const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/public/index.html'),
    filename: path.join(__dirname, '/dist/public/index.html'),
    inject: 'body',
    // minify: true,
    // cache: true,
    hash: true,
});

module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, '/src/public/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'public/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: [
                    "stage-0", ["env", {
                        "targets": {
                            "browsers": ["last 2 versions"]
                        }
                    }],
                    "react"
                ]
            }
        }, ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
    ],
};