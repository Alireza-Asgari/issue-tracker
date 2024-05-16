/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referre-policy", value: "no-referre" }],
      },
    ];
  },
};

module.exports = nextConfig;
