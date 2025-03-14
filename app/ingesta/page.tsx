"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function IngestaRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirigir automáticamente a la página de selección de template
    router.push("/ingesta/seleccion-template")
  }, [router])
  
  return (
    <div className="py-6 flex items-center justify-center h-64">
      <p>Redirigiendo a selección de template...</p>
    </div>
  )
} 