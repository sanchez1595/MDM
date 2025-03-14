"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { ArrowRight, ArrowLeft, FileUp, Upload, Database, FileText, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Datos de ejemplo para los templates
const savedTemplates = [
  {
    id: "template-1",
    name: "Análisis de Sangre Oncológico",
    description: "Template para datos de análisis de sangre de pacientes oncológicos",
    createdAt: "15/03/2023",
    fields: 14,
    lastUsed: "Hace 2 días",
    fieldDefinitions: [
      { sourceField: "ID_Paciente", internalName: "patient_id", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Fecha_Análisis", internalName: "test_date", dataType: "date", anonymize: false, omit: false },
      { sourceField: "Hemoglobina", internalName: "hemoglobin", dataType: "number", anonymize: false, omit: false, min: 7, max: 18 },
      { sourceField: "Leucocitos", internalName: "leukocytes", dataType: "number", anonymize: false, omit: false, min: 3000, max: 15000 },
      { sourceField: "Plaquetas", internalName: "platelets", dataType: "number", anonymize: false, omit: false, min: 100000, max: 450000 },
      { sourceField: "Neutrófilos", internalName: "neutrophils", dataType: "number", anonymize: false, omit: false, min: 1500, max: 8000 },
      { sourceField: "Linfocitos", internalName: "lymphocytes", dataType: "number", anonymize: false, omit: false, min: 1000, max: 4000 },
      { sourceField: "Monocitos", internalName: "monocytes", dataType: "number", anonymize: false, omit: false, min: 200, max: 800 },
      { sourceField: "Eosinófilos", internalName: "eosinophils", dataType: "number", anonymize: false, omit: false, min: 0, max: 500 },
      { sourceField: "Basófilos", internalName: "basophils", dataType: "number", anonymize: false, omit: false, min: 0, max: 100 },
      { sourceField: "Glucosa", internalName: "glucose", dataType: "number", anonymize: false, omit: false, min: 70, max: 110 },
      { sourceField: "Creatinina", internalName: "creatinine", dataType: "number", anonymize: false, omit: false, min: 0.6, max: 1.2 },
      { sourceField: "Médico", internalName: "doctor_name", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Notas", internalName: "notes", dataType: "string", anonymize: false, omit: false }
    ]
  },
  {
    id: "template-2",
    name: "Biopsias Tumorales",
    description: "Template para resultados de biopsias oncológicas",
    createdAt: "10/02/2023",
    fields: 12,
    lastUsed: "Hace 1 semana",
    fieldDefinitions: [
      { sourceField: "ID_Paciente", internalName: "patient_id", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Fecha_Biopsia", internalName: "biopsy_date", dataType: "date", anonymize: false, omit: false },
      { sourceField: "Tipo_Biopsia", internalName: "biopsy_type", dataType: "string", anonymize: false, omit: false },
      { sourceField: "Localización", internalName: "location", dataType: "string", anonymize: false, omit: false },
      { sourceField: "Tamaño_Muestra", internalName: "sample_size", dataType: "number", anonymize: false, omit: false, min: 0, max: 100 },
      { sourceField: "Diagnóstico", internalName: "diagnosis", dataType: "string", anonymize: false, omit: false },
      { sourceField: "Grado_Tumor", internalName: "tumor_grade", dataType: "string", anonymize: false, omit: false },
      { sourceField: "Invasión_Vascular", internalName: "vascular_invasion", dataType: "boolean", anonymize: false, omit: false },
      { sourceField: "Invasión_Perineural", internalName: "perineural_invasion", dataType: "boolean", anonymize: false, omit: false },
      { sourceField: "Márgenes", internalName: "margins", dataType: "string", anonymize: false, omit: false },
      { sourceField: "Patólogo", internalName: "pathologist", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Observaciones", internalName: "observations", dataType: "string", anonymize: false, omit: false }
    ]
  },
  {
    id: "template-3",
    name: "Marcadores Tumorales",
    description: "Template para datos de marcadores tumorales",
    createdAt: "05/01/2023",
    fields: 11,
    lastUsed: "Hace 3 semanas",
    fieldDefinitions: [
      { sourceField: "ID_Paciente", internalName: "patient_id", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Fecha_Análisis", internalName: "test_date", dataType: "date", anonymize: false, omit: false },
      { sourceField: "CEA", internalName: "cea", dataType: "number", anonymize: false, omit: false, min: 0, max: 5 },
      { sourceField: "AFP", internalName: "afp", dataType: "number", anonymize: false, omit: false, min: 0, max: 10 },
      { sourceField: "CA_19_9", internalName: "ca_19_9", dataType: "number", anonymize: false, omit: false, min: 0, max: 37 },
      { sourceField: "CA_125", internalName: "ca_125", dataType: "number", anonymize: false, omit: false, min: 0, max: 35 },
      { sourceField: "CA_15_3", internalName: "ca_15_3", dataType: "number", anonymize: false, omit: false, min: 0, max: 30 },
      { sourceField: "PSA", internalName: "psa", dataType: "number", anonymize: false, omit: false, min: 0, max: 4 },
      { sourceField: "HCG", internalName: "hcg", dataType: "number", anonymize: false, omit: false, min: 0, max: 5 },
      { sourceField: "Médico", internalName: "doctor_name", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Notas", internalName: "notes", dataType: "string", anonymize: false, omit: false }
    ]
  },
  {
    id: "template-4",
    name: "Signos Vitales Pacientes Oncológicos",
    description: "Template para monitoreo de signos vitales de pacientes oncológicos",
    createdAt: "20/12/2022",
    fields: 12,
    lastUsed: "Hace 1 mes",
    fieldDefinitions: [
      { sourceField: "ID_Paciente", internalName: "patient_id", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Fecha_Registro", internalName: "record_date", dataType: "date", anonymize: false, omit: false },
      { sourceField: "Hora_Registro", internalName: "record_time", dataType: "string", anonymize: false, omit: false },
      { sourceField: "Temperatura", internalName: "temperature", dataType: "number", anonymize: false, omit: false, min: 35, max: 40 },
      { sourceField: "Presión_Sistólica", internalName: "systolic_pressure", dataType: "number", anonymize: false, omit: false, min: 90, max: 180 },
      { sourceField: "Presión_Diastólica", internalName: "diastolic_pressure", dataType: "number", anonymize: false, omit: false, min: 60, max: 110 },
      { sourceField: "Frecuencia_Cardíaca", internalName: "heart_rate", dataType: "number", anonymize: false, omit: false, min: 40, max: 120 },
      { sourceField: "Frecuencia_Respiratoria", internalName: "respiratory_rate", dataType: "number", anonymize: false, omit: false, min: 12, max: 25 },
      { sourceField: "Saturación_Oxígeno", internalName: "oxygen_saturation", dataType: "number", anonymize: false, omit: false, min: 88, max: 100 },
      { sourceField: "Dolor_EVA", internalName: "pain_scale", dataType: "number", anonymize: false, omit: false, min: 0, max: 10 },
      { sourceField: "Enfermero", internalName: "nurse_name", dataType: "string", anonymize: true, omit: false },
      { sourceField: "Observaciones", internalName: "observations", dataType: "string", anonymize: false, omit: false }
    ]
  }
]

export default function IngestaTemplate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isProcessed, setIsProcessed] = useState(false)
  const { toast } = useToast()
  
  // Cargar el template seleccionado
  useEffect(() => {
    if (templateId) {
      const template = savedTemplates.find(t => t.id === templateId)
      if (template) {
        setSelectedTemplate(template)
      } else {
        // Si no se encuentra el template, redirigir a la selección de template
        router.push('/ingesta/seleccion-template')
      }
    } else {
      // Si no hay templateId, redirigir a la selección de template
      router.push('/ingesta/seleccion-template')
    }
  }, [templateId, router])
  
  // Manejar la selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    }
  }
  
  // Procesar los datos
  const handleProcessData = () => {
    if (!fileName) return
    
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulación de procesamiento
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setIsProcessed(true)
          
          toast({
            title: "Procesamiento completado",
            description: "Los datos han sido procesados correctamente con el template seleccionado.",
          })
          
          return 100
        }
        return newProgress
      })
    }, 500)
  }
  
  // Ir al paso anterior
  const handleBack = () => {
    router.push('/ingesta/seleccion-template')
  }
  
  // Ir al siguiente paso
  const handleNext = () => {
    router.push('/ingesta/validacion')
  }
  
  if (!selectedTemplate) {
    return (
      <div className="py-6">
        <div className="flex items-center justify-center h-64">
          <p>Cargando template...</p>
        </div>
      </div>
    )
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
              <BreadcrumbPage>Ingesta con Template</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 2 de 4</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "50%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ingesta de Datos con Template</h1>
          <p className="text-muted-foreground">Carga tus datos utilizando el template seleccionado</p>
        </div>
        
        {/* Información del template */}
        <Card>
          <CardHeader>
            <CardTitle>Template Seleccionado</CardTitle>
            <CardDescription>
              Información del template que se utilizará para procesar los datos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedTemplate.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Campos:</span> {selectedTemplate.fields}
                </div>
                <div>
                  <span className="text-muted-foreground">Creado:</span> {selectedTemplate.createdAt}
                </div>
                <div>
                  <span className="text-muted-foreground">Último uso:</span> {selectedTemplate.lastUsed}
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campo Origen</TableHead>
                      <TableHead>Nombre Interno</TableHead>
                      <TableHead>Tipo de Dato</TableHead>
                      <TableHead>Anonimizar</TableHead>
                      <TableHead>Omitir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTemplate.fieldDefinitions.slice(0, 5).map((field, index) => (
                      <TableRow key={index}>
                        <TableCell>{field.sourceField}</TableCell>
                        <TableCell>{field.internalName}</TableCell>
                        <TableCell>{field.dataType}</TableCell>
                        <TableCell>{field.anonymize ? "Sí" : "No"}</TableCell>
                        <TableCell>{field.omit ? "Sí" : "No"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-xs text-muted-foreground">
                Mostrando 5 de {selectedTemplate.fieldDefinitions.length} campos
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Carga de datos */}
        <Card>
          <CardHeader>
            <CardTitle>Carga de Datos</CardTitle>
            <CardDescription>
              Selecciona la fuente de datos para aplicar el template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="file" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" />
                  <span>Subir Archivo</span>
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center gap-2" disabled>
                  <Database className="h-4 w-4" />
                  <span>Conexión a API</span>
                </TabsTrigger>
                <TabsTrigger value="form" className="flex items-center gap-2" disabled>
                  <FileText className="h-4 w-4" />
                  <span>Formulario Interno</span>
                </TabsTrigger>
              </TabsList>

              {/* Opción: Subir Archivo */}
              <TabsContent value="file">
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Arrastra y suelta tu archivo aquí, o
                      </p>
                      <Label 
                        htmlFor="file-upload" 
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                      >
                        Seleccionar archivo
                      </Label>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".csv,.txt,.xls,.xlsx"
                        onChange={handleFileChange}
                        disabled={isProcessing || isProcessed}
                      />
                      {fileName && (
                        <p className="text-sm font-medium mt-2">
                          Archivo seleccionado: {fileName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Formatos soportados: CSV, TXT, XLS, XLSX
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tamaño máximo: 50MB
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!isProcessed ? (
              <Button 
                onClick={handleProcessData} 
                className="w-full"
                disabled={!fileName || isProcessing}
              >
                {isProcessing ? "Procesando datos..." : "Procesar Datos"}
              </Button>
            ) : (
              <div className="w-full flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-md">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Datos procesados correctamente</span>
              </div>
            )}
            
            {isProcessing && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Procesando datos...</span>
                  <span>{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} className="h-2" />
              </div>
            )}
          </CardFooter>
        </Card>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            className="gap-2"
            disabled={isProcessing}
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button 
            onClick={handleNext} 
            className="gap-2"
            disabled={!isProcessed || isProcessing}
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 