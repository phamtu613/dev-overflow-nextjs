"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, House, Loader2, Plus, Trash2 } from "lucide-react";

export function ButtonSection() {
  return (
    <div className="space-y-6">
      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Button Variants</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Different button styles for various use cases
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-h3-semibold">Default</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default Button</Button>
                <Button variant="default" disabled>
                  Disabled
                </Button>
                <Button variant="default">
                  <House className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
                <Button variant="default" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-h3-semibold">Destructive</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="destructive">Destructive</Button>
                <Button variant="destructive" disabled>
                  Disabled
                </Button>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-h3-semibold">Outline</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Outline</Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-h3-semibold">Secondary</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <Button variant="secondary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-h3-semibold">Ghost</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" disabled>
                  Disabled
                </Button>
                <Button variant="ghost">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-h3-semibold">Link</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="link">Link Button</Button>
                <Button variant="link" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Button Sizes</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Different sizes for different contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Full Width</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Buttons that span the full width of their container
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-w-md">
            <Button className="w-full">Full Width Button</Button>
            <Button variant="outline" className="w-full">
              Full Width Outline
            </Button>
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
              <h3 className="text-h3-semibold mb-2">Variant Usage</h3>
              <ul className="list-disc list-inside space-y-1 text-body-regular text-muted-foreground">
                <li>
                  <strong>Default</strong>: Primary actions (Submit, Save,
                  Continue)
                </li>
                <li>
                  <strong>Destructive</strong>: Dangerous actions (Delete,
                  Remove)
                </li>
                <li>
                  <strong>Outline</strong>: Secondary actions with emphasis
                </li>
                <li>
                  <strong>Secondary</strong>: Secondary actions (Cancel, Back)
                </li>
                <li>
                  <strong>Ghost</strong>: Tertiary actions, minimal emphasis
                </li>
                <li>
                  <strong>Link</strong>: Navigation, inline actions
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-h3-semibold mb-2">Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-body-regular text-muted-foreground">
                <li>Use clear, action-oriented labels</li>
                <li>Limit primary buttons to one per section</li>
                <li>Show loading states for async actions</li>
                <li>Use icons to provide visual context</li>
                <li>Disable buttons when action is unavailable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
