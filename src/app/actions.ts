// src/app/actions.ts
'use server';

import { generateImage as genImageFlow, GenerateImageInput, GenerateImageOutput } from '@/ai/flows/generate-image';

export async function handleGenerateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  // Basic input validation (though Zod handles more complex cases on the client)
  if (!input.prompt || typeof input.prompt !== 'string' || input.prompt.trim().length === 0) {
    throw new Error("Prompt cannot be empty.");
  }
  if (input.prompt.length > 1000) { // Max length check
      throw new Error("Prompt is too long. Maximum 1000 characters.");
  }


  try {
    console.log(`Generating image for prompt: "${input.prompt}"`);
    const result = await genImageFlow(input);
    if (!result || !result.imageUrl) {
        throw new Error("AI model did not return an image URL.");
    }
    console.log(`Image generated: ${result.imageUrl}`);
    return result;
  } catch (error: any) {
    console.error("Error in handleGenerateImage server action:", error);
    
    let errorMessage = "Failed to generate image due to an unexpected server error.";
    if (error.message) {
        // Try to provide a more specific error if available
        if (error.message.includes("billing") || error.message.includes("quota")) {
            errorMessage = "Image generation failed due to a billing or quota issue. Please check your account.";
        } else if (error.message.includes("moderation") || error.message.includes("safety")) {
            errorMessage = "Image generation failed due to content policy. Please try a different prompt.";
        } else if (error.message.includes("timeout")) {
            errorMessage = "Image generation timed out. Please try again shortly.";
        } else {
            // For other specific errors from the AI service that might be useful
            // but avoid leaking too much internal detail.
            // errorMessage = `Image generation error: ${error.message}`; // Could be too verbose or leak info
        }
    }
    
    // Re-throw a new error with a user-friendly message
    // This ensures that sensitive internal error details are not directly exposed to the client.
    throw new Error(errorMessage);
  }
}
