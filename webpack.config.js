const path = require('path')
const { globSync } = require('glob')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

const { NODE_ENV } = process.env

const SRC_PATH = path.resolve(__dirname, 'src')

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: {
    index: SRC_PATH,
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [SRC_PATH],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
}
