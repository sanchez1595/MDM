"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Database, 
  FileUp, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Plus,
  Download,
  FileSpreadsheet,
  FileText,
  Calculator,
  Eye,
  Users,
  BarChart,
  LineChart,
  PieChart,
  Info,
  Loader2,
  MoreHorizontal
} from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Datos de ejemplo
const metrics = [
  {
    title: "Total Datasets",
    value: "24",
    description: "Datasets activos",
    icon: Database,
    change: "+2 este mes",
  },
  {
    title: "Errores Recientes",
    value: "3",
    description: "En las últimas 24h",
    icon: AlertCircle,
    change: "-1 vs ayer",
  },
  {
    title: "Último Ingreso",
    value: "Hace 2h",
    description: "Dataset: Ventas Q2",
    icon: Clock,
    change: "Completado",
  },
  {
    title: "Tasa de Éxito",
    value: "94%",
    description: "Ingestas exitosas",
    icon: BarChart3,
    change: "+2% vs mes anterior",
  },
]

const recentProcesses = [
  {
    id: "PRO-001",
    templateName: "Plantilla Ventas Q2 2023",
    processDate: "2024-03-14 14:30",
    errorRecords: 45,
    validatedRecords: 12413,
    status: "Completado",
    totalRecords: "12,458",
    validated: true
  },
  {
    id: "PRO-002",
    templateName: "Plantilla Inventario Mensual",
    processDate: "2024-03-14 10:15",
    errorRecords: 12,
    validatedRecords: 5222,
    status: "Completado",
    totalRecords: "5,234",
    validated: true
  },
  {
    id: "PRO-003",
    templateName: "Plantilla Datos Clientes",
    processDate: "2024-03-13 18:45",
    errorRecords: 1250,
    validatedRecords: 0,
    status: "Error",
    totalRecords: "1,250",
    validated: false
  },
  {
    id: "PRO-004",
    templateName: "Plantilla Métricas Marketing",
    processDate: "2024-03-13 12:30",
    errorRecords: 156,
    validatedRecords: 8565,
    status: "Completado",
    totalRecords: "8,721",
    validated: false
  },
  {
    id: "PRO-005",
    templateName: "Plantilla Recursos Humanos",
    processDate: "2024-03-13 09:30",
    errorRecords: 0,
    validatedRecords: 342,
    status: "Completado",
    totalRecords: "342",
    validated: false
  },
  {
    id: "PRO-006",
    templateName: "Plantilla Datos Financieros",
    processDate: "2024-03-15 08:15",
    errorRecords: 0,
    validatedRecords: 0,
    status: "En procesamiento",
    totalRecords: "4,752",
    validated: false
  },
]

// Datos de ejemplo para KPIs Internos
const internalKPIs = [
  {
    title: "Tasa de Errores",
    value: "4.8%",
    description: "Errores detectados vs total registros",
    icon: AlertCircle,
    change: "-0.7% vs mes anterior",
    target: "≤ 5%",
    status: "warning",
    details: "12,458 registros procesados, 598 con errores",
    tooltip: "Porcentaje de registros que contienen errores respecto al total.\nFórmula: (Errores detectados / Total de registros) × 100\nEjemplo: 598 errores / 12,458 registros = 4.8%"
  },
  {
    title: "Tiempo de Procesamiento",
    value: "8.2m",
    description: "Promedio por lote (carga a validación)",
    icon: Clock,
    change: "-1.3m vs mes anterior",
    target: "≤ 10m",
    status: "success",
    details: "Rango: 5.4m - 12.8m",
    tooltip: "Tiempo promedio que toma procesar un lote desde la carga hasta la validación.\nFórmula: Suma de tiempos / Número de lotes\nEjemplo: 328m / 40 lotes = 8.2m por lote"
  },
  {
    title: "Tasa de Reprocesos",
    value: "7.5%",
    description: "Lotes que requieren reprocesamiento",
    icon: BarChart3,
    change: "-2.5% vs mes anterior",
    target: "≤ 10%",
    status: "success",
    details: "3 de 40 lotes reprocesados",
    tooltip: "Porcentaje de lotes que necesitan ser procesados nuevamente.\nFórmula: (Lotes reprocesados / Total de lotes) × 100\nEjemplo: 3 reprocesos / 40 lotes = 7.5%"
  },
  {
    title: "Registros Entregados",
    value: "96.8%",
    description: "Registros procesados vs recibidos",
    icon: Database,
    change: "+1.2% vs mes anterior",
    target: "≥ 95%",
    status: "success",
    details: "11,860 de 12,458 registros",
    tooltip: "Porcentaje de registros que fueron procesados exitosamente.\nFórmula: (Registros entregados / Registros recibidos) × 100\nEjemplo: 11,860 / 12,458 = 96.8%"
  },
  {
    title: "Cobertura Validaciones",
    value: "92.5%",
    description: "Reglas aplicadas automáticamente",
    icon: CheckCircle2,
    change: "+2.5% vs mes anterior",
    target: "≥ 90%",
    status: "success",
    details: "37 de 40 reglas implementadas",
    tooltip: "Porcentaje de reglas de validación implementadas.\nFórmula: (Reglas implementadas / Total de reglas posibles) × 100\nEjemplo: 37 reglas / 40 posibles = 92.5%"
  }
]

