export function publicUrl(path: string): string {
  return new URL(
    path.replace(/^\/+/, ""),
    window.location.origin + import.meta.env.BASE_URL
  ).toString();
}
