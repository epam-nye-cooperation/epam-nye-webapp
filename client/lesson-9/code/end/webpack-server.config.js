"use strict";

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');

const ROOT_DIR = path.resolve(__dirname);
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DIST_SERVER_DIR = path.resolve(DIST_DIR, 'server');
const PACKAGE = require(path.join(__dirname, 'package.json'));

module.exports = {
    entry: {
        server: path.resolve(ROOT_DIR, './src/server/server.ts')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: 'tsconfig.server.json'
                    }
                }
            }
        ]
    },
    output: {
        path: DIST_SERVER_DIR,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    optimization: {
        minimize: false
    },
    node: {
        __dirname: false
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(ROOT_DIR, './src/app.js'),
                    to: DIST_DIR
                },
                {
                    from: path.join(ROOT_DIR, './src/server/config/users.json'),
                    to: path.resolve(DIST_DIR, 'config')
                }
            ]
        }),
        new CreateFileWebpack({
            path: DIST_DIR,
            fileName: 'package.json',
            content: JSON.stringify({
                name: PACKAGE.name,
                version: PACKAGE.version,
                description: PACKAGE.description,
                scripts: {
                    start: 'node app'
                }
            }, null, 4)
        })
    ]
};