// Datos de ejemplo para KPIs del Cliente
const clientKPIs = [
  {
    title: "Volumen Mensual",
    value: "23,400",
    description: "Registros procesados este mes",
    icon: BarChart,
    change: "+15% vs mes anterior",
    tooltip: "Total de registros procesados durante el mes actual.\nSe calcula sumando todos los registros de los lotes procesados.\nEjemplo: Suma de registros de 40 lotes = 23,400"
  },
  {
    title: "Tiempo de Entrega",
    value: "6h",
    description: "Promedio de entrega",
    icon: Clock,
    change: "Dentro del SLA",
    tooltip: "Tiempo promedio desde la recepción hasta la entrega final.\nFórmula: Suma de tiempos de entrega / Número de entregas\nEjemplo: 240h / 40 entregas = 6h"
  },
  {
    title: "Frecuencia",
    value: "48h",
    description: "Actualización de datos",
    icon: LineChart,
    change: "Según lo acordado",
    tooltip: "Intervalo de tiempo entre actualizaciones de datos.\nSe mide como el tiempo entre entregas consecutivas.\nEjemplo: Entrega cada 48 horas según SLA"
  },
  {
    title: "Confiabilidad",
    value: "99%",
    description: "Entregas sin incidencias",
    icon: CheckCircle2,
    change: "+1% vs mes anterior",
    tooltip: "Porcentaje de entregas realizadas sin problemas técnicos.\nFórmula: (Entregas exitosas / Total entregas) × 100\nEjemplo: 39 exitosas / 40 totales = 99%"
  }
]

// Datos de ejemplo para KPIs del Equipo
const teamKPIs = [
  {
    title: "Errores en Origen",
    value: "2.8%",
    description: "Tasa de error en datos recibidos",
    icon: AlertTriangle,
    change: "-0.3% vs mes anterior",
    target: "≤ 3%",
    status: "success",
    tooltip: "Porcentaje de errores detectados en los datos de origen.\nFórmula: (Registros con errores / Total registros recibidos) × 100\nEjemplo: 658 errores / 23,400 registros = 2.8%"
  },
  {
    title: "Tiempo de Entrega",
    value: "24h",
    description: "Desde solicitud a entrega",
    icon: Clock,
    change: "+2h vs mes anterior",
    target: "≤ 24h",
    status: "warning",
    tooltip: "Tiempo que toma entregar los datos desde la solicitud.\nFórmula: Promedio de (Hora entrega - Hora solicitud)\nEjemplo: 960h / 40 entregas = 24h"
  },
  {
    title: "Entregas Incompletas",
    value: "7.5%",
    description: "Lotes que requieren reproceso",
    icon: XCircle,
    change: "-1.5% vs mes anterior",
    target: "≤ 10%",
    status: "success",
    tooltip: "Porcentaje de entregas que no incluyen todos los datos.\nFórmula: (Entregas incompletas / Total entregas) × 100\nEjemplo: 3 incompletas / 40 entregas = 7.5%"
  },
  {
    title: "Estructura Correcta",
    value: "96.2%",
    description: "Cumplimiento de formato",
    icon: CheckCircle2,
    change: "+0.4% vs mes anterior",
    target: "≥ 95%",
    status: "success",
    tooltip: "Porcentaje de registros que cumplen con el formato requerido.\nFórmula: (Registros válidos / Total registros) × 100\nEjemplo: 22,511 válidos / 23,400 total = 96.2%"
  }
]

// Datos de ejemplo para el tracking de errores
const errorTrackingData = [
  { type: "Campos Vacíos", count: 245, percentage: 41 },
  { type: "Formato Inválido", count: 156, percentage: 26 },
  { type: "Datos Duplicados", count: 98, percentage: 16 },
  { type: "Fuera de Rango", count: 67, percentage: 11 },
  { type: "Inconsistencia", count: 32, percentage: 6 }
]

