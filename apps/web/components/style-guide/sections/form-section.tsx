"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormSection() {
  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Input Fields</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Text inputs for various data types
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="default">Default Input</Label>
              <Input id="default" placeholder="Enter text..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Input</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password Input</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" disabled placeholder="Disabled..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="error">Input with Error</Label>
              <Input
                id="error"
                placeholder="Error state..."
                className="border-destructive"
              />
              <p className="text-small-regular text-destructive">
                This field is required
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Dropdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Select Dropdown</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Dropdown selection components
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="select">Select Option</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Choose an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                  <SelectItem value="option4">Option 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checkbox */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Checkbox</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Multi-select options
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="check1" />
              <Label htmlFor="check1" className="text-body-regular">
                Default checkbox
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check2" defaultChecked />
              <Label htmlFor="check2" className="text-body-regular">
                Checked checkbox
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check3" disabled />
              <Label
                htmlFor="check3"
                className="text-body-regular text-muted-foreground"
              >
                Disabled checkbox
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Switch */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Switch</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Toggle switches for on/off states
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="switch1" />
              <Label htmlFor="switch1" className="text-body-regular">
                Default switch
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="switch2" defaultChecked />
              <Label htmlFor="switch2" className="text-body-regular">
                Checked switch
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="switch3" disabled />
              <Label
                htmlFor="switch3"
                className="text-body-regular text-muted-foreground"
              >
                Disabled switch
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Complete Form Example</CardTitle>
          <p className="text-body-regular text-muted-foreground">
            Full form with various input types
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-email">Email</Label>
              <Input
                id="form-email"
                type="email"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="vn">Vietnam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-body-regular">
                I agree to the terms and conditions
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="newsletter" />
              <Label htmlFor="newsletter" className="text-body-regular">
                Subscribe to newsletter
              </Label>
            </div>

            <div className="flex gap-3">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h2-bold">Form Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ul className="list-disc list-inside space-y-2 text-body-regular text-muted-foreground">
              <li>Always use clear, descriptive labels</li>
              <li>Provide helpful placeholder text</li>
              <li>Show validation errors inline</li>
              <li>Disable submit button during processing</li>
              <li>Use appropriate input types (email, password, etc.)</li>
              <li>Group related fields together</li>
              <li>Provide success feedback after submission</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

