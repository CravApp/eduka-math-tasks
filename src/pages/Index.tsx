import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, BookOpen, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-elevated">
              <Calculator className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          EdukaChat
        </h1>
        
        <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
          Plataforma de Gestión de Tareas de Matemáticas
        </p>

        {/* Main CTA Button */}
        <Button
          onClick={() => navigate("/tasks")}
          size="lg"
          className="group relative mb-12 h-16 gap-3 overflow-hidden px-12 text-lg shadow-elevated transition-all hover:scale-105 hover:shadow-card"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] transition-all group-hover:animate-shimmer" />
          <span className="relative flex items-center gap-3">
            <BookOpen className="h-6 w-6" />
            Mate
            <Sparkles className="h-5 w-5 animate-pulse" />
          </span>
        </Button>

        {/* Feature highlights */}
        <div className="grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-card">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">Ver Tareas</h3>
            <p className="text-sm text-muted-foreground">
              Accede a todas tus tareas de matemáticas
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-card">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Calculator className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">Crear Tareas</h3>
            <p className="text-sm text-muted-foreground">
              Añade nuevas tareas fácilmente
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-card">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">Gestión Simple</h3>
            <p className="text-sm text-muted-foreground">
              Interfaz intuitiva y limpia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
