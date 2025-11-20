"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function CardSection() {
  return (
    <div className="space-y-6">
      {/* Basic Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Basic Cards</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Different card layouts and compositions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Simple Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  The Lightning Component c:LWC_PizzaTracker generated invalid
                  output for field status. Error How to solve this
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Link
                    href="#"
                    className="text-subtle-regular hover:underline bg-light-800 py-2 px-4 uppercase rounded-md"
                  >
                    Javascript
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Dashboard Cards</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Cards for displaying metrics and statistics
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-body-semibold">
                  Total Users
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-h2-bold">12,543</div>
                <p className="text-small-regular text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-body-semibold">Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-h2-bold">$45,231</div>
                <p className="text-small-regular text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-body-semibold">Active Now</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-h2-bold">573</div>
                <p className="text-small-regular text-muted-foreground">
                  <span className="text-green-600">+201</span> since last hour
                </p>
              </CardContent>
            </Card>
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
              <h3 className="text-h3-semibold mb-2">Card Anatomy</h3>
              <ul className="list-disc list-inside space-y-1 text-body-regular text-muted-foreground">
                <li>
                  <strong>CardHeader</strong>: Title, description, and metadata
                </li>
                <li>
                  <strong>CardContent</strong>: Main content area
                </li>
                <li>
                  <strong>CardFooter</strong>: Actions or additional info
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-h3-semibold mb-2">Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-body-regular text-muted-foreground">
                <li>Keep card content focused and scannable</li>
                <li>Use consistent spacing and alignment</li>
                <li>Add hover effects for clickable cards</li>
                <li>Group related information together</li>
                <li>Use appropriate card sizes for content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
