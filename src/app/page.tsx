import { ImageGeneratorForm } from '@/components/image-generator-form';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 selection:bg-accent selection:text-accent-foreground">
      <main className="w-full flex flex-col items-center">
        <header className="py-8 sm:py-12 text-center w-full max-w-3xl">
          <div className="inline-flex items-center justify-center mb-6">
            <Sparkles className="h-16 w-16 text-accent animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Chithram
            </span>
            <span className="text-primary"> Imagen</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            Unleash your creativity. Describe your vision, and let our AI craft stunning visuals for you.
          </p>
        </header>

        <div className="w-full max-w-xl mt-8 sm:mt-10">
          <ImageGeneratorForm />
        </div>
      </main>
      
    </div>
  );
}
