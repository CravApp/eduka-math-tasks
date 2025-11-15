import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Tarea no encontrada</p>
          <Button onClick={() => navigate("/tasks")} className="mt-4">
            Volver a Tareas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="mx-auto max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/tasks")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Tareas
        </Button>

        <Card className="p-8 shadow-elevated">
          <div className="mb-6">
            <h1 className="mb-4 text-3xl font-bold text-foreground">{task.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Creada el {new Date(task.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Instrucciones</h2>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="whitespace-pre-wrap text-foreground">{task.instructions}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetail;
