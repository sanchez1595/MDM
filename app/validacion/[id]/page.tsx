"use client"

import { useParams, useRouter } from "next/navigation"
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
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Search,
  Filter
} from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Datos moqueados para la validación
const mockValidationData = {
  "PRO-001": {
    id: "PRO-001",
    templateName: "Plantilla Ventas Q2 2023",
    processDate: "2024-03-14 14:30",
    status: "Completado",
    totalRecords: 12458,
    validatedRecords: 12413,
    errorRecords: 45,
    validationDetails: [
      {
        field: "Monto_Venta",
        totalValidated: 12458,
        passed: 12413,
        failed: 45,
        errorTypes: [
          { type: "Valor negativo", count: 23 },
          { type: "Formato inválido", count: 12 },
          { type: "Fuera de rango", count: 10 }
        ]
      },
      {
        field: "Fecha_Venta",
        totalValidated: 12458,
        passed: 12458,
        failed: 0,
        errorTypes: []
      },
      {
        field: "ID_Cliente",
        totalValidated: 12458,
        passed: 12445,
        failed: 13,
        errorTypes: [
          { type: "No existe", count: 13 }
        ]
      }
    ],
    errorSamples: [
      { row: 145, field: "Monto_Venta", value: "-500", error: "Valor negativo" },
      { row: 267, field: "Monto_Venta", value: "1000,00", error: "Formato inválido" },
      { row: 892, field: "ID_Cliente", value: "CLI-9999", error: "No existe" }
    ]
  },
  // Agregar más datos moqueados para otros IDs si es necesario
}

export default function ValidationPage() {
  const router = useRouter()
  const params = useParams()
  const processId = params.id as string
  const [searchTerm, setSearchTerm] = useState("")
  const [filterField, setFilterField] = useState("all")
  const [activeTab, setActiveTab] = useState("details")
  
  // Obtener datos de validación para el ID específico
  const validationData = mockValidationData[processId] || null

  // Filtrar errores basados en búsqueda y campo seleccionado
  const filteredErrors = validationData?.errorSamples.filter(error => {
    const matchesSearch = 
      error.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.error.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.field.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterField === "all") return matchesSearch
    return matchesSearch && error.field === filterField
  })

  if (!validationData) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <h2 className="text-xl font-semibold">Proceso no encontrado</h2>
              <p className="text-muted-foreground">
                No se encontraron datos de validación para el proceso {processId}
              </p>
              <Button onClick={() => router.back()} variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const successRate = (validationData.validatedRecords / validationData.totalRecords) * 100

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb y botón de retorno */}
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background pb-4 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Validación de Datos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={() => router.back()} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>

      {/* Resumen del Proceso con Barra de Progreso */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detalles del Proceso</CardTitle>
              <CardDescription>
                Información general del proceso de validación
              </CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className={
                validationData.status === "Completado" 
                  ? "bg-green-50 text-green-700 border-green-200"
                  : validationData.status === "Error"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }
            >
              {validationData.status === "Completado" && <CheckCircle2 className="h-3 w-3 mr-1" />}
              {validationData.status === "Error" && <XCircle className="h-3 w-3 mr-1" />}
              {validationData.status === "Advertencia" && <AlertTriangle className="h-3 w-3 mr-1" />}
              {validationData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ID del Proceso</p>
              <p className="font-medium">{validationData.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Plantilla</p>
              <p className="font-medium">{validationData.templateName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Fecha de Proceso</p>
              <p className="font-medium">
                {new Date(validationData.processDate).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Registros</p>
              <p className="font-medium">{validationData.totalRecords.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso de Validación</span>
              <span className="font-medium">{successRate.toFixed(1)}%</span>
            </div>
            <Progress value={successRate} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {validationData.validatedRecords.toLocaleString()} de {validationData.totalRecords.toLocaleString()} registros validados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contenido Principal con Tabs */}
      <Tabs defaultValue="details" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Vista General</TabsTrigger>
          <TabsTrigger value="errors">Errores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          {/* Estadísticas de Validación */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Registros Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {validationData.totalRecords.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total de registros procesados
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-600">
                  Registros Validados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {validationData.validatedRecords.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((validationData.validatedRecords / validationData.totalRecords) * 100).toFixed(1)}% del total
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-600">
                  Registros con Errores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {validationData.errorRecords.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((validationData.errorRecords / validationData.totalRecords) * 100).toFixed(1)}% del total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detalles de Validación por Campo */}
          <Card>
            <CardHeader>
              <CardTitle>Validación por Campo</CardTitle>
              <CardDescription>
                Resultados detallados de la validación por cada campo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campo</TableHead>
                      <TableHead>Total Validados</TableHead>
                      <TableHead>Exitosos</TableHead>
                      <TableHead>Fallidos</TableHead>
                      <TableHead>Tasa de Éxito</TableHead>
                      <TableHead>Tipos de Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validationData.validationDetails.map((detail) => (
                      <TableRow key={detail.field} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{detail.field}</TableCell>
                        <TableCell>{detail.totalValidated.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">
                          {detail.passed.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {detail.failed.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {((detail.passed / detail.totalValidated) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {detail.errorTypes.map((error, index) => (
                              <Badge key={index} variant="secondary" className="animate-in fade-in">
                                {error.type} ({error.count})
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          {/* Filtros y Búsqueda */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar en errores..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="w-full md:w-[200px]">
                  <Select value={filterField} onValueChange={setFilterField}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filtrar por campo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los campos</SelectItem>
                      {validationData.validationDetails.map((detail) => (
                        <SelectItem key={detail.field} value={detail.field}>
                          {detail.field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Errores */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ejemplos de Errores</CardTitle>
                  <CardDescription>
                    {filteredErrors?.length} errores encontrados
                  </CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Errores
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fila</TableHead>
                      <TableHead>Campo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredErrors?.map((error, index) => (
                      <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                        <TableCell>{error.row}</TableCell>
                        <TableCell>{error.field}</TableCell>
                        <TableCell>
                          <code className="px-2 py-1 bg-muted rounded-md">
                            {error.value}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="animate-in fade-in">
                            {error.error}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 