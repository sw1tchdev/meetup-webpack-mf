const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: isProduction ? false : 'source-map',
  mode: isProduction ? 'production' : 'development',
  devServer: {
    host: '0.0.0.0',
    port: 9001,
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    watchContentBase: true,
    disableHostCheck: true,
    liveReload: true,
    injectClient: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                helpers: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }, // postcss-loader
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: "remoteEntry.js",
      remotes: {
        host2: "host2@//localhost:9003/remoteEntry.js",
        remote: "remote@//localhost:9002/remoteEntry.js",
      },
      exposes: {
        "./Navigation": "./src/Navigation",
        "./routes": "./src/routes",
      },
      shared: {
        react: {
          requiredVersion: '^17.0.1',
          singleton: true,
        },
        'react-dom': {
          requiredVersion: '^17.0.1',
          singleton: true,
        },
        'react-router-dom': {
          requiredVersion: '^5.2.0',
          singleton: true,
        }
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      title: 'Meetup Webpack Module Federation',
      filename: 'index.html',
      cache: false,
      minify: {
        collapseWhitespace: false,
      },
    }),
    new CleanWebpackPlugin(),
  ],
};