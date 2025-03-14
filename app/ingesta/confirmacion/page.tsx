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
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowRight, ArrowLeft, CheckCircle, Database, Home, Calendar, Tag, Clock, FileCheck, Download, FileSpreadsheet, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Datos de ejemplo para el resumen
const summaryData = {
  totalRecords: 1187,
  datasetName: "Pacientes Oncológicos",
  currentVersion: "1.2",
  newVersion: "1.3",
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  status: "Listo para guardar",
  source: "Formulario Clínico",
  fields: 8,
  validationPassed: true,
  dataPreview: [
    { 
      id_paciente: "PAC001", 
      nombre: "Juan Pérez", 
      edad: "65", 
      tipo_cancer: "Pulmón", 
      estadio: "III", 
      fecha_diagnostico: "2023-10-15", 
      hemoglobina: "9.5", 
      leucocitos: "12000" 
    },
    { 
      id_paciente: "PAC002", 
      nombre: "María López", 
      edad: "58", 
      tipo_cancer: "Mama", 
      estadio: "II", 
      fecha_diagnostico: "2023-11-22", 
      hemoglobina: "11.2", 
      leucocitos: "8500" 
    },
    { 
      id_paciente: "PAC003", 
      nombre: "Carlos Ruiz", 
      edad: "72", 
      tipo_cancer: "Próstata", 
      estadio: "I", 
      fecha_diagnostico: "2023-09-05", 
      hemoglobina: "10.8", 
      leucocitos: "7200" 
    },
  ]
}

