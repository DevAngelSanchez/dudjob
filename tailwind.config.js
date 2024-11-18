module.exports = {
  content: [
    './index.html',
    './js/**/*.js',
    './css/**/*.css',
  ],
  theme: {
    extend: {
      fontSize: {
        'clamp-title': 'clamp(2.4rem, 1.25vw + 0.8rem, 3.2rem)',
        'clamp-p': 'clamp(1.6rem, 1.25vw + 0.8rem, 1.6rem)',
      },
    },
  },
  plugins: [],
}
