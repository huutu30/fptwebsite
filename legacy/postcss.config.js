export default {
  plugins: {
    autoprefixer: {
      // Target: cover 99% of Vietnamese mobile users
      overrideBrowserslist: [
        '> 0.5%',
        'last 4 versions',
        'iOS >= 12',
        'Safari >= 12',
        'Android >= 5',
        'Chrome >= 60',
        'Firefox >= 60',
        'not dead'
      ]
    }
  }
}
