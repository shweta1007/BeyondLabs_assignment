"use client"

import { type UseFormReturn, useFieldArray } from "react-hook-form"
import { Plus, X, DollarSign, Users, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { WebsiteFormData } from "@/types/website"

interface OffersSectionProps {
  form: UseFormReturn<WebsiteFormData>
}

const pricingTypes = [
  { value: "free", label: "Free", icon: "🆓" },
  { value: "paid", label: "Paid", icon: "💰" },
  { value: "freemium", label: "Freemium", icon: "⭐" },
]

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]
const billingCycles = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "one-time", label: "One-time" },
]

export function OffersSection({ form }: OffersSectionProps) {
  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "offers.features",
  })

  const {
    fields: audienceFields,
    append: appendAudience,
    remove: removeAudience,
  } = useFieldArray({
    control: form.control,
    name: "offers.targetAudience",
  })

  const {
    fields: uspFields,
    append: appendUsp,
    remove: removeUsp,
  } = useFieldArray({
    control: form.control,
    name: "offers.uniqueSellingPoints",
  })

  const pricingType = form.watch("offers.pricing.type")

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Offers & Pricing</CardTitle>
            <CardDescription className="text-green-100">
              Define the pricing model, features, and target audience for this website.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* Pricing Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Pricing Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="offers.pricing.type"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Pricing Type</FormLabel>
                  <Select className="text-gray-700" onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-200 focus:border-green-500  text-gray-700 focus:ring-green-500 bg-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pricingTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {pricingType === "paid" && (
              <>
                <FormField
                  control={form.control}
                  name="offers.pricing.amount"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offers.pricing.currency"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500 bg-white">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offers.pricing.billingCycle"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Billing Cycle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-gray-800 border-gray-200 focus:border-green-500 focus:ring-green-500 bg-white">
                            <SelectValue placeholder="Select cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billingCycles.map((cycle) => (
                            <SelectItem key={cycle.value} value={cycle.value}>
                              {cycle.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Features
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendFeature("")}
              className="gap-2 border-green-200 text-green-700 hover:bg-green-50"
            >
              <Plus className="h-4 w-4" />
              Add Feature
            </Button>
          </div>
          <div className="space-y-3">
            {featureFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`offers.features.${index}`}
                  render={({ field }: any) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Enter feature"
                          {...field}
                          className="border-gray-200 focus:border-green-500 text-gray-700 focus:ring-green-500 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Target Audience
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendAudience("")}
              className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4" />
              Add Audience
            </Button>
          </div>
          <div className="space-y-3">
            {audienceFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`offers.targetAudience.${index}`}
                  render={({ field }: any) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Enter target audience"
                          {...field}
                          className="border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAudience(index)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Selling Points Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-500" />
              Unique Selling Points
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendUsp("")}
              className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Plus className="h-4 w-4" />
              Add USP
            </Button>
          </div>
          <div className="space-y-3">
            {uspFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`offers.uniqueSellingPoints.${index}`}
                  render={({ field }: any) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Enter unique selling point"
                          {...field}
                          className="border-gray-200 text-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeUsp(index)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