export default function ConfirmacionGuardado() {
  const router = useRouter()
  const [createNewVersion, setCreateNewVersion] = useState(true)
  const [saveAsTemplate, setSaveAsTemplate] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  
  // Ir al paso anterior
  const handleBack = () => {
    router.push("/ingesta/validacion")
  }

  // Ir al dashboard
  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }
  
  // Guardar datos
  const handleSaveData = () => {
    setIsSaving(true)
    
    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      
      // Mostrar mensaje de éxito
      let successMessage = "Los datos han sido guardados correctamente en la base de datos.";
      
      // Si se guardó como template, añadir información adicional
      if (saveAsTemplate && templateName) {
        successMessage += ` El template "${templateName}" ha sido guardado y estará disponible para futuras ingestas.`;
      }
      
      toast({
        title: "Datos guardados",
        description: successMessage,
      })
    }, 2000)
  }
  
  // Descargar datos en CSV
  const handleDownloadCSV = () => {
    setIsDownloading('csv')
    
    // Simulación de descarga
    setTimeout(() => {
      // Crear CSV a partir de los datos
      const headers = Object.keys(summaryData.dataPreview[0]).join(',')
      const rows = summaryData.dataPreview.map(row => 
        Object.values(row).join(',')
      ).join('\n')
      const csvContent = `${headers}\n${rows}`
      
      // Crear blob y descargar
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `${summaryData.datasetName}_${summaryData.date}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setIsDownloading(null)
      
      toast({
        title: "CSV descargado",
        description: "El archivo CSV ha sido descargado correctamente.",
      })
    }, 1000)
  }
  
  // Descargar datos en Excel
  const handleDownloadExcel = () => {
    setIsDownloading('excel')
    
    // Simulación de descarga
    setTimeout(() => {
      // En un entorno real, aquí se generaría un archivo Excel real
      // Para esta demo, simplemente simulamos la descarga
      
      toast({
        title: "Excel descargado",
        description: "El archivo Excel ha sido descargado correctamente.",
      })
      
      setIsDownloading(null)
    }, 1500)
  }

  return (
    <div className="py-6">
      <Toaster />
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
              <BreadcrumbLink href="/ingesta/seleccion-template">Selección de Template</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingesta/seleccion-fuente">Selección de Fuente</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingesta/configuracion-archivo">Configuración de Archivo</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingesta/mapeo-campos">Definición de Campos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingesta/validacion">Validación de Datos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Confirmación y Guardado</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 6 de 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Confirmación y Guardado</h1>
          <p className="text-muted-foreground">Revisa y confirma los datos antes de guardarlos en la base de datos</p>
        </div>

        {/* Mensaje de éxito */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-800">¡Proceso completado con éxito!</h2>
                <p className="text-green-700 mt-1">
                  Se han procesado y validado <span className="font-bold">{summaryData.totalRecords}</span> registros que están listos para ser guardados.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resumen y opciones */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Resumen del dataset */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Resumen del Dataset</CardTitle>
              <CardDescription>
                Información general sobre los datos a guardar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Nombre del Dataset</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      {summaryData.datasetName}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Versión Actual</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {summaryData.currentVersion}
                      {createNewVersion && (
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                          Nueva: {summaryData.newVersion}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Fecha</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {summaryData.date}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Hora</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {summaryData.time}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Estado</Label>
                    <div className="font-medium">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {summaryData.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Fuente de Datos</Label>
                    <div className="font-medium">
                      {summaryData.source}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-muted-foreground text-xs">Vista previa de datos</Label>
                    
                    {/* Opciones de descarga */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span>Descargar</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={handleDownloadCSV}
                          disabled={isDownloading !== null}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {isDownloading === 'csv' ? 'Descargando CSV...' : 'Descargar como CSV'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleDownloadExcel}
                          disabled={isDownloading !== null}
                          className="flex items-center gap-2"
                        >
                          <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                          {isDownloading === 'excel' ? 'Descargando Excel...' : 'Descargar como Excel'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(summaryData.dataPreview[0]).map((key) => (
                            <TableHead key={key} className="bg-muted/50">
                              {key}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {summaryData.dataPreview.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, i) => (
                              <TableCell key={i}>{value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Mostrando 3 de {summaryData.totalRecords} registros
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Opciones de guardado */}
          <Card>
            <CardHeader>
              <CardTitle>Opciones de Guardado</CardTitle>
              <CardDescription>
                Configura cómo se guardarán los datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="create-version" 
                  checked={createNewVersion}
                  onCheckedChange={(checked) => setCreateNewVersion(!!checked)}
                  disabled={isSaved}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="create-version"
                    className={isSaved ? "text-muted-foreground" : ""}
                  >
                    Crear nueva versión del dataset
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Se creará la versión {summaryData.newVersion} manteniendo la versión actual como histórico
                  </p>
                </div>
              </div>
              
              {/* Opción para guardar como template */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="save-template" 
                  checked={saveAsTemplate}
                  onCheckedChange={(checked) => setSaveAsTemplate(!!checked)}
                  disabled={isSaved}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="save-template"
                    className={isSaved ? "text-muted-foreground" : ""}
                  >
                    Guardar como template
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Guarda esta configuración como template para reutilizarla en futuras ingestas
                  </p>
                </div>
              </div>
              
              {/* Campo para nombre del template */}
              {saveAsTemplate && !isSaved && (
                <div className="ml-6 mt-2">
                  <Label htmlFor="template-name" className="text-sm mb-1.5 block">
                    Nombre del template
                  </Label>
                  <input
                    id="template-name"
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Ej: Template Análisis Sangre Oncológico"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>
              )}
              
              <div className="pt-4 space-y-2">
                <Label className="text-muted-foreground text-xs">Resumen</Label>
                <div className="bg-muted/30 p-3 rounded-md space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total de registros:</span>
                    <span className="font-medium">{summaryData.totalRecords}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Campos:</span>
                    <span className="font-medium">{summaryData.fields}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validación:</span>
                    <span className="font-medium text-green-600">Completada</span>
                  </div>
                </div>
              </div>
              
              {/* Opciones de exportación */}
              <div className="pt-4 space-y-2">
                <Label className="text-muted-foreground text-xs">Exportar datos</Label>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start gap-2"
                    onClick={handleDownloadCSV}
                    disabled={isDownloading !== null}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {isDownloading === 'csv' ? 'Descargando CSV...' : 'Descargar como CSV'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start gap-2"
                    onClick={handleDownloadExcel}
                    disabled={isDownloading !== null}
                  >
                    <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                    {isDownloading === 'excel' ? 'Descargando Excel...' : 'Descargar como Excel'}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {!isSaved ? (
                <Button 
                  onClick={handleSaveData} 
                  className="w-full gap-2"
                  disabled={isSaving || (saveAsTemplate && !templateName)}
                >
                  {isSaving ? (
                    <>Guardando datos...</>
                  ) : (
                    <>
                      <Database className="h-4 w-4" />
                      Guardar Datos en BD
                    </>
                  )}
                </Button>
              ) : (
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-md">
                    <FileCheck className="h-5 w-5" />
                    <span className="font-medium">
                      Datos guardados correctamente
                      {saveAsTemplate && templateName && (
                        <span className="block text-sm font-normal mt-1">
                          Template "{templateName}" guardado con éxito
                        </span>
                      )}
                    </span>
                  </div>
                  <Button 
                    onClick={handleGoToDashboard} 
                    className="w-full gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Ir al Dashboard
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            className="gap-2"
            disabled={isSaved}
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          {!isSaved && (
            <Button 
              onClick={handleSaveData} 
              className="gap-2"
              disabled={isSaving || (saveAsTemplate && !templateName)}
            >
              {isSaving ? (
                <>Guardando...</>
              ) : (
                <>
                  Finalizar
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
          
          {isSaved && (
            <Button 
              onClick={handleGoToDashboard} 
              className="gap-2"
            >
              Ir al Dashboard
              <Home className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 