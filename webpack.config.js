let tsArgs = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "cheap-source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js"],
  },

  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

module.exports = [
  {
    mode: "development",
    name: "main",
    entry: {
      main: "./tsdist/game_client/index.js",
      worker: "./tsdist/game_worker/GameWorkerScript.js",
    },
    output: {
      filename: "[name]_bundle.js",
      path: __dirname + "/dist",
    },

    ...tsArgs,
  },
];
