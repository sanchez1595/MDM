"use client"

import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
  User,
  Settings,
  Key,
  HelpCircle,
  FileText,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function HeaderNavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const isMobile = useIsMobile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Mi Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Key className="mr-2 h-4 w-4" />
            <span>Permisos de Acceso</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificaciones</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Documentación</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ayuda y Soporte</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 