import { posterSvg } from "@/lib/field";

export const dynamic = "force-static";

export function GET() {
  return new Response(posterSvg("dark"), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
