const configuredOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const siteUrl = configuredOrigin
  ? new URL(
      configuredOrigin.startsWith("http")
        ? configuredOrigin
        : `https://${configuredOrigin}`,
    )
  : undefined;

export function absoluteSiteUrl(path: string) {
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}
