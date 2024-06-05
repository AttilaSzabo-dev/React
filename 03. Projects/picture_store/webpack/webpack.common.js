const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "..", "./src/index.html"),
  }),
];

if (isDevelopment) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      assets: path.resolve("./src/assets"),
      components: path.resolve("./src/components"),
      interfaces: path.resolve("./src/interfaces"),
      pages: path.resolve("./src/pages"),
      store: path.resolve("./src/store"),
      utils: path.resolve("./src/utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  plugins: plugins,
  stats: "errors-only",
};
