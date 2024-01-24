module.exports = {
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
