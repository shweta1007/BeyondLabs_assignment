"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useWebsiteStore } from "@/lib/store"
import type { WebsiteFormData } from "@/types/website"
import { websiteFormSchema, type WebsiteFormSchema } from "@/lib/validation"
import { WebsiteDetailsSection } from "@/components/website-form/website-details-section"
import { OffersSection } from "@/components/website-form/offers-section"
import { ArticleSpecsSection } from "@/components/website-form/article-specs-section"

export default function NewWebsitePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addWebsite, setLoading, isLoading } = useWebsiteStore()

  const form = useForm<WebsiteFormSchema>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      category: "",
      status: "active",
      offers: {
        pricing: {
          type: "free",
        },
        features: [""],
        targetAudience: [""],
        uniqueSellingPoints: [""],
      },
      articleSpecs: {
        contentTypes: [""],
        wordCountRange: {
          min: 500,
          max: 2000,
        },
        toneOfVoice: [""],
        requiredSections: [""],
        seoRequirements: {
          metaDescription: false,
          keywords: false,
          headingStructure: false,
        },
        submissionGuidelines: "",
      },
    },
  })

  const onSubmit = async (data: WebsiteFormSchema) => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addWebsite(data as WebsiteFormData)

      toast({
        title: "🎉 Success",
        description: "Website created successfully!",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to create website. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Add New Website
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Create a new website entry with detailed specifications and requirements.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <WebsiteDetailsSection form={form} />
            <OffersSection form={form} />
            <ArticleSpecsSection form={form} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                disabled={isLoading}
                className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50 order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 order-1 sm:order-2"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Website
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
