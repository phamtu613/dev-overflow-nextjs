"use client";

import { LoginForm } from "@/components/examples/login-form";
import { RegisterForm } from "@/components/examples/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-h1-bold mb-2">Form Examples</h1>
          <p className="text-paragraph-regular text-muted-foreground">
            Examples of forms using React Hook Form, Zod validation, and Zustand
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="flex justify-center">
              <LoginForm />
            </div>
          </TabsContent>

          <TabsContent value="register">
            <div className="flex justify-center">
              <RegisterForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
