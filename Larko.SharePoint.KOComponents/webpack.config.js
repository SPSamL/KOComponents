var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'Demo.Vendor': [
            'jquery',
            'knockout',
            'knockout.validation',
            'bootstrap',
            'diff-match-patch',
            'lodash',
            'bootstrap-datepicker',
            'knockstrap',
            'knockout-postbox',
            'object.assign',
            'object.entries',
            'es6-promise',
            'core-js',
            'ko-component-router'
        ],
        'Demo': ['./build/Config.js']
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [
            //{ test: /\.css$/, loader: "style!css" },
            //{ test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap') },
            //{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            ko: "knockout"
        }),
        new webpack.optimize.CommonsChunkPlugin("Demo.Vendor", "Demo.Vendor.js", Infinity)
        //new ExtractTextPlugin('bundle.css'),
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]
}