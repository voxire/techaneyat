/**
 * JSON-LD structured data component.
 * Pass any valid Schema.org object (or array of objects) as `data`.
 * Renders a <script type="application/ld+json"> tag in the document head.
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
