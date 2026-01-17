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
				protocol: "https",
				hostname: new URL("https://admin.mec-ci.org/").hostname,
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
