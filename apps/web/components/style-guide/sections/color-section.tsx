import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ColorSection() {
  return (
    <div className="space-y-6">
      {/* Accent Color */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Accent Color</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Primary brand color for CTAs, links, and highlights
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg border bg-accent-gradient"></div>
              <div>
                <p className="text-body-medium font-semibold">
                  Accent gradient
                </p>
                <p className="text-small-regular text-muted-foreground">
                  Accent gradient
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg border bg-accent-800"></div>
              <div>
                <p className="text-body-medium font-semibold">Accent-800</p>
                <p className="text-small-regular text-muted-foreground">
                  #FFF1E6
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dark Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Dark Palette</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Dark theme and background colors
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-dark-100"></div>
              <div>
                <p className="text-body-medium font-semibold">Dark-100</p>
                <p className="text-small-regular text-muted-foreground">
                  #000000
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-dark-200"></div>
              <div>
                <p className="text-body-medium font-semibold">Dark-200</p>
                <p className="text-small-regular text-muted-foreground">
                  #0F1117
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-dark-300"></div>
              <div>
                <p className="text-body-medium font-semibold">Dark-300</p>
                <p className="text-small-regular text-muted-foreground">
                  #151821
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-dark-400"></div>
              <div>
                <p className="text-body-medium font-semibold">Dark-400</p>
                <p className="text-small-regular text-muted-foreground">
                  #212734
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-dark-500"></div>
              <div>
                <p className="text-body-medium font-semibold">Dark-500</p>
                <p className="text-small-regular text-muted-foreground">
                  #3F4354
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-dark-gradient"></div>
              <div>
                <p className="text-body-medium font-semibold">Dark gradient</p>
                <p className="text-small-regular text-muted-foreground">
                  linear-gradient(to left, #A0A2A5 0%, #5A5C60 100%)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Light Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Light Palette</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Light theme and text colors
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-light-900"></div>
              <div>
                <p className="text-body-medium font-semibold">Light-900</p>
                <p className="text-small-regular text-muted-foreground">
                  #FFFFFF
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-light-850"></div>
              <div>
                <p className="text-body-medium font-semibold">Light-850</p>
                <p className="text-small-regular text-muted-foreground">
                  #FDFDFD
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-light-800"></div>
              <div>
                <p className="text-body-medium font-semibold">Light-800</p>
                <p className="text-small-regular text-muted-foreground">
                  #F4F6F8
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-light-700"></div>
              <div>
                <p className="text-body-medium font-semibold">Light-700</p>
                <p className="text-small-regular text-muted-foreground">
                  #DCE3F1
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-light-500"></div>
              <div>
                <p className="text-body-medium font-semibold">Light-500</p>
                <p className="text-small-regular text-muted-foreground">
                  #7B8EC8
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-light-400"></div>
              <div>
                <p className="text-body-medium font-semibold">Light-400</p>
                <p className="text-small-regular text-muted-foreground">
                  #858EAD
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
