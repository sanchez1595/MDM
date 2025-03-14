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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { ArrowRight, ArrowLeft, Globe, Check, AlertCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Datos de ejemplo para la previsualización
const sampleApiResponse = {
  headers: ["ID Paciente", "Nombre", "Edad", "Tipo de Cáncer", "Estadio", "Fecha Diagnóstico", "Hemoglobina", "Leucocitos"],
  rows: [
    ["PAC001", "Juan Pérez", "65", "Pulmón", "III", "2023-10-15", "9.5", "12000"],
    ["PAC002", "María López", "58", "Mama", "II", "2023-11-22", "11.2", "8500"],
    ["PAC003", "Carlos Ruiz", "72", "Próstata", "I", "2023-09-05", "10.8", "7200"],
    ["PAC004", "Ana Martínez", "45", "Colon", "II", "2023-12-10", "10.1", "9800"],
    ["PAC005", "Roberto Gómez", "67", "Hígado", "IV", "2023-08-18", "8.7", "15600"],
  ]
}

// Ejemplo de respuesta JSON
const sampleJsonResponse = `{
  "pacientes": [
    {
      "id_paciente": "PAC001",
      "nombre": "Juan Pérez",
      "edad": 65,
      "tipo_cancer": "Pulmón",
      "estadio": "III",
      "fecha_diagnostico": "2023-10-15",
      "hemoglobina": 9.5,
      "leucocitos": 12000
    },
    {
      "id_paciente": "PAC002",
      "nombre": "María López",
      "edad": 58,
      "tipo_cancer": "Mama",
      "estadio": "II",
      "fecha_diagnostico": "2023-11-22",
      "hemoglobina": 11.2,
      "leucocitos": 8500
    }
  ],
  "metadata": {
    "total": 5,
    "pagina": 1,
    "por_pagina": 2
  }
}`

export default function ConfiguracionAPI() {
  const router = useRouter()
  const [apiUrl, setApiUrl] = useState("https://api.hospital.org/pacientes-oncologia")
  const [apiMethod, setApiMethod] = useState("GET")
  const [authType, setAuthType] = useState("bearer")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
  const [apiKey, setApiKey] = useState("")
  const [apiKeyName, setApiKeyName] = useState("x-api-key")
  const [apiKeyLocation, setApiKeyLocation] = useState("header")
  const [responseFormat, setResponseFormat] = useState("json")
  const [jsonPath, setJsonPath] = useState("pacientes")
  const [headers, setHeaders] = useState("Content-Type: application/json\nAccept: application/json")
  const [body, setBody] = useState("")
  const [viewFormat, setViewFormat] = useState("table")
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [pagination, setPagination] = useState(true)
  
  // Ir al paso anterior
  const handleBack = () => {
    router.push("/ingesta")
  }

  // Ir al siguiente paso
  const handleNext = () => {
    router.push("/ingesta/mapeo-campos")
  }

  // Probar la conexión
  const handleTestConnection = () => {
    setTestStatus("loading")
    // Simulación de prueba de conexión
    setTimeout(() => {
      setTestStatus("success")
      // Para simular un error, descomentar la siguiente línea y comentar la anterior
      // setTestStatus("error")
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
              <BreadcrumbPage>Configuración de API</BreadcrumbPage>
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
          <h1 className="text-2xl font-bold tracking-tight">Configuración de API</h1>
          <p className="text-muted-foreground">Configura la conexión a la API y verifica los datos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Panel de configuración */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conexión a API</CardTitle>
                <CardDescription>
                  Configura los parámetros de conexión
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-url">URL de la API</Label>
                  <Input 
                    id="api-url" 
                    placeholder="https://api.hospital.org/pacientes-oncologia" 
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-method">Método HTTP</Label>
                  <Select value={apiMethod} onValueChange={setApiMethod}>
                    <SelectTrigger id="api-method">
                      <SelectValue placeholder="Selecciona un método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-auth">Autenticación</Label>
                  <Select value={authType} onValueChange={setAuthType}>
                    <SelectTrigger id="api-auth">
                      <SelectValue placeholder="Selecciona un tipo de autenticación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin autenticación</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="apikey">API Key</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {authType === "basic" && (
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Usuario</Label>
                      <Input 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {authType === "bearer" && (
                  <div className="space-y-2">
                    <Label htmlFor="token">Token</Label>
                    <Input 
                      id="token" 
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                )}

                {authType === "apikey" && (
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="apikey">API Key</Label>
                      <Input 
                        id="apikey" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apikey-name">Nombre del parámetro</Label>
                      <Input 
                        id="apikey-name" 
                        value={apiKeyName}
                        onChange={(e) => setApiKeyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apikey-location">Ubicación</Label>
                      <Select value={apiKeyLocation} onValueChange={setApiKeyLocation}>
                        <SelectTrigger id="apikey-location">
                          <SelectValue placeholder="Selecciona ubicación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header">Header</SelectItem>
                          <SelectItem value="query">Query Parameter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleTestConnection} 
                  className="w-full gap-2"
                  disabled={testStatus === "loading"}
                >
                  {testStatus === "loading" ? (
                    <>Probando conexión...</>
                  ) : testStatus === "success" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Conexión exitosa
                    </>
                  ) : testStatus === "error" ? (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      Error de conexión
                    </>
                  ) : (
                    <>Probar conexión</>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Respuesta</CardTitle>
                <CardDescription>
                  Configura cómo se procesarán los datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="response-format">Formato de respuesta</Label>
                  <Select value={responseFormat} onValueChange={setResponseFormat}>
                    <SelectTrigger id="response-format">
                      <SelectValue placeholder="Selecciona formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {responseFormat === "json" && (
                  <div className="space-y-2">
                    <Label htmlFor="json-path">JSON Path (opcional)</Label>
                    <Input 
                      id="json-path" 
                      placeholder="Ej: data.items"
                      value={jsonPath}
                      onChange={(e) => setJsonPath(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ruta para acceder al array de datos en la respuesta JSON
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="headers">Headers adicionales</Label>
                  <Textarea 
                    id="headers" 
                    placeholder="Content-Type: application/json&#10;Accept: application/json"
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                  />
                </div>

                {apiMethod !== "GET" && (
                  <div className="space-y-2">
                    <Label htmlFor="body">Body</Label>
                    <Textarea 
                      id="body" 
                      placeholder='{"query": "select * from products"}'
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="pagination" 
                    checked={pagination}
                    onCheckedChange={setPagination}
                  />
                  <Label htmlFor="pagination">Habilitar paginación</Label>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Previsualización de datos */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa de Datos</CardTitle>
                <CardDescription>
                  Previsualización de los datos obtenidos de la API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={viewFormat} onValueChange={setViewFormat} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="table">Vista de Tabla</TabsTrigger>
                    <TabsTrigger value="json">Vista JSON</TabsTrigger>
                  </TabsList>

                  <TabsContent value="table">
                    <div className="border rounded-md">
                      <div className="max-h-[500px] overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {sampleApiResponse.headers.map((header, index) => (
                                <TableHead key={index} className="bg-muted/50 sticky top-0">
                                  {header}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sampleApiResponse.rows.map((row, rowIndex) => (
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
                  </TabsContent>

                  <TabsContent value="json">
                    <div className="border rounded-md p-4 bg-muted/30">
                      <pre className="text-xs overflow-auto max-h-[500px]">
                        {sampleJsonResponse}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-4 p-4 bg-muted/30 rounded-md">
                  <div className="text-sm">
                    <p className="font-medium">Información de la respuesta:</p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>Status: 200 OK</li>
                      <li>Tiempo de respuesta: 245ms</li>
                      <li>Tamaño: 1.2KB</li>
                      <li>Registros: 5</li>
                    </ul>
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