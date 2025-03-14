"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ArrowRight, ArrowLeft, FileUp, Upload, Database, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Lista de formularios predefinidos
const predefinedForms = [
  { id: "tucan", name: "Formulario de Tucán", description: "Formulario para ingreso de datos de tucanes" },
  { id: "form1", name: "Formulario de Pacientes", description: "Formulario para ingreso de datos de pacientes" },
  { id: "form2", name: "Formulario de Análisis", description: "Formulario para registro de análisis clínicos" },
  { id: "form3", name: "Formulario de Tratamientos", description: "Formulario para seguimiento de tratamientos" },
  { id: "form4", name: "Formulario de Citas", description: "Formulario para gestión de citas médicas" }
]

export default function SeleccionFuente() {
  const router = useRouter()
  const [selectedSource, setSelectedSource] = useState<string>("file")
  const [fileName, setFileName] = useState("")
  const [apiEndpoint, setApiEndpoint] = useState("")
  const [selectedForm, setSelectedForm] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleBack = () => {
    router.push("/ingesta/seleccion-template")
  }

  const handleContinue = () => {
    // Guardar la fuente seleccionada en localStorage
    localStorage.setItem('selectedSource', selectedSource)
    
    if (selectedForm) {
      localStorage.setItem('selectedForm', selectedForm)
    }
    
    // Navegar al siguiente paso según la fuente seleccionada
    if (selectedSource === 'file') {
      router.push("/ingesta/configuracion-archivo")
    } else if (selectedSource === 'api') {
      router.push("/ingesta/configuracion-api")
    } else if (selectedSource === 'form') {
      router.push("/ingesta/configuracion-formulario")
    }
  }

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
              <BreadcrumbLink href="/ingesta">Ingesta de Datos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Selección de Fuente</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 1 de 5</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "20%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Selección de Fuente de Datos</h1>
          <p className="text-muted-foreground">Selecciona el origen de los datos que deseas ingestar</p>
        </div>

        {/* Carga de datos */}
        <Card>
          <CardHeader>
            <CardTitle>Carga de Datos</CardTitle>
            <CardDescription>
              Selecciona la fuente de datos para aplicar el template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="file" className="w-full" onValueChange={(value) => setSelectedSource(value)}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="file" className="flex items-center justify-center gap-2 py-3">
                  <FileUp className="h-5 w-5" />
                  <span>Subir Archivo</span>
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center justify-center gap-2 py-3">
                  <Database className="h-5 w-5" />
                  <span>Conexión a API</span>
                </TabsTrigger>
                <TabsTrigger value="form" className="flex items-center justify-center gap-2 py-3">
                  <FileText className="h-5 w-5" />
                  <span>Formulario Interno</span>
                </TabsTrigger>
              </TabsList>

              {/* Opción: Subir Archivo */}
              <TabsContent value="file">
                <div 
                  className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Arrastra y suelta tu archivo aquí, o
                    </p>
                    <Button 
                      variant="default"
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('file-upload')?.click();
                      }}
                    >
                      Seleccionar archivo
                    </Button>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".csv,.txt,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                    {fileName && (
                      <p className="font-medium mt-2">
                        Archivo seleccionado: {fileName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Formatos soportados: CSV, TXT, XLS, XLSX
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tamaño máximo: 50MB
                  </p>
                </div>
              </TabsContent>

              {/* Opción: Conexión a API */}
              <TabsContent value="api">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-endpoint">URL del Endpoint</Label>
                    <Input 
                      id="api-endpoint" 
                      placeholder="https://api.ejemplo.com/datos" 
                      value={apiEndpoint}
                      onChange={(e) => setApiEndpoint(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="api-method">Método</Label>
                    <select 
                      id="api-method" 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="api-auth">Autenticación</Label>
                    <select 
                      id="api-auth" 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="none">Sin autenticación</option>
                      <option value="basic">Basic Auth</option>
                      <option value="bearer">Bearer Token</option>
                      <option value="apikey">API Key</option>
                    </select>
                  </div>
                </div>
              </TabsContent>

              {/* Opción: Formulario Interno */}
              <TabsContent value="form">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="form-select">Seleccionar Formulario</Label>
                    <select 
                      id="form-select" 
                      className="w-full p-2 border rounded-md"
                      value={selectedForm || ""}
                      onChange={(e) => setSelectedForm(e.target.value)}
                    >
                      <option value="" disabled>Selecciona un formulario</option>
                      <option value="tucan">Formulario de Tucán</option>
                      <option value="form1">Formulario de Pacientes</option>
                      <option value="form2">Formulario de Análisis</option>
                      <option value="form3">Formulario de Tratamientos</option>
                      <option value="form4">Formulario de Citas</option>
                    </select>
                  </div>
                  {selectedForm && (
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <h3 className="font-medium mb-2">
                        {predefinedForms.find(f => f.id === selectedForm)?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {predefinedForms.find(f => f.id === selectedForm)?.description}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={(selectedSource === "file" && !fileName) || 
                     (selectedSource === "api" && !apiEndpoint) || 
                     (selectedSource === "form" && !selectedForm)}
            className="gap-2"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 