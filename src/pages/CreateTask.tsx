import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/pages/sidebar";
import { Save, Upload } from "lucide-react";

const CreateTask = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Crear Tarea</h1>
      <Card className="p-6">
        <form>
          <div className="mb-4">
            <textarea
              placeholder="Describe las instrucciones de la tarea..."
              className="min-h-[200px] border-input focus:ring-primary resize-none w-full rounded-md p-3"
            />
          </div>

          {/* Botón para subir imágenes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Subir Imagen
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="upload-image"
              />
              <label htmlFor="upload-image">
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Subir Imagen
                </Button>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 gap-2 shadow-card hover:shadow-elevated transition-all"
            >
              <Save className="h-4 w-4" />
              Guardar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleSidebar}
              className="flex-1"
            >
              Configurar Fechas
            </Button>
          </div>
        </form>
      </Card>

      {/* Sidebar para ingresar fechas */}
      {isSidebarOpen && (
        <Sidebar onClose={toggleSidebar}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Configurar Fechas</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Fecha de Entrega
              </label>
              <Input type="date" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Fecha de Envío
              </label>
              <Input type="date" />
            </div>
            <Button onClick={toggleSidebar} className="w-full">
              Guardar Fechas
            </Button>
          </div>
        </Sidebar>
      )}
    </div>
  );
};

export default CreateTask;