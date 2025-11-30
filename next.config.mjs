/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Root of subdomain -> blog home
        source: "/",
        destination: "/blog",
        has: [
          {
            type: "host",
            value: "blog.csmdynamics.com",
          },
        ],
      },
      {
        // All other paths on subdomain -> /blog/path
        source: "/:path*",
        destination: "/blog/:path*",
        has: [
          {
            type: "host",
            value: "blog.csmdynamics.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
