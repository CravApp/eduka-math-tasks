import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const CreateTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: { title: string; instructions: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert([newTask])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "¡Tarea creada!",
        description: "La tarea se ha guardado correctamente.",
      });
      navigate("/tasks");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo crear la tarea. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
      console.error("Error creating task:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !instructions.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    createTaskMutation.mutate({ title, instructions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="mx-auto max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/tasks")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <Card className="p-8 shadow-elevated">
          <h1 className="mb-6 text-2xl font-bold text-foreground">Creación de Tarea</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Título
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Ecuaciones Lineales"
                className="border-input focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-foreground">
                Instrucciones
              </Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Describe las instrucciones de la tarea..."
                className="min-h-[200px] border-input focus:ring-primary resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={createTaskMutation.isPending}
                className="flex-1 gap-2 shadow-card hover:shadow-elevated transition-all"
              >
                <Save className="h-4 w-4" />
                {createTaskMutation.isPending ? "Guardando..." : "Guardar"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/tasks")}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTask;
