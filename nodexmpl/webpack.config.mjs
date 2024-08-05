import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import path from 'path';

export default {
    entry: './src/new.ts',
    mode: 'development',
    output: {
        filename: "main.js",
        path: path.resolve('dist')
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: "./src/index.pug", filename: "index.html" }),
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()]
    },
    devServer: {
        historyApiFallback: true,
        static: "./dist",
        open: true,
        port: 3010
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { esModule: true }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ]
    }
};

/*
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './src/new.ts',
    mode: 'development',
    output: {
        filename: "main.js"
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({template: "./src/index.pug", filename: "index.html"}),
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()]
    },
    devServer: {
        historyApiFallback: true,
        static: "./dist",
        open: true,
        port: 3010
    },
    module: {
        rules: [
            {
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: { esModule: true, }
                }, 'css-loader'],
                test: /\.css$/
            },
            {
				test: /\.pug$/,
				use: 'pug-loader'
			},
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ]
    }

};
 */