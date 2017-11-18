module.exports = {
  plugins: [
    require('autoprefixer'),
    // 'postcss-import': {},
    require('cssnano')({
      preset: 'advanced',
    }),
  ],
};