// Datos de ejemplo para la cobertura de validaciones por dataset (basado en diccionarios de validación)
const validationCoverageData = [
  { 
    datasetId: "PRO-001",
    datasetName: "Ventas Q2 2023",
    field: "Datos Personales", 
    coverage: 98, 
    rules: "15/15",
    columnCount: 8,
    validationDictionary: "dic_personal_data",
    implementedRules: [
      "Formato de identificación",
      "Validación de nombres",
      "Formato de fecha"
    ],
    pendingRules: []
  },
  { 
    datasetId: "PRO-001",
    datasetName: "Ventas Q2 2023",
    field: "Datos Clínicos", 
    coverage: 95, 
    rules: "19/20",
    columnCount: 12,
    validationDictionary: "dic_clinical_data",
    implementedRules: [
      "Rango de valores",
      "Formato de resultados"
    ],
    pendingRules: ["Validación histórica"]
  },
  { 
    datasetId: "PRO-002",
    datasetName: "Inventario Mensual",
    field: "Resultados Lab.", 
    coverage: 90, 
    rules: "18/20",
    columnCount: 15,
    validationDictionary: "dic_lab_results",
    implementedRules: [
      "Rango normal",
      "Unidades estándar"
    ],
    pendingRules: ["Validación delta"]
  },
  { 
    datasetId: "PRO-002",
    datasetName: "Inventario Mensual",
    field: "Medicamentos", 
    coverage: 87, 
    rules: "13/15",
    columnCount: 6,
    validationDictionary: "dic_medications",
    implementedRules: [
      "Código válido",
      "Dosis permitida"
    ],
    pendingRules: ["Interacciones"]
  },
  { 
    datasetId: "PRO-004",
    datasetName: "Métricas Marketing",
    field: "Diagnósticos", 
    coverage: 92, 
    rules: "11/12",
    columnCount: 5,
    validationDictionary: "dic_diagnostics",
    implementedRules: [
      "Código CIE-10",
      "Validación cruzada"
    ],
    pendingRules: ["Validación contextual"]
  }
]

