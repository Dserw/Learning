import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';

export default {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: "main.js",
        path: path.resolve('dist')
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: "./src/index.pug", filename: "index.html" }),
        new CssMinimizerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()]
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
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    }
};