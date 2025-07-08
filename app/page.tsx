"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Plus, Globe, Calendar, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { useWebsiteStore } from "@/lib/store"
import type { Website } from "@/types/website"

const columns: ColumnDef<Website>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
          {row.getValue<string>("name").charAt(0)}
        </div>
        <div>
          <div className="font-medium text-sm">{row.getValue("name")}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
            {row.original.description.substring(0, 50)}...
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a
        href={row.getValue("url")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center space-x-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Globe className="h-3 w-3" />
        <span className="truncate max-w-[150px]">{row.getValue<string>("url").replace("https://", "")}</span>
      </a>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const categoryColors = {
        "E-commerce": "bg-green-100 text-green-800 border-green-200",
        SaaS: "bg-blue-100 text-blue-800 border-blue-200",
        Blog: "bg-purple-100 text-purple-800 border-purple-200",
        Portfolio: "bg-pink-100 text-pink-800 border-pink-200",
        News: "bg-orange-100 text-orange-800 border-orange-200",
      }
      return (
        <Badge
          variant="outline"
          className={`${categoryColors[category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"} text-xs`}
        >
          {category}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusConfig = {
        active: { color: "bg-green-500", label: "Active", textColor: "text-green-700" },
        inactive: { color: "bg-red-500", label: "Inactive", textColor: "text-red-700" },
        pending: { color: "bg-yellow-500", label: "Pending", textColor: "text-yellow-700" },
      }
      const config = statusConfig[status as keyof typeof statusConfig]

      return (
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${config.color}`} />
          <span className={`text-xs font-medium ${config.textColor}`}>{config.label}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "offers.pricing.type",
    header: "Pricing",
    cell: ({ row }) => {
      const pricing = row.original.offers.pricing
      const pricingColors = {
        free: "bg-gray-100 text-gray-800 border-gray-200",
        paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
        freemium: "bg-indigo-100 text-indigo-800 border-indigo-200",
      }

      return (
        <Badge variant="outline" className={`${pricingColors[pricing.type]} text-xs font-medium`}>
          {pricing.type === "paid" && pricing.amount
            ? `$${pricing.amount}/${pricing.billingCycle?.charAt(0)}`
            : pricing.type.charAt(0).toUpperCase() + pricing.type.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          <Calendar className="mr-2 h-3 w-3" />
          Updated
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"))
      return (
        <div className="text-xs text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const website = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(website.url)
              }}
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                window.open(website.url, "_blank")
              }}
            >
              Visit Website
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                // Handle edit action
              }}
            >
              Edit Website
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={(e) => {
                e.stopPropagation()
                // Handle delete action
              }}
            >
              Delete Website
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function WebsiteListPage() {
  const router = useRouter()
  const { websites } = useWebsiteStore()

  const handleRowClick = (website: Website) => {
    router.push(`/website/${website.id}`)
  }

  const handleAddWebsite = () => {
    router.push("/website/new")
  }

  // Calculate stats
  const activeWebsites = websites.filter((w) => w.status === "active").length
  const totalWebsites = websites.length
  const paidWebsites = websites.filter((w) => w.offers.pricing.type === "paid").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Website Portfolio
              </h1>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Manage your website collection and track their performance across different categories.
              </p>
            </div>
            <Button
              onClick={handleAddWebsite}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 self-start sm:self-auto"
              size="lg"
            >
              <Plus className="h-4 w-4" />
              Add Website
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Websites</CardTitle>
              <Globe className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalWebsites}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-green-50 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Sites</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeWebsites}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((activeWebsites / totalWebsites) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-purple-50 hover:shadow-lg transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paid Services</CardTitle>
              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{paidWebsites}</div>
              <p className="text-xs text-muted-foreground">Revenue generating</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900">All Websites</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Click on any row to view and edit website details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <DataTable columns={columns} data={websites} searchKey="name" onRowClick={handleRowClick} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
