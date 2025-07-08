"use client"

import { type UseFormReturn, useFieldArray } from "react-hook-form"
import { Plus, X, FileText, Target, MessageSquare, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { WebsiteFormData } from "@/types/website"

interface ArticleSpecsSectionProps {
  form: UseFormReturn<WebsiteFormData>
}

export function ArticleSpecsSection({ form }: ArticleSpecsSectionProps) {
  const {
    fields: contentTypeFields,
    append: appendContentType,
    remove: removeContentType,
  } = useFieldArray({
    control: form.control,
    name: "articleSpecs.contentTypes",
  })

  const {
    fields: toneFields,
    append: appendTone,
    remove: removeTone,
  } = useFieldArray({
    control: form.control,
    name: "articleSpecs.toneOfVoice",
  })

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control: form.control,
    name: "articleSpecs.requiredSections",
  })

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Article Specifications</CardTitle>
            <CardDescription className="text-purple-100">
              Define content requirements, guidelines, and specifications for articles.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* Content Types */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Content Types
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendContentType("")}
              className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Plus className="h-4 w-4" />
              Add Type
            </Button>
          </div>
          <div className="space-y-3">
            {contentTypeFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`articleSpecs.contentTypes.${index}`}
                  render={({ field }:any) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="e.g., Blog Post, Tutorial, Review"
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
                  onClick={() => removeContentType(index)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Word Count Range */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Word Count Range
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="articleSpecs.wordCountRange.min"
              render={({ field }:any) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Minimum Words</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="500"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="border-gray-200 text-gray-700 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">Minimum word count for articles.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="articleSpecs.wordCountRange.max"
              render={({ field }:any) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Maximum Words</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="border-gray-200 text-gray-700 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">Maximum word count for articles.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Tone of Voice */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Tone of Voice
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTone("")}
              className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4" />
              Add Tone
            </Button>
          </div>
          <div className="space-y-3">
            {toneFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`articleSpecs.toneOfVoice.${index}`}
                  render={({ field }: any) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="e.g., Professional, Casual, Technical"
                          {...field}
                          className="border-gray-200  text-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white"
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
                  onClick={() => removeTone(index)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Required Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Required Sections
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSection("")}
              className="gap-2 border-green-200 text-green-700 hover:bg-green-50"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
          <div className="space-y-3">
            {sectionFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`articleSpecs.requiredSections.${index}`}
                  render={({ field }:any) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="e.g., Introduction, Main Content, Conclusion"
                          {...field}
                          className="border-gray-200 text-gray-700 focus:border-green-500 focus:ring-green-500 bg-white"
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
                  onClick={() => removeSection(index)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Requirements */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            SEO Requirements
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="articleSpecs.seoRequirements.metaDescription"
              render={({ field }:any) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-white hover:bg-gray-50 transition-colors">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-700">Meta Description Required</FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Articles must include a meta description.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="articleSpecs.seoRequirements.keywords"
              render={({ field }: any) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-white hover:bg-gray-50 transition-colors">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-700">Keywords Required</FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Articles must include target keywords.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="articleSpecs.seoRequirements.headingStructure"
              render={({ field }:any) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-white hover:bg-gray-50 transition-colors sm:col-span-2 lg:col-span-1">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-700">Proper Heading Structure</FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Articles must follow proper H1, H2, H3 hierarchy.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="articleSpecs.submissionGuidelines"
            render={({ field }:any) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800">Submission Guidelines</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed submission guidelines and requirements..."
                    className="min-h-[120px] border-gray-200 text-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-white resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Detailed guidelines for content submission and review process.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
