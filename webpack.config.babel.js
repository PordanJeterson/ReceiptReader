import path from "path";
import webpack from "webpack";
import {CheckerPlugin} from "awesome-typescript-loader";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (environment) => {

    const env = environment.NODE_ENV;

    const toMinimize = env === 'production';

    return {
        devtool: 'source-map',
        mode: env,
        entry: [
            path.join(__dirname, 'src/public/js/app.tsx'),
        ],
        output: {
            path: path.join(__dirname, '/dist/public'),
            filename: 'js/app.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
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
            new CleanWebpackPlugin([
                path.join(__dirname, 'dist/public')
            ]),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            }),
            new CheckerPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new CopyWebpackPlugin([
                {from: path.join(__dirname, 'src', 'public', 'static')}
            ])
        ],
        resolve: {
            modules: [
                'node_modules',
                'src/public/js'
            ],
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        optimization: {
            minimize: toMinimize
        }
    }
}