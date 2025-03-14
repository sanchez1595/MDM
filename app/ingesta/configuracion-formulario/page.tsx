"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
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
import { ArrowRight, ArrowLeft, FileText, Calendar, Clock } from "lucide-react"

// Datos de ejemplo para la previsualización
const sampleFormData = {
  headers: ["ID Paciente", "Nombre", "Tipo de Cáncer", "Fecha Diagnóstico", "Estado"],
  rows: [
    ["PAC001", "Juan Pérez", "Pulmón", "2023-10-15", "En tratamiento"],
    ["PAC002", "María López", "Mama", "2023-11-22", "Seguimiento"],
    ["PAC003", "Carlos Ruiz", "Próstata", "2023-09-05", "En remisión"],
    ["PAC004", "Ana Martínez", "Colon", "2023-12-10", "Diagnóstico inicial"],
    ["PAC005", "Roberto Gómez", "Hígado", "2023-08-18", "En tratamiento"],
  ]
}

export default function ConfiguracionFormulario() {
  const router = useRouter()
  const [selectedForm, setSelectedForm] = useState("form-1")
  const [frequency, setFrequency] = useState("weekly")
  const [startDate, setStartDate] = useState("")
  const [notifyOnSubmission, setNotifyOnSubmission] = useState(true)
  const [autoApprove, setAutoApprove] = useState(false)
  
  // Ir al paso anterior
  const handleBack = () => {
    router.push("/ingesta")
  }

  // Ir al siguiente paso
  const handleNext = () => {
    router.push("/ingesta/mapeo-campos")
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
              <BreadcrumbPage>Configuración de Formulario</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 2 de 5</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración de Formulario</h1>
          <p className="text-muted-foreground">Configura el formulario interno y programa la ingesta de datos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Panel de configuración */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selección de Formulario</CardTitle>
                <CardDescription>
                  Elige el formulario y configura la frecuencia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-select">Formulario</Label>
                  <Select value={selectedForm} onValueChange={setSelectedForm}>
                    <SelectTrigger id="form-select">
                      <SelectValue placeholder="Selecciona un formulario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form-1">Registro de Pacientes Oncológicos</SelectItem>
                      <SelectItem value="form-2">Seguimiento de Tratamientos</SelectItem>
                      <SelectItem value="form-3">Resultados de Análisis Clínicos</SelectItem>
                      <SelectItem value="form-4">Evaluación de Calidad de Vida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Frecuencia de ingesta</Label>
                  <RadioGroup value={frequency} onValueChange={setFrequency}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manual (una vez)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Diaria</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Semanal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Mensual</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {frequency !== "manual" && (
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Fecha de inicio</Label>
                    <div className="flex">
                      <Input 
                        id="start-date" 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify" 
                      checked={notifyOnSubmission} 
                      onCheckedChange={(checked) => setNotifyOnSubmission(checked as boolean)}
                    />
                    <Label htmlFor="notify">Notificar al recibir datos</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="auto-approve" 
                      checked={autoApprove} 
                      onCheckedChange={(checked) => setAutoApprove(checked as boolean)}
                    />
                    <Label htmlFor="auto-approve">Aprobar automáticamente</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Información del Formulario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Creado por:</span>
                  <span className="text-sm font-medium">Admin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fecha de creación:</span>
                  <span className="text-sm font-medium">15/10/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Última actualización:</span>
                  <span className="text-sm font-medium">22/10/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Campos:</span>
                  <span className="text-sm font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Registros:</span>
                  <span className="text-sm font-medium">42</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Previsualización de datos */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>
                  Mostrando los últimos 5 registros del formulario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <div className="max-h-[500px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {sampleFormData.headers.map((header, index) => (
                            <TableHead key={index} className="bg-muted/50 sticky top-0">
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleFormData.rows.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Próxima ingesta programada: {frequency !== "manual" ? "26/10/2023 08:00 AM" : "No programada"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button onClick={handleNext} className="gap-2">
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 