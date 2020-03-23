// const path = require('path')

// module.exports = {
//   entry: path.resolve(__dirname + '/client/src/index.jsx'),
//   module: {
//     rules: [
//       { 
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-react', '@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//    output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname + '/client/dist')
//   }
// };

module.exports = {
  entry: './client/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/client/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist'
  }
};