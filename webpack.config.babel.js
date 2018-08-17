// using ES6 here, babel compiles it was runtime for webpack which lets
// the code look similar to the rest of the project

import path from "path";
import webpack from "webpack";
import {CheckerPlugin} from "awesome-typescript-loader";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// making this a function allows us to access environment variables
// see https://webpack.js.org/guides/environment-variables/
// todo change tesseract to follow NODE_ENV when prod or it won't work
export default (environment) => {

    let env = 'development';
    if (environment) {
        env = environment.NODE_ENV;
    }

    const toMinimize = env.toString() === 'production';

    return {
        devtool: 'source-map',
        mode: env,
        entry: [
            path.join(__dirname, 'src/public/js/app.tsx'),
        ],
        output: {
            path: path.join(__dirname, '/dist/public'),
            filename: 'js/app.js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$|\.ts?$/,
                    loaders: ['awesome-typescript-loader'],
                    include: path.join(__dirname, 'src/public/js'),
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                server: {baseDir: ['dist/public']}
            }),
            new CleanWebpackPlugin([
                path.join(__dirname, 'dist/public')
            ]),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            }),
            new CheckerPlugin(),
            new CopyWebpackPlugin([
                {from: path.join(__dirname, 'src', 'public', 'static')}
            ]),
            new HtmlWebpackPlugin({
                template: "src/public/static/index.html",
                filename: "index.html"
            })
        ],
        resolve: {
            modules: [
                'node_modules',
                'src/public/js'
            ],
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        optimization: {
            minimize: toMinimize
        }
    }
}