/**
 * Renders one or more schema.org objects as a JSON-LD <script>.
 * Server component — the markup lands in the SSR HTML for crawlers.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, first-party content built from our own
      // constants — safe to inline. JSON.stringify escapes the values.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json.length === 1 ? json[0] : json) }}
    />
  );
}
