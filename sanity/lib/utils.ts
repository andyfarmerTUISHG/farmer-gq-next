

export function resolveHref(
    documentType?: string,
    slug?: string,
  ): string | undefined {
    switch (documentType) {
      case "home":
        return "/";
      case "page":
        return slug ? `/${slug}` : undefined;
      case "article":
        return slug ? `/article/${slug}` : undefined;
      default:
        console.warn("Invalid document type:", documentType);
        return undefined;
    }
  }
  