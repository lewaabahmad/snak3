module.exports = {
  entry: "./components/board.js",
  output: {
    filename: "./public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel', 
        query: {
          presets: [ 'react', 'es2015' ]
        }
      }
    ]
  }
}