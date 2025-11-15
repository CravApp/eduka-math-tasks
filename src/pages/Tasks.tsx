import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, BookOpen } from "lucide-react";

const Tasks = () => {
  const navigate = useNavigate();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Tareas de Matemáticas</h1>
          </div>
          <Button
            onClick={() => navigate("/create-task")}
            className="gap-2 shadow-elevated hover:shadow-card transition-all"
          >
            <Plus className="h-4 w-4" />
            Crear Tarea
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tasks && tasks.length > 0 ? (
          <div className="grid gap-4">
            {tasks.map((task, index) => (
              <Card
                key={task.id}
                className="p-6 transition-all hover:shadow-elevated cursor-pointer border-border/50 hover:border-primary/30"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">{task.title}</h3>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">{task.instructions}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed border-2 border-border/50">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground">No hay tareas creadas todavía.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Haz clic en "Crear Tarea" para comenzar.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tasks;
