"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowRight, ArrowLeft, Plus, FileText, FileUp, Database, Wand2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Datos de ejemplo para templates guardados
const savedTemplates = [
  {
    id: "template-1",
    name: "Análisis de Sangre Oncológico",
    description: "Template para datos de análisis de sangre de pacientes oncológicos",
    createdAt: "15/03/2023",
    fields: 14,
    lastUsed: "Hace 2 días"
  },
  {
    id: "template-2",
    name: "Biopsias Tumorales",
    description: "Template para resultados de biopsias oncológicas",
    createdAt: "10/02/2023",
    fields: 12,
    lastUsed: "Hace 1 semana"
  },
  {
    id: "template-3",
    name: "Marcadores Tumorales",
    description: "Template para datos de marcadores tumorales",
    createdAt: "05/01/2023",
    fields: 11,
    lastUsed: "Hace 3 semanas"
  },
  {
    id: "template-4",
    name: "Signos Vitales Pacientes Oncológicos",
    description: "Template para monitoreo de signos vitales de pacientes oncológicos",
    createdAt: "20/12/2022",
    fields: 12,
    lastUsed: "Hace 1 mes"
  }
]

export default function SeleccionTemplate() {
  const router = useRouter()
  const [option, setOption] = useState<"create" | "use">("create")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  
  // Manejar la navegación al siguiente paso
  const handleNext = () => {
    if (option === "create") {
      // Si se elige crear un nuevo template, ir al paso de selección de fuente
      router.push("/ingesta/seleccion-fuente")
    } else if (option === "use" && selectedTemplate) {
      // Si se elige usar un template existente, ir a la página de ingesta con template
      router.push(`/ingesta/ingesta-template?template=${selectedTemplate}`)
    }
  }
  
  // Verificar si se puede continuar
  const canContinue = option === "create" || (option === "use" && selectedTemplate !== "")

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Ingesta de Datos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 1 de 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "16.6%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Selección de Template</h1>
          <p className="text-muted-foreground">Elige si deseas crear un nuevo template o utilizar uno existente</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Opciones de Template</CardTitle>
            <CardDescription>
              Los templates te permiten reutilizar configuraciones para diferentes ingestas de datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              value={option} 
              onValueChange={(value) => setOption(value as "create" | "use")}
              className="space-y-4"
            >
              {/* Opción: Crear nuevo template */}
              <div className={`flex items-start space-x-3 border rounded-lg p-4 ${option === "create" ? "border-primary bg-primary/5" : "border-muted"}`}>
                <RadioGroupItem value="create" id="create" className="mt-1" />
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="create" className="text-base font-medium">Crear nuevo template</Label>
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configura un nuevo template desde cero. Podrás definir campos, validaciones y opciones de procesamiento.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-muted/50 text-xs px-2 py-1 rounded flex items-center gap-1">
                      <FileUp className="h-3 w-3" />
                      <span>Subir archivo</span>
                    </div>
                    <div className="bg-muted/50 text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      <span>Conectar API</span>
                    </div>
                    <div className="bg-muted/50 text-xs px-2 py-1 rounded flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>Formulario</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Opción: Usar template existente */}
              <div className={`flex items-start space-x-3 border rounded-lg p-4 ${option === "use" ? "border-primary bg-primary/5" : "border-muted"}`}>
                <RadioGroupItem value="use" id="use" className="mt-1" />
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="use" className="text-base font-medium">Usar template existente</Label>
                    <Wand2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Utiliza un template previamente configurado para agilizar el proceso de ingesta de datos.
                  </p>
                  
                  {option === "use" && (
                    <div className="pt-3">
                      <Label htmlFor="template-select" className="text-sm mb-1.5 block">Selecciona un template</Label>
                      <Select 
                        value={selectedTemplate} 
                        onValueChange={setSelectedTemplate}
                      >
                        <SelectTrigger id="template-select" className="w-full">
                          <SelectValue placeholder="Selecciona un template" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedTemplate && (
                        <div className="mt-4 bg-muted/30 p-3 rounded-md space-y-2 text-sm">
                          {savedTemplates.filter(t => t.id === selectedTemplate).map((template) => (
                            <div key={template.id}>
                              <p className="font-medium">{template.name}</p>
                              <p className="text-muted-foreground text-xs">{template.description}</p>
                              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Creado:</span> {template.createdAt}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Campos:</span> {template.fields}
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Último uso:</span> {template.lastUsed}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => router.push("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!canContinue}
              className="gap-2"
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 