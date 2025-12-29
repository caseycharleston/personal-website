import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/, // mdx and md
});

export default withMDX(nextConfig);
