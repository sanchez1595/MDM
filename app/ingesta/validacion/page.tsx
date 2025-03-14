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
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle, XCircle, AlertTriangle, Edit, ChevronLeft, ChevronRight, Search, Wand2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Datos de ejemplo para la validación
const validationSummary = {
  totalRows: 1250,
  processedRows: 1250,
  validRows: 1187,
  rowsWithErrors: 48,
  rowsWithWarnings: 15,
  criticalErrors: 12,
  warningCount: 23,
  errorsByType: [
    { type: "Formato inválido", count: 18, critical: true },
    { type: "Fuera de rango", count: 15, critical: true },
    { type: "Valor duplicado", count: 8, critical: false },
    { type: "Valor vacío", count: 7, critical: false },
    { type: "Inconsistencia", count: 5, critical: false },
  ]
}

// Datos de ejemplo para los errores
const validationErrors = [
  { id: 1, row: 23, column: "Edad", value: "150", type: "Fuera de rango", message: "La edad está fuera del rango permitido (0-120)", critical: true },
  { id: 2, row: 45, column: "Estadio", value: "X", type: "Formato inválido", message: "El estadio debe ser un valor entre 0-IV", critical: true },
  { id: 3, row: 67, column: "ID Paciente", value: "PAC001", type: "Valor duplicado", message: "Este ID de paciente ya existe en el sistema", critical: false },
  { id: 4, row: 89, column: "Nombre", value: "", type: "Valor vacío", message: "El nombre del paciente es obligatorio", critical: true },
  { id: 5, row: 112, column: "Tipo de Cáncer", value: "Desconocido", type: "Inconsistencia", message: "El tipo de cáncer no está en la lista de tipos permitidos", critical: false },
  { id: 6, row: 134, column: "Leucocitos", value: "250000", type: "Fuera de rango", message: "El valor está fuera del rango permitido (3000-15000)", critical: true },
  { id: 7, row: 156, column: "Hemoglobina", value: "-10", type: "Fuera de rango", message: "El valor debe ser mayor a 0", critical: true },
  { id: 8, row: 178, column: "ID Paciente", value: "PAC002", type: "Valor duplicado", message: "Este ID de paciente ya existe en el sistema", critical: false },
  { id: 9, row: 201, column: "Fecha Diagnóstico", value: "2023-13-45", type: "Formato inválido", message: "Formato de fecha inválido", critical: true },
  { id: 10, row: 223, column: "Email", value: "paciente@", type: "Formato inválido", message: "Formato de email inválido", critical: true },
  { id: 11, row: 245, column: "Teléfono", value: "123", type: "Formato inválido", message: "El número de teléfono debe tener al menos 7 dígitos", critical: false },
  { id: 12, row: 267, column: "Dirección", value: "", type: "Valor vacío", message: "La dirección es recomendada", critical: false },
]

// Datos de ejemplo para la corrección en línea
const sampleRowData = {
  "ID Paciente": "PAC001",
  "Nombre": "Juan Pérez",
  "Edad": "65",
  "Tipo de Cáncer": "Pulmón",
  "Estadio": "III",
  "Fecha Diagnóstico": "2023-10-15",
  "Hemoglobina": "9.5",
  "Leucocitos": "12000"
}

