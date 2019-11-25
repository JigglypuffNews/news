const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    // publicPath: "http://localhost:8080/dist/",
    port: 8080,
    hot: true,
    proxy: [{
        context: ['/'],
        target: 'http://localhost:3000'
    }]
  }, 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
//   output: {
//     path: path.resolve(__dirname, "dist/"),
//     publicPath: "/dist/",
//     filename: "bundle.js"
//   },
  
  plugins: [new webpack.HotModuleReplacementPlugin()]
};