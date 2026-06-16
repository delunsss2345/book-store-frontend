'use client'

import { useAdminUsersQuery, useAdminUsersStatsQuery } from '@/features/admin'
import useTranslator from '@/hooks/use-translator'
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { Input } from '@/src/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import type { AdminUser } from '@/types/response/admin.response'
import type { ColumnDef } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  UserCheck,
  Users
} from 'lucide-react'
import { useMemo } from 'react'
import CustomersTableSkeleton from './CustomersTableSkeleton'

// Helper để map màu cho Role
const roleConfig: Record<string, { color: string }> = {
  ADMIN: { color: 'bg-purple-100 text-purple-700 border-purple-200' },
  STAFF: { color: 'bg-blue-100 text-blue-700 border-blue-200' },
  WAREHOUSE: { color: 'bg-amber-100 text-amber-700 border-amber-200' },
  CUSTOMER: { color: 'bg-slate-100 text-slate-700 border-slate-200' },
  GUEST: { color: 'bg-zinc-100 text-zinc-500 border-zinc-200' },
}

const getDisplayName = (user: AdminUser) => {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
  return name || user.email || 'Unknown'
}

const getInitials = (user: AdminUser) => {
  const first = user.firstName?.[0] ?? ''
  const last = user.lastName?.[0] ?? ''
  if (first || last) return `${first}${last}`.toUpperCase()
  return user.email?.[0]?.toUpperCase() ?? '?'
}

const getRoleKey = (role?: string) => {
  if (role && roleConfig[role]) return role
  return 'CUSTOMER'
}

export function CustomersDashboardClient() {
  const { t } = useTranslator()
  const { data: users = [], isPending: isPendingUsers } = useAdminUsersQuery()
  const { data: userStats } = useAdminUsersStatsQuery()

  const totalUsers = userStats?.totalUsers ?? 0
  const customersLoggedInLast24Hours =
    userStats?.customersLoggedInLast24Hours ?? 0

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        id: 'customer',
        header: () => t('dashboard.customers.table.columns.customer') || 'Customer',
        cell: ({ row }) => {
          const { email } = row.original
          const initials = getInitials(row.original)
          const displayName = getDisplayName(row.original)
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground line-clamp-1">
                  {displayName}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {email ?? '-'}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'isEmailVerified',
        header: () => t('dashboard.customers.table.columns.isEmailVerified'),
        cell: ({ row }) => (
          row.original.isEmailVerified ? (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 font-medium">
              <UserCheck className="size-3" />
              {t('dashboard.customers.table.emailVerified.true')}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-zinc-50 text-zinc-500 border-zinc-200 font-medium">
              {t('dashboard.customers.table.emailVerified.false')}
            </Badge>
          )
        ),
      },
      {
        accessorKey: 'role',
        header: () => t('dashboard.customers.table.columns.role'),
        cell: ({ row }) => {
          const roleKey = getRoleKey(row.original.role)
          return (
            <Badge variant="secondary" className={`${roleConfig[roleKey].color} border font-medium`}>
              {t(`dashboard.customers.roles.${roleKey}`)}
            </Badge>
          )
        },
      },
      {
        id: 'actions',
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Edit customer</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [t]
  )

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section className='space-y-6 p-1'>
      <div className="flex items-center justify-between">
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{t('dashboard.customers.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('dashboard.customers.subtitle')}</p>
        </div>
        <Button className="hidden sm:flex">Add Customer</Button>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className='pb-2 flex flex-row items-center justify-between space-y-0'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              {t('dashboard.customers.summary.totalCustomers')}
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{totalUsers}</p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className='pb-2 flex flex-row items-center justify-between space-y-0'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              {t('dashboard.customers.summary.activeLastDay')}
            </CardTitle>
            <Mail className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{customersLoggedInLast24Hours}</p>
          </CardContent>
        </Card>
      </div>

      <Card className='shadow-sm overflow-hidden'>
        <CardHeader className='border-b bg-muted/20 py-4'>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg">Customer List</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-8 w-full sm:w-[250px] bg-background"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-0'>
          <Table>
            <TableHeader className="bg-muted/30">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isPendingUsers ? (
                <CustomersTableSkeleton />
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-32 text-center text-muted-foreground'>
                    {t('dashboard.customers.table.empty')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Improved Pagination */}
        <div className='flex flex-col gap-4 border-t px-6 py-4 md:flex-row md:items-center md:justify-between bg-muted/10'>
          <p className='text-sm text-muted-foreground'>
            Showing <strong>1-8</strong> of <strong>312</strong> customers
          </p>
          <div className='flex items-center gap-2'>
            <div className="flex items-center gap-1">
              <Button variant='outline' size='icon' className="h-8 w-8" disabled>
                <ChevronLeft className='size-4' />
              </Button>
              <Button variant='default' size='sm' className="h-8 w-8 p-0">1</Button>
              <Button variant='ghost' size='sm' className="h-8 w-8 p-0">2</Button>
              <Button variant='ghost' size='sm' className="h-8 w-8 p-0">3</Button>
              <Button variant='outline' size='icon' className="h-8 w-8">
                <ChevronRight className='size-4' />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
