const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (isProduction) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        }
      })
    ];
  }

  return config;
};

const plugins = () => {
  const base = [
    new webpack.DefinePlugin({
      USER_INFO_KEY: JSON.stringify(process.env.USER_INFO_KEY)
    }),
    new HtmlWebpackPlugin({
      title: "After Party",
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin()
  ];

  if (isProduction) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  devtool: isDevelopment ? "source-map" : "",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
              reloadAll: true
            }
          },

          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: plugins(),
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: isDevelopment,
    progress: true,
    port: 8080
  }
};
