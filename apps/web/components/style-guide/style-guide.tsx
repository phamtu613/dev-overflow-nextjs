"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormInput, Palette, Pointer, SquareStack, Type } from "lucide-react";
import { ButtonSection } from "./sections/button-section";
import { CardSection } from "./sections/card-section";
import { ColorSection } from "./sections/color-section";
import { FormSection } from "./sections/form-section";
import { TypographySection } from "./sections/typography-section";

export function StyleGuide() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-h1-bold mb-2">Common Style Guide</h1>
        <p className="text-paragraph-regular text-muted-foreground">
          Design system components and guidelines for consistent UI/UX
        </p>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid ">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Typography</span>
          </TabsTrigger>
          <TabsTrigger value="buttons" className="flex items-center gap-2">
            <Pointer className="h-4 w-4" />
            <span>Buttons</span>
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <FormInput className="h-4 w-4" />
            <span>Forms</span>
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <SquareStack className="h-4 w-4" />
            <span>Cards</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="mt-6">
          <ColorSection />
        </TabsContent>

        <TabsContent value="typography" className="mt-6">
          <TypographySection />
        </TabsContent>

        <TabsContent value="buttons" className="mt-6">
          <ButtonSection />
        </TabsContent>

        <TabsContent value="forms" className="mt-6">
          <FormSection />
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          <CardSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
