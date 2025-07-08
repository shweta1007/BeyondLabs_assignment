"use client"

import type { UseFormReturn } from "react-hook-form"
import { Globe, Tag, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { WebsiteFormData } from "@/types/website"

interface WebsiteDetailsSectionProps {
  form: UseFormReturn<WebsiteFormData>
}

const categories = [
  "E-commerce",
  "SaaS",
  "Blog",
  "Portfolio",
  "News",
  "Education",
  "Healthcare",
  "Finance",
  "Entertainment",
  "Other",
]

const statuses = [
  { value: "active", label: "Active", icon: "🟢" },
  { value: "inactive", label: "Inactive", icon: "🔴" },
  { value: "pending", label: "Pending", icon: "🟡" },
]

export function WebsiteDetailsSection({ form }: WebsiteDetailsSectionProps) {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Website Details</CardTitle>
            <CardDescription className="text-blue-100">
              Basic information about the website including name, URL, and description.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }:any) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Website Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter website name"
                    {...field}
                    className="border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">The display name for this website.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }:any) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Website URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    {...field}
                    className="border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">The full URL of the website.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }:any) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700 font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-700 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs text-gray-500">
                  The primary category this website belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }:any) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Status
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-700 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <span>{status.icon}</span>
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs text-gray-500">
                  Current operational status of the website.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the website's purpose and features..."
                  className="text-gray-700 min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-500">
                A detailed description of what this website offers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
