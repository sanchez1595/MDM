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
  Calculator
} from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

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
    name: "Ventas Q2 2023",
    date: "Hoy, 14:30",
    status: "Completado",
    records: "12,458",
    hasCalculations: true,
  },
  {
    id: "PRO-002",
    name: "Inventario Mensual",
    date: "Hoy, 10:15",
    status: "Completado",
    records: "5,234",
    hasCalculations: false,
  },
  {
    id: "PRO-003",
    name: "Datos Clientes",
    date: "Ayer, 18:45",
    status: "Error",
    records: "0",
    hasCalculations: false,
  },
  {
    id: "PRO-004",
    name: "Métricas Marketing",
    date: "Ayer, 12:30",
    status: "Advertencia",
    records: "8,721",
    hasCalculations: true,
  },
  {
    id: "PRO-005",
    name: "Recursos Humanos",
    date: "15/03/2023",
    status: "Completado",
    records: "342",
    hasCalculations: false,
  },
]

export default function Page() {
  const router = useRouter()
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
      const records = parseInt(process?.records.replace(',', '') || '0')
      
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
      
      {/* Métricas */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <p className="text-xs mt-1 text-primary">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
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
            <Button variant="outline" size="sm" className="gap-2">
              <FileUp className="h-4 w-4" />
              Ver Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre Dataset</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Registros</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.id}</TableCell>
                  <TableCell>{process.name}</TableCell>
                  <TableCell>{process.date}</TableCell>
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
                    {process.status === "Advertencia" && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Advertencia
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{process.records}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Menú de descarga */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            disabled={process.status === "Error" || processingAction?.id === process.id}
                          >
                            {processingAction?.id === process.id && (processingAction?.action === 'csv' || processingAction?.action === 'excel') ? (
                              <span className="h-4 w-4 animate-spin">...</span>
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleDownloadCSV(process.id)}
                            disabled={processingAction !== null}
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {processingAction?.id === process.id && processingAction?.action === 'csv' 
                              ? 'Descargando CSV...' 
                              : 'Descargar como CSV'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDownloadExcel(process.id)}
                            disabled={processingAction !== null}
                            className="flex items-center gap-2"
                          >
                            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                            {processingAction?.id === process.id && processingAction?.action === 'excel' 
                              ? 'Descargando Excel...' 
                              : 'Descargar como Excel'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      {/* Botón de cálculos */}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCalculate(process.id)}
                        disabled={process.status === "Error" || processingAction !== null}
                        title="Realizar cálculos"
                      >
                        {processingAction?.id === process.id && processingAction?.action === 'calculate' ? (
                          <span className="h-4 w-4 animate-spin">...</span>
                        ) : (
                          <Calculator className="h-4 w-4" />
                        )}
                      </Button>
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
                        Cálculos para {process?.name} ({processId})
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
  )
}
