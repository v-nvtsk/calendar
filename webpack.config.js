const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const PUBLIC_PATH = process.env.CI ? "/otus-jsbasic-final-react" : "/";
console.log("WEBPACK PUBLIC_PATH: ", PUBLIC_PATH);

module.exports = (env) => ({
  mode: env.mode === "development" ? "development" : "production",
  context: path.resolve(__dirname, "src"),
  entry: "./index.tsx",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: PUBLIC_PATH,
        },
      ],
    },
    hot: true,
    open: [PUBLIC_PATH],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.module.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /^(?!.*?\.module).*\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      title: "Calendar",
    }),
  ],
});
