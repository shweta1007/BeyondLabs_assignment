export interface Website {
  id: string
  name: string
  url: string
  description: string
  category: string
  status: "active" | "inactive" | "pending"
  createdAt: string
  updatedAt: string

  // Offers section
  offers: {
    pricing: {
      type: "free" | "paid" | "freemium"
      amount?: number
      currency?: string
      billingCycle?: "monthly" | "yearly" | "one-time"
    }
    features: string[]
    targetAudience: string[]
    uniqueSellingPoints: string[]
  }

  // Article Specifications
  articleSpecs: {
    contentTypes: string[]
    wordCountRange: {
      min: number
      max: number
    }
    toneOfVoice: string[]
    requiredSections: string[]
    seoRequirements: {
      metaDescription: boolean
      keywords: boolean
      headingStructure: boolean
    }
    submissionGuidelines: string
  }
}

export interface WebsiteFormData extends Omit<Website, "id" | "createdAt" | "updatedAt"> {}
