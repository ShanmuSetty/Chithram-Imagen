"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import NextImage from "next/image"; // Aliased to avoid conflict
import { Wand2, Loader2, AlertTriangle, Image as ImageIconLucide, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { handleGenerateImage } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  prompt: z.string()
    .min(10, "Please enter a more descriptive prompt (at least 10 characters).")
    .max(1000, "Prompt is too long (maximum 1000 characters)."),
});

export function ImageGeneratorForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await handleGenerateImage({ prompt: values.prompt });
      setImageUrl(result.imageUrl);
      toast({
        title: "Image Generated!",
        description: "Your masterpiece is ready.",
        variant: "default",
      });
    } catch (e: any) {
      const errorMessage = e.message || "An unexpected error occurred while generating the image.";
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-2xl bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center mb-3">
            <Sparkles className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">Describe Your Vision</CardTitle>
        <CardDescription>Enter a detailed prompt to generate a unique image.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Image Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A mystical forest with glowing mushrooms, digital art, vibrant colors..."
                      className="min-h-[120px] text-base resize-none focus:ring-accent focus:ring-offset-0 focus:border-accent shadow-inner"
                      {...field}
                      aria-label="Image generation prompt"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground/80 px-1">
                    The more detailed your prompt, the better the result.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full text-lg py-7 font-bold group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 bg-primary hover:bg-primary/90"
              aria-live="polite"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Crafting...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-6 w-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                  Craft Image
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      {(isLoading || imageUrl || error) && (
        <CardFooter className="mt-6">
          <div className="w-full aspect-[4/3] sm:aspect-square bg-muted/30 rounded-lg shadow-md flex items-center justify-center overflow-hidden border border-border/30 relative transition-all duration-500 ease-in-out">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-primary p-4 animate-fadeIn">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 animate-spin" />
                <p className="mt-4 text-md sm:text-lg font-medium">Generating your masterpiece...</p>
                <p className="text-xs sm:text-sm text-muted-foreground">This might take a moment.</p>
              </div>
            )}
            {error && !isLoading && (
              <div className="p-4 text-center text-destructive animate-fadeIn">
                <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3" />
                <p className="font-semibold text-md sm:text-lg">Oops! Something went wrong.</p>
                <p className="text-xs sm:text-sm mt-1">{error}</p>
              </div>
            )}
            {imageUrl && !isLoading && !error && (
              <NextImage
                src={imageUrl}
                alt="Generated AI Image"
                layout="fill"
                objectFit="contain" // or "cover" depending on desired behavior
                className="animate-fadeIn"
                priority={true}
                unoptimized={imageUrl.startsWith('data:')} // Handle potential base64 images from Genkit (though typically URLs)
              />
            )}
            {!isLoading && !imageUrl && !error && (
                 <div className="p-4 text-center text-muted-foreground animate-fadeIn">
                    <ImageIconLucide className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 opacity-30" />
                    <p className="text-md sm:text-lg font-medium">Your AI-generated image will appear here.</p>
                    <p className="text-xs sm:text-sm mt-1">Enter a prompt above and click "Craft Image".</p>
                </div>
            )}
          </div>
        </CardFooter>
      )}
       {!isLoading && !imageUrl && !error && (
         <CardFooter className="mt-6">
            <div className="w-full aspect-[4/3] sm:aspect-square bg-muted/30 rounded-lg shadow-md flex items-center justify-center overflow-hidden border border-border/30 relative">
                <div className="p-4 text-center text-muted-foreground animate-fadeIn">
                    <ImageIconLucide className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 opacity-30" />
                    <p className="text-md sm:text-lg font-medium">Your AI-generated image will appear here.</p>
                    <p className="text-xs sm:text-sm mt-1">Enter a prompt above and click "Craft Image".</p>
                </div>
            </div>
        </CardFooter>
        )}
    </Card>
  );
}
