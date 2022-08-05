const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist/client/js')
    },
    devtool: 'inline-source-map',
    plugins:[
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use:[
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
}