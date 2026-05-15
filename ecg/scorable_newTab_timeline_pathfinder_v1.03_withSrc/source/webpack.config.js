const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/js/app.js",
  output: {
    filename: "js/app.js",
    path: path.resolve(__dirname, ".."),
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|svg|mp4)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[hash].[ext][query]",
        },
      },
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "css/fonts/[name].[hash].[ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/data", to: "data" },
        { from: "./src/pages", to: "pages" },
        { from: "./src/img", to: "img" },
        { from: "./src/manifest.webmanifest", to: "manifest.webmanifest" },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: /\.(?:html|json)$/,
          handler: "StaleWhileRevalidate",
          options: { cacheName: "pages-data" },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|mp4)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "media",
            expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /\.(?:woff|woff2|ttf|otf)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "fonts",
            expiration: { maxEntries: 30, maxAgeSeconds: 365 * 24 * 60 * 60 },
          },
        },
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, ".."),
    port: 9000,
  },
  mode: "development",
  watch: true,
};
