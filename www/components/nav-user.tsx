'use client'

import {
  ChevronsUpDown,
  LogOut,
  SettingsIcon,
  User as UserIcon, // 别名避免和 User 类型冲突
} from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { User } from '@/lib/pb/common'
import { Avatar } from './ui/avatar'
import { UserAvatar } from './base/avatar'
import { $token, $userInfo } from '@/store/user'
import { logout } from '@/api/auth'
import { useTranslation } from 'react-i18next'

export interface NavUserProps {
  user: User
}

export function NavUser({ user }: NavUserProps) {
  const { t } = useTranslation()
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <UserAvatar className="w-8 h-8" userInfo={user} />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.userName}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <UserAvatar className="w-8 h-8" userInfo={user} />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.userName}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link href="/user-info" className="w-full flex items-center space-x-2">
                <UserIcon className="h-4 w-4" />
                <span>{t('common.userInfo')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/platform-settings" className="w-full flex items-center space-x-2">
                <SettingsIcon className="h-4 w-4" />
                <span>{t('平台设置')}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div
                onClick={async () => {
                  $userInfo.set(undefined)
                  $token.set(undefined)
                  await logout()
                  window.location.reload()
                }}
                className="w-full flex items-center space-x-4"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('common.logout')}</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
