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
import { ArrowRight, ArrowLeft, CheckCircle, Database, Home, Calendar, Tag, Clock, FileCheck, Download, FileSpreadsheet, FileText, AlertCircle, AlertTriangle, Filter } from "lucide-react"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"

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
  ],
  // Datos validados y con errores para la nueva tabla
  validationResults: {
    validRecords: 1152,
    invalidRecords: 35,
    validData: [
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
    ],
    invalidData: [
      { 
        id_paciente: "PAC004", 
        nombre: "Ana Gómez", 
        edad: "", 
        tipo_cancer: "Colon", 
        estadio: "IV", 
        fecha_diagnostico: "2023-08-30", 
        hemoglobina: "8.7", 
        leucocitos: "15000",
        errorDetails: [
          { campo: "edad", valor: "", tipoError: "Valor vacío", severidad: "Alta" }
        ]
      },
      { 
        id_paciente: "PAC005", 
        nombre: "Roberto Sánchez", 
        edad: "x", 
        tipo_cancer: "Hígado", 
        estadio: "II", 
        fecha_diagnostico: "2023-04-18", 
        hemoglobina: "abc", 
        leucocitos: "9300",
        errorDetails: [
          { campo: "edad", valor: "x", tipoError: "Formato inválido", severidad: "Alta" },
          { campo: "hemoglobina", valor: "abc", tipoError: "Formato inválido", severidad: "Media" }
        ]
      },
      { 
        id_paciente: "PAC001", 
        nombre: "Martín García", 
        edad: "62", 
        tipo_cancer: "Pulmón", 
        estadio: "II", 
        fecha_diagnostico: "2023-12-05", 
        hemoglobina: "10.3", 
        leucocitos: "200000",
        errorDetails: [
          { campo: "id_paciente", valor: "PAC001", tipoError: "Valor duplicado", severidad: "Alta" },
          { campo: "leucocitos", valor: "200000", tipoError: "Fuera de rango", severidad: "Media" }
        ]
      }
    ]
  }
}

