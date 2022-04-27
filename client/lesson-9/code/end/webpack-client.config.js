"use strict";

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname);
const DIST_DIR = path.resolve(ROOT_DIR, 'dist/ui');

module.exports = {
    entry: {
        login: path.resolve(ROOT_DIR, './src/client/login/login-form.ts'),
        profile: path.resolve(ROOT_DIR, './src/client/profile/profile-page.ts'),
        home: path.resolve(ROOT_DIR, './src/client/home/home-page.ts'),
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
                        configFile: 'tsconfig.json'
                    }
                }
            }
        ]
    },
    output: {
        path: `${DIST_DIR}/js`,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'web',
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
                    from: path.join(ROOT_DIR, './src/client/home/index.html'),
                    to: path.resolve(DIST_DIR)
                },
                {
                    from: path.join(ROOT_DIR, './src/client/login/login-form.html'),
                    to: path.resolve(DIST_DIR)
                },
                {
                    from: path.join(ROOT_DIR, './src/client/profile/profile.html'),
                    to: path.resolve(DIST_DIR)
                },
            ]
        })
    ]
};
