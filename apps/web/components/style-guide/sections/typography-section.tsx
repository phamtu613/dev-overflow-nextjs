"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Typography scale dynamically extracted from theme.css utility classes
const typographyScale = [
  {
    name: "H1 Bold",
    class: "text-h1-bold",
    example: "The quick brown fox jumps",
  },
  {
    name: "H2 Bold",
    class: "text-h2-bold",
    example: "The quick brown fox jumps over",
  },
  {
    name: "H2 SemiBold",
    class: "text-h2-semibold",
    example: "The quick brown fox jumps over",
  },
  {
    name: "H3 Bold",
    class: "text-h3-bold",
    example: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "H3 SemiBold",
    class: "text-h3-semibold",
    example: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Base Medium",
    class: "text-base-medium",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  },
  {
    name: "Base SemiBold",
    class: "text-base-semibold",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  },
  {
    name: "Base Bold",
    class: "text-base-bold",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  },
  {
    name: "Paragraph Regular",
    class: "text-paragraph-regular",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  },
  {
    name: "Paragraph Medium",
    class: "text-paragraph-medium",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  },
  {
    name: "Paragraph SemiBold",
    class: "text-paragraph-semibold",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  },
  {
    name: "Body Regular",
    class: "text-body-regular",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  },
  {
    name: "Body Medium",
    class: "text-body-medium",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  },
  {
    name: "Body SemiBold",
    class: "text-body-semibold",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  },
  {
    name: "Small Regular",
    class: "text-small-regular",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
  },
  {
    name: "Small Medium",
    class: "text-small-medium",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
  },
  {
    name: "Small SemiBold",
    class: "text-small-semibold",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
  },
  {
    name: "Subtle Regular",
    class: "text-subtle-regular",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  },
  {
    name: "Subtle Medium",
    class: "text-subtle-medium",
    example:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  },
];

export function TypographySection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Typography Scale</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            All typography styles used across the application
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {typographyScale.map((type) => (
              <div key={type.name} className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <p className="text-body-semibold">{type.name}</p>
                  <code className="text-small-regular bg-muted px-2 py-1 rounded">
                    {type.class}
                  </code>
                </div>
                <p className={type.class}>{type.example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-h3-semibold mb-2">Headings</h3>
              <ul className="list-disc list-inside space-y-1 text-body-regular text-muted-foreground">
                <li>
                  <strong>H1-Bold</strong>: Page titles and main headings
                </li>
                <li>
                  <strong>H2-Bold/SemiBold</strong>: Section headings
                </li>
                <li>
                  <strong>H3-Bold/SemiBold</strong>: Sub-section headings
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-h3-semibold mb-2">Body Text</h3>
              <ul className="list-disc list-inside space-y-1 text-body-regular text-muted-foreground">
                <li>
                  <strong>Paragraph</strong>: Long-form content, articles
                </li>
                <li>
                  <strong>Body</strong>: UI text, descriptions, labels
                </li>
                <li>
                  <strong>Small</strong>: Captions, meta information
                </li>
                <li>
                  <strong>Subtle</strong>: Timestamps, legal text
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
