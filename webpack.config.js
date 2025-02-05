const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    content_scripts: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Updated to include JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow imports without file extensions
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json' },
        {
          from: 'icons/*',
          to: path.resolve(__dirname, 'dist'),
          context: 'src/',
        },
      ],
    }),
  ],
};
