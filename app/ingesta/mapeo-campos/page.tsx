"use client"

import { useState, useEffect } from "react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { ArrowRight, ArrowLeft, AlertCircle, Check, Shield, Database, FileType, EyeOff, Save, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Datos de ejemplo para la previsualización
const sampleData = {
  headers: ["ID Paciente", "Nombre", "Edad", "Tipo de Cáncer", "Estadio", "Fecha Diagnóstico", "Hemoglobina", "Leucocitos"],
  rows: [
    ["PAC001", "Juan Pérez", "65", "Pulmón", "III", "2023-10-15", "9.5", "12000"],
    ["PAC002", "María López", "58", "Mama", "II", "2023-11-22", "11.2", "8500"],
    ["PAC003", "Carlos Ruiz", "72", "Próstata", "I", "2023-09-05", "10.8", "7200"],
    ["PAC004", "Ana Martínez", "45", "Colon", "II", "2023-12-10", "10.1", "9800"],
    ["PAC005", "Roberto Gómez", "67", "Hígado", "IV", "2023-08-18", "8.7", "15600"],
  ]
}

// Tipos de datos disponibles
const dataTypes = [
  { id: "string", name: "Texto" },
  { id: "number", name: "Número" },
  { id: "date", name: "Fecha" },
  { id: "boolean", name: "Booleano" },
  { id: "email", name: "Email" },
  { id: "phone", name: "Teléfono" },
  { id: "address", name: "Dirección" },
  { id: "id", name: "Identificador" },
  { id: "medical_code", name: "Código Médico" },
  { id: "diagnosis", name: "Diagnóstico" },
]

