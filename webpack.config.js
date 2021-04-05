const path = require('path');
const tsTransformPaths = require('@zerollup/ts-transform-paths');

module.exports = {
  mode: 'production',
  entry: './index.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: (program) => {
            const transformer = tsTransformPaths(program);
            return { before: [transformer.before], afterDeclarations: [transformer.afterDeclarations] };
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    library: { type: 'commonjs2' }
  },

  watchOptions: {
    ignored: '/node_modules/',
  },
};
