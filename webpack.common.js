const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|txt)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/Nunito/[base]',
                },
            },
            {
                test: /favicon\.ico$/,
                type: 'asset/resource',
                generator: {
                    filename: '[base]',
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
};