export default function ConfirmacionGuardado() {
  const router = useRouter()
  const [createNewVersion, setCreateNewVersion] = useState(true)
  const [saveAsTemplate, setSaveAsTemplate] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("todos")
  const [overwriteData, setOverwriteData] = useState(false)
  
  // Ir al paso anterior
  const handleBack = () => {
    router.push("/ingesta/mapeo-campos")
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

  // Descargar solo los datos válidos
  const handleDownloadValidData = () => {
    setIsDownloading('valid')
    
    setTimeout(() => {
      toast({
        title: "Datos válidos descargados",
        description: "El archivo con los datos que pasaron la validación ha sido descargado.",
      })
      
      setIsDownloading(null)
    }, 1500)
  }

  // Descargar solo los datos con errores
  const handleDownloadInvalidData = () => {
    setIsDownloading('invalid')
    
    setTimeout(() => {
      toast({
        title: "Datos con errores descargados",
        description: "El archivo con los datos que no pasaron la validación ha sido descargado.",
      })
      
      setIsDownloading(null)
    }, 1500)
  }

  // Descargar reporte completo
  const handleDownloadFullReport = () => {
    setIsDownloading('report')
    
    setTimeout(() => {
      toast({
        title: "Reporte completo descargado",
        description: "El reporte completo de validación ha sido descargado.",
      })
      
      setIsDownloading(null)
    }, 1500)
  }

  // Obtener el color para el tipo de error
  const getErrorBadgeVariant = (errorType: string) => {
    switch(errorType) {
      case "Formato inválido":
        return "destructive"
      case "Valor vacío":
        return "outline"
      case "Fuera de rango":
        return "warning"
      case "Valor duplicado":
        return "secondary"
      default:
        return "secondary"
    }
  }

  // Obtener el icono para el tipo de error
  const getErrorIcon = (errorType: string) => {
    switch(errorType) {
      case "Formato inválido":
        return <AlertCircle className="h-3 w-3" />
      case "Valor vacío": 
        return <AlertCircle className="h-3 w-3" />
      case "Fuera de rango":
        return <AlertTriangle className="h-3 w-3" />
      case "Valor duplicado":
        return <Filter className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  return (
    <div className="py-6">
      <Toaster />
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 6 de 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Confirmación y Guardado</h1>
            <p className="text-muted-foreground">Revisa y confirma los datos antes de guardarlos en la base de datos</p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Panel principal - Resumen y vista previa de datos */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Resumen de Datos</CardTitle>
              <CardDescription>
                Detalles del conjunto de datos que se guardará
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Información general */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Nombre del dataset</Label>
                    <div className="font-medium">
                      {summaryData.datasetName}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Versión</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {createNewVersion ? summaryData.newVersion : summaryData.currentVersion} {createNewVersion && (
                        <Badge variant="outline" className="text-xs">
                          Nueva
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Registros Totales</Label>
                    <div className="font-medium">
                      {summaryData.totalRecords}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Validación</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>{summaryData.validationResults.validRecords} válidos</span>
                      </Badge>
                      {summaryData.validationResults.invalidRecords > 0 && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{summaryData.validationResults.invalidRecords} con errores</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Vista previa de datos */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Vista previa de datos</h3>
                        <p className="text-xs text-muted-foreground">Resultados de validación</p>
                      </div>
                    </div>
                    
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
                          onClick={handleDownloadValidData}
                          disabled={isDownloading !== null}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {isDownloading === 'valid' ? 'Descargando...' : 'Descargar datos válidos'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleDownloadInvalidData}
                          disabled={isDownloading !== null || summaryData.validationResults.invalidRecords === 0}
                          className="flex items-center gap-2"
                        >
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          {isDownloading === 'invalid' ? 'Descargando...' : 'Descargar datos con errores'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleDownloadFullReport}
                          disabled={isDownloading !== null}
                          className="flex items-center gap-2"
                        >
                          <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                          {isDownloading === 'report' ? 'Descargando...' : 'Descargar reporte completo'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <Tabs defaultValue="todos" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="mb-2">
                      <TabsTrigger value="todos">Todos los datos</TabsTrigger>
                      <TabsTrigger value="validos" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Válidos ({summaryData.validationResults.validRecords})
                      </TabsTrigger>
                      <TabsTrigger value="errores" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Con errores ({summaryData.validationResults.invalidRecords})
                      </TabsTrigger>
                    </TabsList>

                    {/* Resto del contenido de las pestañas permanece igual */}
                    <TabsContent value="todos" className="border rounded-md overflow-hidden">
                      <ScrollArea className="h-[350px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(summaryData.dataPreview[0]).map((key) => (
                                <TableHead key={key} className="bg-muted/50">
                                  {key}
                                </TableHead>
                              ))}
                              <TableHead className="bg-muted/50 text-right">Estado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {summaryData.dataPreview.map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value, i) => (
                                  <TableCell key={i}>{value}</TableCell>
                                ))}
                                <TableCell className="text-right">
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Válido
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                            {/* Mostrar algunos datos con errores */}
                            {summaryData.validationResults.invalidData.slice(0, 2).map((row, index) => (
                              <TableRow key={`error-${index}`} className="bg-red-50/30">
                                {Object.entries(row).map(([key, value], i) => {
                                  if (key !== 'errorDetails') {
                                    // Verifica si hay errores para esta columna
                                    const hasError = row.errorDetails && row.errorDetails.some(err => err.campo === key);
                                    
                                    return (
                                      <TableCell key={i} className={hasError ? "text-destructive" : ""}>
                                        {value as string}
                                      </TableCell>
                                    );
                                  }
                                  return null;
                                })}
                                <TableCell className="text-right">
                                  <Badge variant="destructive">
                                    Con errores
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <div className="p-2 text-xs text-muted-foreground border-t">
                        Mostrando 5 de {summaryData.totalRecords} registros
                      </div>
                    </TabsContent>

                    <TabsContent value="validos" className="border rounded-md overflow-hidden">
                      {/* Contenido de pestaña Válidos */}
                      <ScrollArea className="h-[350px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(summaryData.validationResults.validData[0]).map((key) => (
                                <TableHead key={key} className="bg-muted/50">
                                  {key}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {summaryData.validationResults.validData.map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value, i) => (
                                  <TableCell key={i}>{value}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <div className="p-2 text-xs text-muted-foreground border-t">
                        Mostrando 2 de {summaryData.validationResults.validRecords} registros válidos
                      </div>
                    </TabsContent>

                    <TabsContent value="errores" className="border rounded-md overflow-hidden">
                      {/* Contenido de pestaña Errores */}
                      <ScrollArea className="h-[350px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(summaryData.validationResults.invalidData[0])
                                .filter(key => key !== 'errorDetails')
                                .map((key) => (
                                  <TableHead key={key} className="bg-muted/50">
                                    {key}
                                  </TableHead>
                              ))}
                              <TableHead className="bg-muted/50 text-right">Errores</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {summaryData.validationResults.invalidData.map((row, index) => (
                              <TableRow key={index} className="bg-red-50/30">
                                {Object.entries(row).map(([key, value], i) => {
                                  if (key !== 'errorDetails') {
                                    // Verifica si hay errores para esta columna
                                    const hasError = row.errorDetails && row.errorDetails.some(err => err.campo === key);
                                    
                                    return (
                                      <TableCell key={i} className={hasError ? "text-destructive font-medium" : ""}>
                                        {value as string}
                                      </TableCell>
                                    );
                                  }
                                  return null;
                                })}
                                <TableCell className="text-right">
                                  <div className="flex flex-wrap gap-1 justify-end">
                                    {row.errorDetails && row.errorDetails.map((error, errIndex) => (
                                      <Badge 
                                        key={errIndex} 
                                        variant={getErrorBadgeVariant(error.tipoError)} 
                                        className="flex items-center gap-1 text-xs"
                                        title={`Campo: ${error.campo}, Valor: ${error.valor}`}
                                      >
                                        {getErrorIcon(error.tipoError)}
                                        <span>{error.tipoError}</span>
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <div className="p-2 text-xs text-muted-foreground border-t">
                        Mostrando {summaryData.validationResults.invalidData.length} de {summaryData.validationResults.invalidRecords} registros con errores
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Panel lateral - Opciones de guardado y exportación */}
          <div className="space-y-6">
            {/* Estado de la operación */}
            {isSaved ? (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="rounded-full bg-green-100 p-3">
                      <FileCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-green-800">¡Datos guardados!</h2>
                      <p className="text-green-700 mt-1">
                        Los datos han sido guardados correctamente
                        {saveAsTemplate && templateName && (
                          <span className="block font-medium mt-1">
                            Template "{templateName}" guardado con éxito
                          </span>
                        )}
                      </p>
                    </div>
                    <Button 
                      onClick={handleGoToDashboard} 
                      className="w-full gap-2 mt-2"
                    >
                      <Home className="h-4 w-4" />
                      Ir al Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Opciones de Guardado
                  </CardTitle>
                  <CardDescription>
                    Configura cómo se guardarán los datos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="create-version" 
                      checked={createNewVersion}
                      onCheckedChange={(checked) => setCreateNewVersion(!!checked)}
                    />
                    <div className="grid gap-1 leading-none">
                      <Label htmlFor="create-version">
                        Crear nueva versión del dataset
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Versión {summaryData.newVersion} (actual: {summaryData.currentVersion})
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="overwrite-toggle">
                        {overwriteData ? "Sobrescribir datos existentes" : "Agregar a datos existentes"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {overwriteData 
                          ? "Los datos nuevos reemplazarán a los existentes" 
                          : "Los datos nuevos se añadirán a los existentes"}
                      </p>
                    </div>
                    <Switch
                      id="overwrite-toggle"
                      checked={overwriteData}
                      onCheckedChange={setOverwriteData}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="save-template" 
                      checked={saveAsTemplate}
                      onCheckedChange={(checked) => setSaveAsTemplate(!!checked)}
                    />
                    <div className="grid gap-1 leading-none">
                      <Label htmlFor="save-template">
                        Guardar como template
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Para reutilizar en futuras ingestas
                      </p>
                    </div>
                  </div>
                  
                  {saveAsTemplate && (
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
                        className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex-col gap-2">
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
                  
                  <Button 
                    variant="outline"
                    onClick={handleGoToDashboard} 
                    className="w-full gap-2 mt-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 