import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8081",
			},
			{
				protocol: 'https',
				hostname: 'admin.mec-ci.org',
				pathname: '/uploads/**',
			},
			{
				protocol: "https",
				hostname: new URL("https://images.unsplash.com").hostname,
			}
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '50mb',
		},
	},
	output: 'standalone',
};

export default withNextIntl(nextConfig);
