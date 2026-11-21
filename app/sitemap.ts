import type { MetadataRoute } from 'next';
import { ROOMS } from '@/lib/booking-demo';
import { isPreviewDeployment, SITE_ORIGIN } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreviewDeployment()) return [];

  return [
    {
      url: SITE_ORIGIN,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...ROOMS.map((room) => ({
      url: `${SITE_ORIGIN}/rooms/${room.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
