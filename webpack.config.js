const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './app/src/llp/game.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                use: 'ts-loader',
                // include: [path.resolve(__dirname, "app")]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },

        ],


    },
    devServer: {
        contentBase: './dist',
        proxy: {
            "/API": {
                target: "https://m.tianyi9.com",
                secure: false,
                changeOrigin: true
            },
            "/upload":{
                target: 'https://m.tianyi9.com',
                secure: false,
                changeOrigin: true
            },
            "/llplayer":{
                target: 'https://m.tianyi9.com',
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {from: 'app/index.html'},
            {from: 'app/assets', to: 'assets'}
        ])
    ]
    ,
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};