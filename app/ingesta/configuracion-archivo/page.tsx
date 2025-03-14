"use client"

import { useState, useEffect } from "react"
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
import { ArrowRight, ArrowLeft, FileUp, RefreshCw } from "lucide-react"

// Datos de ejemplo para la previsualización
const sampleData = {
  headers: ["ID Paciente", "Nombre", "Apellido", "Edad", "Tipo de Cáncer", "Estadio", "Fecha Diagnóstico", "Hemoglobina", "Leucocitos"],
  rows: [
    ["PAC001", "Juan", "Pérez", "65", "Pulmón", "III", "2023-10-15", "9.5", "12000"],
    ["PAC002", "María", "López", "58", "Mama", "II", "2023-11-22", "11.2", "8500"],
    ["PAC003", "Carlos", "Rodríguez", "72", "Próstata", "I", "2023-09-05", "10.8", "7200"],
    ["PAC004", "Ana", "Martínez", "45", "Colon", "II", "2023-12-10", "10.1", "9800"],
    ["PAC005", "Roberto", "Gómez", "67", "Hígado", "IV", "2023-08-18", "8.7", "15600"],
    ["PAC006", "Laura", "Sánchez", "51", "Tiroides", "I", "2023-07-14", "12.3", "6800"],
    ["PAC007", "Miguel", "Fernández", "63", "Páncreas", "III", "2023-06-22", "9.8", "11200"],
    ["PAC008", "Sofía", "Díaz", "49", "Ovario", "II", "2023-05-30", "10.5", "8900"],
    ["PAC009", "Javier", "Moreno", "70", "Vejiga", "II", "2023-04-14", "11.0", "7500"],
    ["PAC010", "Carmen", "Jiménez", "55", "Mama", "I", "2023-03-25", "12.1", "6500"],
    ["PAC011", "David", "Ruiz", "68", "Pulmón", "IV", "2023-02-08", "8.9", "14800"],
    ["PAC012", "Elena", "Hernández", "47", "Melanoma", "III", "2023-01-19", "10.2", "9200"],
    ["PAC013", "Pablo", "Torres", "74", "Próstata", "II", "2024-01-07", "9.7", "8100"],
    ["PAC014", "Lucía", "Flores", "53", "Linfoma", "III", "2024-02-14", "9.9", "10500"],
    ["PAC015", "Alberto", "Vega", "61", "Riñón", "I", "2024-03-22", "11.5", "7800"],
  ]
}

export default function ConfiguracionArchivo() {
  const router = useRouter()
  const [encoding, setEncoding] = useState("utf-8")
  const [delimiter, setDelimiter] = useState("comma")
  const [useHeaderRow, setUseHeaderRow] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  // Simular carga de datos
  const handleRefreshPreview = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // Ir al paso anterior
  const handleBack = () => {
    router.push("/ingesta/seleccion-fuente")
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
              <BreadcrumbLink href="/ingesta/seleccion-template">Selección de Template</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingesta/seleccion-fuente">Selección de Fuente</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Configuración de Archivo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-muted-foreground">Paso 3 de 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "50%" }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración de Archivo</h1>
          <p className="text-muted-foreground">Configura los parámetros de lectura y previsualiza los datos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Panel de configuración */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parámetros</CardTitle>
                <CardDescription>
                  Configura cómo se debe leer el archivo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="encoding">Codificación</Label>
                  <Select value={encoding} onValueChange={setEncoding}>
                    <SelectTrigger id="encoding">
                      <SelectValue placeholder="Selecciona codificación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utf-8">UTF-8</SelectItem>
                      <SelectItem value="iso-8859-1">ISO-8859-1 (Latin-1)</SelectItem>
                      <SelectItem value="windows-1252">Windows-1252</SelectItem>
                      <SelectItem value="ascii">ASCII</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delimiter">Delimitador</Label>
                  <Select value={delimiter} onValueChange={setDelimiter}>
                    <SelectTrigger id="delimiter">
                      <SelectValue placeholder="Selecciona delimitador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comma">Coma (,)</SelectItem>
                      <SelectItem value="semicolon">Punto y coma (;)</SelectItem>
                      <SelectItem value="tab">Tabulador</SelectItem>
                      <SelectItem value="pipe">Barra vertical (|)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="header-row" 
                    checked={useHeaderRow} 
                    onCheckedChange={(checked) => setUseHeaderRow(checked as boolean)}
                  />
                  <Label htmlFor="header-row">Usar primera fila como cabecera</Label>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 gap-2"
                  onClick={handleRefreshPreview}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Actualizar vista previa
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Información del Archivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nombre:</span>
                  <span className="text-sm font-medium">pacientes_oncologia.csv</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tamaño:</span>
                  <span className="text-sm font-medium">3.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Filas estimadas:</span>
                  <span className="text-sm font-medium">1,458</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Columnas:</span>
                  <span className="text-sm font-medium">9</span>
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
                  Mostrando las primeras 15 filas del archivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <div className="max-h-[500px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {sampleData.headers.map((header, index) => (
                            <TableHead key={index} className="bg-muted/50 sticky top-0">
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleData.rows.map((row, rowIndex) => (
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