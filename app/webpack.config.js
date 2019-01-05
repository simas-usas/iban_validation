const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production';

const defaults = {
    entry: [
        path.resolve(__dirname, './src/app/index.js'),
    ],
    output: {
        filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        port: 3000,
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/app/components'),
            containers: path.resolve(__dirname, 'src/app/containers'),
            static: path.resolve(__dirname, 'src/app/static'),
            util: path.resolve(__dirname, 'src/app/util'),
            resources: path.resolve(__dirname, 'src/app/resources'),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                /**
                                 * Reference: https://github.com/postcss/autoprefixer
                                 * Parse CSS and add vendor prefixes.
                                 * Supported browsers list defined in package.json browserslist key
                                 */
                                autoprefixer,
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './src/template.html',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
};

module.exports = defaults;