export default function DefinicionCampos() {
  const router = useRouter()
  const [fieldDefinitions, setFieldDefinitions] = useState([
    { 
      sourceField: "ID Paciente", 
      internalName: "id_paciente", 
      dataType: "id", 
      range: "", 
      anonymize: false,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Nombre", 
      internalName: "nombre", 
      dataType: "string", 
      range: "", 
      anonymize: true,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Edad", 
      internalName: "edad", 
      dataType: "number", 
      range: "0-120", 
      anonymize: false,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Tipo de Cáncer", 
      internalName: "tipo_cancer", 
      dataType: "diagnosis", 
      range: "", 
      anonymize: false,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Estadio", 
      internalName: "estadio", 
      dataType: "string", 
      range: "0-IV", 
      anonymize: false,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Fecha Diagnóstico", 
      internalName: "fecha_diagnostico", 
      dataType: "date", 
      range: "", 
      anonymize: false,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Hemoglobina", 
      internalName: "hemoglobina", 
      dataType: "number", 
      range: "0-20", 
      anonymize: false,
      omit: false,
      valid: true
    },
    { 
      sourceField: "Leucocitos", 
      internalName: "leucocitos", 
      dataType: "number", 
      range: "3000-15000", 
      anonymize: false,
      omit: false,
      valid: true
    },
  ])
  const [autoDetect, setAutoDetect] = useState(true)
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "success" | "error">("idle")
  const [validationMessages, setValidationMessages] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [activeField, setActiveField] = useState<number | null>(null)
  const [draftName, setDraftName] = useState("")
  const [showDraftDialog, setShowDraftDialog] = useState(false)
  const [savedDrafts, setSavedDrafts] = useState<{id: string, name: string, date: string, data: any}[]>([])
  const [showLoadDraftDialog, setShowLoadDraftDialog] = useState(false)
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Cargar borradores guardados al iniciar
  useEffect(() => {
    const loadSavedDrafts = () => {
      try {
        const draftsJson = localStorage.getItem('fieldMappingDrafts')
        if (draftsJson) {
          const drafts = JSON.parse(draftsJson)
          setSavedDrafts(drafts)
        }
      } catch (error) {
        console.error('Error loading drafts:', error)
      }
    }
    
    loadSavedDrafts()
  }, [])

  // Cargar plantilla predefinida si se seleccionó en el paso anterior
  useEffect(() => {
    const loadSelectedTemplate = () => {
      try {
        const templateJson = localStorage.getItem('selectedTemplate')
        if (templateJson) {
          const template = JSON.parse(templateJson)
          if (template && template.fields) {
            setFieldDefinitions(template.fields)
            // Validar los campos de la plantilla
            validateFields(template.fields)
            
            toast({
              title: "Plantilla cargada",
              description: `Se ha cargado la plantilla "${template.name}" con ${template.fields.length} campos predefinidos.`,
            })
            
            // Limpiar la selección para no cargarla nuevamente si se recarga la página
            localStorage.removeItem('selectedTemplate')
          }
        }
      } catch (error) {
        console.error('Error loading template:', error)
      }
    }
    
    loadSelectedTemplate()
  }, [])

  // Ir al paso anterior (depende de la fuente de datos)
  const handleBack = () => {
    router.push("/ingesta/configuracion-archivo")
  }

  // Ir al siguiente paso
  const handleNext = () => {
    router.push("/ingesta/validacion")
  }

  // Actualizar el nombre interno de un campo
  const updateInternalName = (index: number, value: string) => {
    const newDefinitions = [...fieldDefinitions]
    newDefinitions[index].internalName = value
    setFieldDefinitions(newDefinitions)
  }

  // Actualizar el tipo de dato de un campo
  const updateDataType = (index: number, value: string) => {
    const newDefinitions = [...fieldDefinitions]
    newDefinitions[index].dataType = value
    setFieldDefinitions(newDefinitions)
  }

  // Actualizar el rango de un campo
  const updateRange = (index: number, value: string) => {
    const newDefinitions = [...fieldDefinitions]
    newDefinitions[index].range = value
    setFieldDefinitions(newDefinitions)
  }

  // Actualizar si un campo debe ser anonimizado
  const toggleAnonymize = (index: number) => {
    const newDefinitions = [...fieldDefinitions]
    newDefinitions[index].anonymize = !newDefinitions[index].anonymize
    // Si se activa anonimizar, desactivar omitir
    if (newDefinitions[index].anonymize) {
      newDefinitions[index].omit = false
    }
    setFieldDefinitions(newDefinitions)
  }

  // Actualizar si un campo debe ser omitido
  const toggleOmit = (index: number) => {
    const newDefinitions = [...fieldDefinitions]
    newDefinitions[index].omit = !newDefinitions[index].omit
    // Si se activa omitir, desactivar anonimizar
    if (newDefinitions[index].omit) {
      newDefinitions[index].anonymize = false
    }
    setFieldDefinitions(newDefinitions)
  }

  // Prevalidar los campos
  const handlePrevalidate = () => {
    setValidationStatus("validating")
    
    // Simulación de validación
    setTimeout(() => {
      const newDefinitions = [...fieldDefinitions]
      const messages: string[] = []
      
      // Validar nombres internos únicos
      const internalNames = newDefinitions.map(d => d.internalName)
      const duplicates = internalNames.filter((name, index) => 
        internalNames.indexOf(name) !== index
      )
      
      if (duplicates.length > 0) {
        messages.push("Hay nombres internos duplicados. Cada campo debe tener un nombre único.")
      }
      
      // Validar rangos para campos numéricos
      newDefinitions.forEach((def, index) => {
        if (def.dataType === "number") {
          if (!def.range) {
            messages.push(`El campo "${def.sourceField}" es numérico y debería tener un rango definido.`)
          } else if (!def.range.match(/^\d+-\d+$/)) {
            messages.push(`El rango para "${def.sourceField}" no tiene el formato correcto (ej: 0-100).`)
            newDefinitions[index].valid = false
          } else {
            newDefinitions[index].valid = true
          }
        }
      })
      
      // Validar que no todos los campos estén omitidos
      if (newDefinitions.every(d => d.omit)) {
        messages.push("Debe haber al menos un campo no omitido para continuar.")
      }
      
      setFieldDefinitions(newDefinitions)
      setValidationMessages(messages)
      setValidationStatus(messages.length > 0 ? "error" : "success")
    }, 1000)
  }

  // Añadir función para manejar la selección de campo en móvil
  const handleFieldSelect = (index: number) => {
    setActiveField(activeField === index ? null : index)
  }

  // Guardar configuración como borrador
  const saveDraft = () => {
    try {
      const newDraft = {
        id: Date.now().toString(),
        name: draftName || `Borrador ${savedDrafts.length + 1}`,
        date: new Date().toLocaleString(),
        data: {
          fieldDefinitions,
          autoDetect
        }
      }
      
      const updatedDrafts = [...savedDrafts, newDraft]
      localStorage.setItem('fieldMappingDrafts', JSON.stringify(updatedDrafts))
      setSavedDrafts(updatedDrafts)
      setShowDraftDialog(false)
      setDraftName("")
      
      toast({
        title: "Borrador guardado",
        description: `Se ha guardado "${newDraft.name}" correctamente.`,
      })
    } catch (error) {
      console.error('Error saving draft:', error)
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar el borrador. Inténtalo de nuevo.",
        variant: "destructive"
      })
    }
  }
  
  // Cargar un borrador guardado
  const loadDraft = (draftId: string) => {
    try {
      const draft = savedDrafts.find(d => d.id === draftId)
      if (draft) {
        setFieldDefinitions(draft.data.fieldDefinitions)
        setAutoDetect(draft.data.autoDetect)
        setShowLoadDraftDialog(false)
        
        toast({
          title: "Borrador cargado",
          description: `Se ha cargado "${draft.name}" correctamente.`,
        })
      }
    } catch (error) {
      console.error('Error loading draft:', error)
      toast({
        title: "Error al cargar",
        description: "No se pudo cargar el borrador. Inténtalo de nuevo.",
        variant: "destructive"
      })
    }
  }
  
  // Eliminar un borrador guardado
  const deleteDraft = (draftId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      const updatedDrafts = savedDrafts.filter(d => d.id !== draftId)
      localStorage.setItem('fieldMappingDrafts', JSON.stringify(updatedDrafts))
      setSavedDrafts(updatedDrafts)
      
      toast({
        title: "Borrador eliminado",
        description: "El borrador ha sido eliminado correctamente.",
      })
    } catch (error) {
      console.error('Error deleting draft:', error)
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el borrador. Inténtalo de nuevo.",
        variant: "destructive"
      })
    }
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
              <BreadcrumbPage>Definición de Campos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Botón de borradores */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Borradores</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Gestionar borradores</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowDraftDialog(true)}>
              <Save className="h-4 w-4 mr-2" />
              Guardar configuración actual
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowLoadDraftDialog(true)}>
              <Clock className="h-4 w-4 mr-2" />
              Cargar borrador guardado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 4 de 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "66.6%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Definición de Campos</h1>
          <p className="text-muted-foreground">Define el tipo de dato, rango y opciones de anonimización para cada campo</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Panel de configuración */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Opciones</CardTitle>
                <CardDescription>
                  Configura las opciones de definición de campos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-detect" 
                    checked={autoDetect}
                    onCheckedChange={setAutoDetect}
                  />
                  <Label htmlFor="auto-detect">Detección automática de tipos</Label>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Resumen</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campos detectados:</span>
                      <span>{fieldDefinitions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campos anonimizados:</span>
                      <span>{fieldDefinitions.filter(d => d.anonymize).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campos omitidos:</span>
                      <span>{fieldDefinitions.filter(d => d.omit).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campos con rango:</span>
                      <span>{fieldDefinitions.filter(d => d.range).length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handlePrevalidate} 
                  className="w-full gap-2"
                  disabled={validationStatus === "validating"}
                  variant="outline"
                >
                  {validationStatus === "validating" ? (
                    <>Validando...</>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Prevalidar
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Datos</CardTitle>
                <CardDescription>
                  Tipos de datos disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dataTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted">
                      <div className="flex items-center gap-2">
                        <FileType className="h-4 w-4 text-muted-foreground" />
                        <span>{type.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{type.id}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabla de definición de campos */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Definición de Campos</CardTitle>
                  <CardDescription>
                    Define las propiedades de cada campo detectado
                  </CardDescription>
                </div>
                
                {validationStatus === "success" && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Validación exitosa
                  </Badge>
                )}
                
                {validationStatus === "error" && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Errores de validación
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                {!isMobile ? (
                  // Vista de escritorio (tabla normal)
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campo Detectado</TableHead>
                          <TableHead>Nombre Interno</TableHead>
                          <TableHead>Tipo de Dato</TableHead>
                          <TableHead>Rangos</TableHead>
                          <TableHead className="w-[100px]">Anonimizar</TableHead>
                          <TableHead className="w-[100px]">Omitir</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fieldDefinitions.map((field, index) => (
                          <TableRow key={index} className={!field.valid ? "bg-red-50" : ""}>
                            <TableCell>
                              <div className="font-medium">{field.sourceField}</div>
                              <div className="text-xs text-muted-foreground">
                                {sampleData.rows[0][index]}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input 
                                value={field.internalName} 
                                onChange={(e) => updateInternalName(index, e.target.value)}
                                className="w-full"
                              />
                            </TableCell>
                            <TableCell>
                              <Select 
                                value={field.dataType} 
                                onValueChange={(value) => updateDataType(index, value)}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Seleccionar tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dataTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Input 
                                      value={field.range} 
                                      onChange={(e) => updateRange(index, e.target.value)}
                                      disabled={field.dataType !== "number"}
                                      placeholder={field.dataType === "number" ? "0-100" : ""}
                                      className="w-full"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Para números, usa formato min-max (ej: 0-100)</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center">
                                        <Checkbox 
                                          checked={field.anonymize} 
                                          onCheckedChange={() => toggleAnonymize(index)}
                                          disabled={field.omit}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Anonimizar este campo en la visualización</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center">
                                        <Checkbox 
                                          checked={field.omit} 
                                          onCheckedChange={() => toggleOmit(index)}
                                          disabled={field.anonymize}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Omitir este campo completamente</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  // Vista móvil (cards expandibles)
                  <div className="space-y-3">
                    {fieldDefinitions.map((field, index) => (
                      <Card key={index} className={!field.valid ? "border-red-200 bg-red-50" : ""}>
                        <CardHeader 
                          className="py-3 cursor-pointer"
                          onClick={() => handleFieldSelect(index)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-base">{field.sourceField}</CardTitle>
                              <CardDescription className="text-xs">
                                {sampleData.rows[0][index]}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              {field.anonymize && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  Anonimizado
                                </Badge>
                              )}
                              {field.omit && (
                                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                  Omitido
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        
                        {activeField === index && (
                          <CardContent className="pt-0 pb-3 space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor={`internal-name-${index}`}>Nombre Interno</Label>
                              <Input 
                                id={`internal-name-${index}`}
                                value={field.internalName} 
                                onChange={(e) => updateInternalName(index, e.target.value)}
                                className="w-full"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`data-type-${index}`}>Tipo de Dato</Label>
                              <Select 
                                value={field.dataType} 
                                onValueChange={(value) => updateDataType(index, value)}
                              >
                                <SelectTrigger id={`data-type-${index}`} className="w-full">
                                  <SelectValue placeholder="Seleccionar tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dataTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`range-${index}`}>Rango</Label>
                              <Input 
                                id={`range-${index}`}
                                value={field.range} 
                                onChange={(e) => updateRange(index, e.target.value)}
                                disabled={field.dataType !== "number"}
                                placeholder={field.dataType === "number" ? "0-100" : ""}
                                className="w-full"
                              />
                              {field.dataType === "number" && (
                                <p className="text-xs text-muted-foreground">
                                  Para números, usa formato min-max (ej: 0-100)
                                </p>
                              )}
                            </div>
                            
                            <div className="flex justify-between pt-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`anonymize-${index}`}
                                  checked={field.anonymize} 
                                  onCheckedChange={() => toggleAnonymize(index)}
                                  disabled={field.omit}
                                />
                                <Label htmlFor={`anonymize-${index}`}>Anonimizar</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`omit-${index}`}
                                  checked={field.omit} 
                                  onCheckedChange={() => toggleOmit(index)}
                                  disabled={field.anonymize}
                                />
                                <Label htmlFor={`omit-${index}`}>Omitir</Label>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
                
                {validationMessages.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-700">Se encontraron los siguientes problemas:</p>
                        <ul className="mt-2 space-y-1 text-red-600 list-disc list-inside">
                          {validationMessages.map((message, index) => (
                            <li key={index}>{message}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {validationStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <Check className="h-4 w-4" />
                      <span>Todos los campos han sido validados correctamente.</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Vista previa de datos */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Vista Previa de Datos</CardTitle>
                <CardDescription>
                  Así se verán tus datos después del procesamiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <div className={`overflow-auto ${isMobile ? "max-h-[200px]" : "max-h-[250px]"}`}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {fieldDefinitions
                            .filter(field => !field.omit)
                            .map((field) => (
                              <TableHead key={field.internalName} className="bg-muted/50 sticky top-0">
                                <div className="flex items-center gap-1">
                                  {field.internalName}
                                  {field.anonymize && (
                                    <Shield className="h-3 w-3 text-amber-500" />
                                  )}
                                </div>
                              </TableHead>
                            ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleData.rows.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {fieldDefinitions
                              .filter(field => !field.omit)
                              .map((field, cellIndex) => {
                                const sourceIndex = sampleData.headers.indexOf(field.sourceField)
                                const cellValue = sourceIndex >= 0 ? row[sourceIndex] : ""
                                
                                return (
                                  <TableCell key={cellIndex}>
                                    {field.anonymize ? (
                                      <span className="text-muted-foreground">
                                        {field.dataType === "number" ? "***" : "********"}
                                      </span>
                                    ) : (
                                      cellValue
                                    )}
                                  </TableCell>
                                )
                              })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-amber-500" />
                    <span>Campo anonimizado</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <EyeOff className="h-3 w-3 text-slate-500" />
                    <span>Campo omitido</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className={`flex ${isMobile ? "flex-col" : "justify-between"} mt-4 gap-3`}>
          <Button variant="outline" onClick={handleBack} className={`gap-2 ${isMobile ? "w-full" : ""}`}>
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
            <Button 
              onClick={handlePrevalidate} 
              variant="outline"
              className={`gap-2 ${isMobile ? "w-full" : ""}`}
              disabled={validationStatus === "validating"}
            >
              <Check className="h-4 w-4" />
              Prevalidar
            </Button>
            <Button 
              onClick={handleNext} 
              className={`gap-2 ${isMobile ? "w-full" : ""}`}
              disabled={validationStatus === "error"}
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Diálogo para guardar borrador */}
      <Dialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guardar como borrador</DialogTitle>
            <DialogDescription>
              Guarda la configuración actual para continuar más tarde.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="draft-name">Nombre del borrador</Label>
            <Input
              id="draft-name"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Ej: Configuración de pacientes oncológicos"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDraftDialog(false)}>Cancelar</Button>
            <Button onClick={saveDraft}>Guardar borrador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para cargar borrador */}
      <Dialog open={showLoadDraftDialog} onOpenChange={setShowLoadDraftDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cargar borrador guardado</DialogTitle>
            <DialogDescription>
              Selecciona un borrador para continuar donde lo dejaste.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[300px] overflow-auto">
            {savedDrafts.length > 0 ? (
              <div className="space-y-2">
                {savedDrafts.map((draft) => (
                  <div 
                    key={draft.id} 
                    className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer flex justify-between items-center"
                    onClick={() => loadDraft(draft.id)}
                  >
                    <div>
                      <div className="font-medium">{draft.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {draft.date}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={(e) => deleteDraft(draft.id, e)}
                    >
                      <span className="sr-only">Eliminar</span>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No hay borradores guardados.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDraftDialog(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 