export default function ValidacionDatos() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingError, setEditingError] = useState<any>(null)
  const [editedValue, setEditedValue] = useState("")
  const [validationSummaryState, setValidationSummaryState] = useState(validationSummary)
  const [validationErrorsState, setValidationErrorsState] = useState(validationErrors)
  const [isFixingAll, setIsFixingAll] = useState(false)
  
  // Filtrar errores según el tipo y búsqueda
  const filteredErrors = validationErrorsState.filter(error => {
    const matchesType = filterType === "all" || 
                        (filterType === "critical" && error.critical) ||
                        (filterType === "warning" && !error.critical) ||
                        filterType === error.type
    
    const matchesSearch = searchQuery === "" ||
                          error.column.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          error.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          error.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesType && matchesSearch
  })
  
  // Calcular paginación
  const totalPages = Math.ceil(filteredErrors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedErrors = filteredErrors.slice(startIndex, startIndex + itemsPerPage)
  
  // Ir al paso anterior
  const handleBack = () => {
    router.push("/ingesta/mapeo-campos")
  }

  // Ir al siguiente paso
  const handleNext = () => {
    router.push("/ingesta/confirmacion")
  }
  
  // Abrir diálogo de edición
  const handleEditError = (error: any) => {
    setEditingError(error)
    setEditedValue(error.value)
  }
  
  // Guardar corrección
  const handleSaveCorrection = () => {
    // Aquí se implementaría la lógica para guardar la corrección
    // Por ahora solo cerramos el diálogo
    setEditingError(null)
  }
  
  // Calcular el porcentaje de filas válidas
  const validPercentage = Math.round((validationSummaryState.validRows / validationSummaryState.totalRows) * 100)
  
  // Determinar si hay errores críticos que impiden continuar
  const hasCriticalErrors = validationSummaryState.criticalErrors > 0

  // Marcar todos los errores como corregidos (para demo)
  const handleFixAllErrors = () => {
    setIsFixingAll(true)
    
    // Simulación de corrección automática
    setTimeout(() => {
      // Actualizar el resumen de validación
      setValidationSummaryState({
        ...validationSummaryState,
        validRows: validationSummaryState.totalRows,
        rowsWithErrors: 0,
        rowsWithWarnings: 0,
        criticalErrors: 0,
        warningCount: 0,
        errorsByType: validationSummaryState.errorsByType.map(et => ({ ...et, count: 0 }))
      })
      
      // Limpiar la lista de errores
      setValidationErrorsState([])
      
      setIsFixingAll(false)
    }, 1500)
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
              <BreadcrumbPage>Validación de Datos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 5 de 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "83.3%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Validación de Datos</h1>
            <p className="text-muted-foreground">Revisa y corrige los errores encontrados durante la validación</p>
          </div>
          
          {/* Botón para corregir todos los errores (solo para demo) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="gap-2 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                  onClick={handleFixAllErrors}
                  disabled={isFixingAll || validationErrorsState.length === 0}
                >
                  {isFixingAll ? (
                    <>Corrigiendo errores...</>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Corregir todos los errores
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modo demo: Marca todos los errores como corregidos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Resumen de validación */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Resumen de Validación</CardTitle>
              <CardDescription>
                Resultados del proceso de validación de datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Filas válidas: {validationSummaryState.validRows} de {validationSummaryState.totalRows}</span>
                    <span>{validPercentage}%</span>
                  </div>
                  <Progress value={validPercentage} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-2xl font-bold">{validationSummaryState.totalRows}</span>
                    <span className="text-xs text-muted-foreground">Total de filas</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-green-50 text-green-700 rounded-lg">
                    <span className="text-2xl font-bold">{validationSummaryState.validRows}</span>
                    <span className="text-xs">Filas válidas</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-red-50 text-red-700 rounded-lg">
                    <span className="text-2xl font-bold">{validationSummaryState.rowsWithErrors}</span>
                    <span className="text-xs">Filas con errores</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-amber-50 text-amber-700 rounded-lg">
                    <span className="text-2xl font-bold">{validationSummaryState.rowsWithWarnings}</span>
                    <span className="text-xs">Filas con advertencias</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-red-50 text-red-700 rounded-lg">
                    <span className="text-2xl font-bold">{validationSummaryState.criticalErrors}</span>
                    <span className="text-xs">Errores críticos</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-amber-50 text-amber-700 rounded-lg">
                    <span className="text-2xl font-bold">{validationSummaryState.warningCount}</span>
                    <span className="text-xs">Advertencias</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Tipos de Errores</CardTitle>
              <CardDescription>
                Distribución por tipo de error
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {validationSummaryState.errorsByType.map((errorType, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {errorType.critical ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-sm">{errorType.type}</span>
                    </div>
                    <Badge variant={errorType.critical ? "destructive" : "outline"} className="ml-auto">
                      {errorType.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabla de errores */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Detalle de Errores</CardTitle>
                <CardDescription>
                  Lista de errores encontrados durante la validación
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar errores..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los errores</SelectItem>
                    <SelectItem value="critical">Errores críticos</SelectItem>
                    <SelectItem value="warning">Advertencias</SelectItem>
                    <SelectItem value="Formato inválido">Formato inválido</SelectItem>
                    <SelectItem value="Fuera de rango">Fuera de rango</SelectItem>
                    <SelectItem value="Valor duplicado">Valor duplicado</SelectItem>
                    <SelectItem value="Valor vacío">Valor vacío</SelectItem>
                    <SelectItem value="Inconsistencia">Inconsistencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Fila</TableHead>
                    <TableHead className="w-[120px]">Columna</TableHead>
                    <TableHead className="w-[120px]">Valor</TableHead>
                    <TableHead className="w-[150px]">Tipo de Error</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead className="w-[100px] text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedErrors.length > 0 ? (
                    paginatedErrors.map((error) => (
                      <TableRow key={error.id}>
                        <TableCell>{error.row}</TableCell>
                        <TableCell>{error.column}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {error.value === "" ? <span className="text-muted-foreground italic">(vacío)</span> : error.value}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {error.critical ? (
                              <Badge variant="destructive" className="gap-1">
                                <XCircle className="h-3 w-3" />
                                <span>{error.type}</span>
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-50 text-amber-700">
                                <AlertTriangle className="h-3 w-3" />
                                <span>{error.type}</span>
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{error.message}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleEditError(error)}
                          >
                            <span className="sr-only">Editar</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        {validationErrorsState.length === 0 ? (
                          <div className="flex flex-col items-center gap-2 text-green-700">
                            <CheckCircle className="h-8 w-8" />
                            <span>¡Todos los errores han sido corregidos!</span>
                          </div>
                        ) : (
                          <span>No se encontraron errores con los filtros actuales.</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Paginación */}
            {filteredErrors.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredErrors.length)} de {filteredErrors.length} errores
                </div>
                
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      let pageNumber: number;
                      
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                        if (i === 4) pageNumber = totalPages;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                        if (i === 0) pageNumber = 1;
                      } else {
                        pageNumber = currentPage - 2 + i;
                        if (i === 0) pageNumber = 1;
                        if (i === 4) pageNumber = totalPages;
                      }
                      
                      return (
                        <PaginationItem key={i}>
                          {(i === 0 && pageNumber !== 1) || (i === 4 && pageNumber !== totalPages) ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={currentPage === pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="itemsPerPage" className="text-sm">Mostrar:</Label>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                    setItemsPerPage(parseInt(value))
                    setCurrentPage(1)
                  }}>
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
          
          {hasCriticalErrors && (
            <CardFooter className="bg-red-50 border-t border-red-100">
              <div className="flex items-start gap-2 text-sm text-red-700">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Se encontraron errores críticos</p>
                  <p className="mt-1">Debes corregir todos los errores críticos antes de continuar. Puedes corregirlos en línea o volver a la definición de campos para ajustar los parámetros.</p>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
        
        {/* Diálogo de edición */}
        <Dialog open={editingError !== null} onOpenChange={(open) => !open && setEditingError(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Corregir Error</DialogTitle>
              <DialogDescription>
                Edita el valor para corregir el error en la fila {editingError?.row}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Columna</Label>
                  <div className="font-medium">{editingError?.column}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Tipo de Error</Label>
                  <div className="font-medium">{editingError?.type}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground text-xs">Mensaje de Error</Label>
                <div className="text-sm text-red-600">{editingError?.message}</div>
              </div>
              
              <div>
                <Label htmlFor="value">Valor Actual</Label>
                <Input 
                  id="value" 
                  value={editedValue} 
                  onChange={(e) => setEditedValue(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-muted-foreground text-xs">Contexto de la Fila</Label>
                <div className="mt-1 border rounded-md p-3 bg-muted/20 text-sm">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(sampleRowData).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-muted-foreground">{key}:</span>{" "}
                        <span className={key === editingError?.column ? "font-medium text-red-600" : ""}>
                          {value || <span className="italic text-muted-foreground">(vacío)</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingError(null)}>Cancelar</Button>
              <Button onClick={handleSaveCorrection}>Guardar Corrección</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <Edit className="h-4 w-4" />
              Modificar Definición de Campos
            </Button>
          </div>
          <Button 
            onClick={handleNext} 
            className="gap-2"
            disabled={hasCriticalErrors}
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 