export default function Page() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("internal")
  const { toast } = useToast()
  const [processingAction, setProcessingAction] = useState<{id: string, action: string} | null>(null)
  const [calculationResults, setCalculationResults] = useState<{[key: string]: any}>({})
  
  // Función para descargar CSV
  const handleDownloadCSV = (processId: string) => {
    setProcessingAction({id: processId, action: 'csv'})
    
    // Simulación de descarga
    setTimeout(() => {
      toast({
        title: "CSV descargado",
        description: `El archivo CSV del proceso ${processId} ha sido descargado correctamente.`,
      })
      setProcessingAction(null)
    }, 1000)
  }
  
  // Función para descargar Excel
  const handleDownloadExcel = (processId: string) => {
    setProcessingAction({id: processId, action: 'excel'})
    
    // Simulación de descarga
    setTimeout(() => {
      toast({
        title: "Excel descargado",
        description: `El archivo Excel del proceso ${processId} ha sido descargado correctamente.`,
      })
      setProcessingAction(null)
    }, 1500)
  }
  
  // Función para realizar cálculos
  const handleCalculate = (processId: string) => {
    setProcessingAction({id: processId, action: 'calculate'})
    
    // Simulación de cálculos
    setTimeout(() => {
      // Generar resultados de ejemplo basados en el ID del proceso
      const process = recentProcesses.find(p => p.id === processId)
      const records = parseInt(process?.totalRecords.replace(',', '') || '0')
      
      const newResults = {
        ...calculationResults,
        [processId]: {
          promedio: (records / 100).toFixed(2),
          maximo: (records * 1.5).toFixed(0),
          minimo: (records * 0.1).toFixed(0),
          tendencia: Math.random() > 0.5 ? 'Positiva' : 'Negativa',
          timestamp: new Date().toLocaleString()
        }
      }
      
      setCalculationResults(newResults)
      toast({
        title: "Cálculos completados",
        description: `Se han realizado los cálculos para el proceso ${processId}.`,
      })
      setProcessingAction(null)
    }, 2000)
  }
  
  return (
    <TooltipProvider delayDuration={0}>
    <div className="py-6">
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="gap-2" onClick={() => router.push("/ingesta/seleccion-template")}>
          <Plus className="h-4 w-4" />
          Ingestar Nuevo Dataset
        </Button>
      </div>
      
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-end mb-6">
              <TabsList>
                <TabsTrigger value="internal" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  KPIs Internos
                </TabsTrigger>
                <TabsTrigger value="client" className="gap-2">
                  <Users className="h-4 w-4" />
                  KPIs Cliente
                </TabsTrigger>
                <TabsTrigger value="team" className="gap-2">
                  <PieChart className="h-4 w-4" />
                  KPIs Equipo
                </TabsTrigger>
              </TabsList>
            </div>

            {/* KPIs Internos */}
            <TabsContent value="internal" className="space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {internalKPIs.map((kpi, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:bg-muted p-1 rounded-md cursor-help transition-colors">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            sideOffset={5}
                            className="max-w-[300px] p-3 text-sm bg-white shadow-lg rounded-lg border"
                          >
                            <div className="space-y-2">
                              <p className="font-medium text-sm">{kpi.title}</p>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>{kpi.tooltip.split('\n')[0]}</p>
                                <p className="font-medium text-primary">Fórmula:</p>
                                <p className="font-mono bg-muted p-1 rounded">
                                  {kpi.tooltip.split('\n')[1].replace('Fórmula: ', '')}
                                </p>
                                <p className="font-medium text-primary mt-2">Ejemplo:</p>
                                <p>{kpi.tooltip.split('\n')[2].replace('Ejemplo: ', '')}</p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <kpi.icon className={`h-4 w-4 ${
                        kpi.status === "success" ? "text-green-500" :
                        kpi.status === "warning" ? "text-yellow-500" :
                        "text-red-500"
                      }`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <p className="text-xs text-muted-foreground">{kpi.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-primary">{kpi.change}</p>
                        <Badge variant="outline" className={`text-xs ${
                          kpi.status === "success" ? "bg-green-50 text-green-700 border-green-200" :
                          kpi.status === "warning" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          Meta: {kpi.target}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                        {kpi.details}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* KPIs Cliente */}
            <TabsContent value="client" className="space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                {clientKPIs.map((kpi, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:bg-muted p-1 rounded-md cursor-help transition-colors">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            sideOffset={5}
                            className="max-w-[300px] p-3 text-sm bg-white shadow-lg rounded-lg border"
                          >
                            <div className="space-y-2">
                              <p className="font-medium text-sm">{kpi.title}</p>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>{kpi.tooltip.split('\n')[0]}</p>
                                <p className="font-medium text-primary">Fórmula:</p>
                                <p className="font-mono bg-muted p-1 rounded">
                                  {kpi.tooltip.split('\n')[1].replace('Fórmula: ', '')}
                                </p>
                                <p className="font-medium text-primary mt-2">Ejemplo:</p>
                                <p>{kpi.tooltip.split('\n')[2].replace('Ejemplo: ', '')}</p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <kpi.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <p className="text-xs text-muted-foreground">{kpi.description}</p>
                      <p className="text-xs mt-2 text-primary">{kpi.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Gráfico de tendencia para cliente */}
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Entregas</CardTitle>
                  <CardDescription>Últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {[85, 92, 89, 94, 90, 95].map((value, index) => (
                      <div key={index} className="relative h-full w-full">
                        <div 
                          className="absolute bottom-0 w-full bg-primary/10 rounded-sm transition-all hover:bg-primary/20"
                          style={{ height: `${value}%` }}
                        >
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dic</span>
                    <span>Ene</span>
                    <span>Feb</span>
                    <span>Mar</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* KPIs Equipo */}
            <TabsContent value="team" className="space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                {teamKPIs.map((kpi, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:bg-muted p-1 rounded-md cursor-help transition-colors">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            sideOffset={5}
                            className="max-w-[300px] p-3 text-sm bg-white shadow-lg rounded-lg border"
                          >
                            <div className="space-y-2">
                              <p className="font-medium text-sm">{kpi.title}</p>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>{kpi.tooltip.split('\n')[0]}</p>
                                <p className="font-medium text-primary">Fórmula:</p>
                                <p className="font-mono bg-muted p-1 rounded">
                                  {kpi.tooltip.split('\n')[1].replace('Fórmula: ', '')}
                                </p>
                                <p className="font-medium text-primary mt-2">Ejemplo:</p>
                                <p>{kpi.tooltip.split('\n')[2].replace('Ejemplo: ', '')}</p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <kpi.icon className={`h-4 w-4 ${
                        kpi.status === "success" ? "text-green-500" :
                        kpi.status === "warning" ? "text-yellow-500" :
                        "text-muted-foreground"
                      }`} />
            </CardHeader>
            <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <p className="text-xs text-muted-foreground">{kpi.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-primary">{kpi.change}</p>
                        <Badge variant="outline" className={`text-xs ${
                          kpi.status === "success" ? "bg-green-50 text-green-700 border-green-200" :
                          kpi.status === "warning" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          ""
                        }`}>
                          Meta: {kpi.target}
                        </Badge>
                      </div>
            </CardContent>
          </Card>
        ))}
      </div>

              {/* Tabla de errores recurrentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Errores Recurrentes</CardTitle>
                  <CardDescription>Top errores por frecuencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo de Error</TableHead>
                        <TableHead>Frecuencia</TableHead>
                        <TableHead>Impacto</TableHead>
                        <TableHead>Tendencia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { type: "Campos Incompletos", frequency: "32%", impact: "Alto", trend: "↑" },
                        { type: "Formato Incorrecto", frequency: "28%", impact: "Medio", trend: "↓" },
                        { type: "Datos Duplicados", frequency: "15%", impact: "Bajo", trend: "→" },
                        { type: "Valores Inválidos", frequency: "25%", impact: "Alto", trend: "↑" }
                      ].map((error, index) => (
                        <TableRow key={index}>
                          <TableCell>{error.type}</TableCell>
                          <TableCell>{error.frequency}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              error.impact === "Alto" ? "bg-red-50 text-red-700 border-red-200" :
                              error.impact === "Medio" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                              "bg-green-50 text-green-700 border-green-200"
                            }>
                              {error.impact}
                            </Badge>
                          </TableCell>
                          <TableCell>{error.trend}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
      
      {/* Procesos Recientes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Procesos Recientes</CardTitle>
              <CardDescription>
                Últimos 5 procesos de ingesta de datos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre Plantilla</TableHead>
                <TableHead>Fecha Procesamiento</TableHead>
                <TableHead>Registros con Errores</TableHead>
                <TableHead>Registros Validados</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.id}</TableCell>
                  <TableCell>{process.templateName}</TableCell>
                  <TableCell>{new Date(process.processDate).toLocaleString()}</TableCell>
                  <TableCell className="text-red-600 font-medium">{process.errorRecords.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-medium">{process.validatedRecords.toLocaleString()}</TableCell>
                  <TableCell>
                    {process.status === "Completado" && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completado
                      </Badge>
                    )}
                    {process.status === "Error" && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <XCircle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    )}
                    {process.status === "En procesamiento" && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        En procesamiento
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {/* Procesando */}
                      {process.status === "En procesamiento" && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1.5 px-3 py-1 w-full justify-center">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Procesando datos</span>
                        </Badge>
                      )}
                      
                      {/* Error - Solo botón de reprocesar hacia Selección de Fuente */}
                      {process.status === "Error" && (
                        <div className="w-full flex justify-center">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/ingesta/seleccion-fuente`)}
                            className="text-xs h-8 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 w-[220px]"
                          >
                            <FileUp className="h-3.5 w-3.5 mr-1.5" />
                            <span>Reprocesar Datos</span>
                          </Button>
                        </div>
                      )}
                      
                      {/* Completado pero no validado - Solo botón de finalizar proceso */}
                      {process.status === "Completado" && !process.validated && (
                        <div className="w-full flex justify-center">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => router.push(`/ingesta/confirmacion`)}
                            className="text-xs h-8 w-[220px]"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                            <span>Finalizar Proceso</span>
                          </Button>
                        </div>
                      )}
                      
                      {/* Completado y validado - Ver detalles y Reprocesar hacia ingesta-template */}
                      {process.status === "Completado" && process.validated && (
                        <div className="flex gap-1.5 w-[220px] justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/proceso/${process.id}`)}
                            className="text-xs h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 flex-1"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                            <span>Ver Detalles</span>
                          </Button>
                          
                      <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/ingesta/ingesta-template?template=template-1`)}
                            className="text-xs h-8 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 flex-1"
                          >
                            <FileUp className="h-3.5 w-3.5 mr-1.5" />
                            <span>Reprocesar</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Resultados de cálculos */}
          {Object.keys(calculationResults).length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Resultados de Cálculos</h3>
              {Object.entries(calculationResults).map(([processId, results]) => {
                const process = recentProcesses.find(p => p.id === processId);
                return (
                  <Card key={processId} className="bg-muted/30">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">
                        Cálculos para {process?.templateName} ({processId})
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Generado: {results.timestamp}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Promedio</p>
                          <p className="font-medium">{results.promedio}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Máximo</p>
                          <p className="font-medium">{results.maximo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Mínimo</p>
                          <p className="font-medium">{results.minimo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tendencia</p>
                          <p className={`font-medium ${results.tendencia === 'Positiva' ? 'text-green-600' : 'text-red-600'}`}>
                            {results.tendencia}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
      </div>
    </TooltipProvider>
  )
}
