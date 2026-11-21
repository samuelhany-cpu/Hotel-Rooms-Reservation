import type { MetadataRoute } from 'next';
import { isPreviewDeployment, SITE_ORIGIN } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/book',
        '/login',
        '/signup',
        '/forgot-password',
        '/privacy',
        '/terms',
      ],
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
