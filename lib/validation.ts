import { z } from "zod"

export const websiteFormSchema = z.object({
  name: z.string().min(1, "Website name is required").max(100, "Name must be less than 100 characters"),
  url: z.string().url("Please enter a valid URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "inactive", "pending"]),

  offers: z.object({
    pricing: z
      .object({
        type: z.enum(["free", "paid", "freemium"]),
        amount: z.number().optional(),
        currency: z.string().optional(),
        billingCycle: z.enum(["monthly", "yearly", "one-time"]).optional(),
      })
      .refine(
        (data) => {
          if (data.type === "paid") {
            return data.amount && data.amount > 0 && data.currency && data.billingCycle
          }
          return true
        },
        {
          message: "Paid pricing requires amount, currency, and billing cycle",
          path: ["amount"],
        },
      ),
    features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
    targetAudience: z
      .array(z.string().min(1, "Audience cannot be empty"))
      .min(1, "At least one target audience is required"),
    uniqueSellingPoints: z.array(z.string().min(1, "USP cannot be empty")).min(1, "At least one USP is required"),
  }),

  articleSpecs: z.object({
    contentTypes: z
      .array(z.string().min(1, "Content type cannot be empty"))
      .min(1, "At least one content type is required"),
    wordCountRange: z
      .object({
        min: z.number().min(1, "Minimum word count must be at least 1"),
        max: z.number().min(1, "Maximum word count must be at least 1"),
      })
      .refine((data) => data.max > data.min, {
        message: "Maximum word count must be greater than minimum",
        path: ["max"],
      }),
    toneOfVoice: z.array(z.string().min(1, "Tone cannot be empty")).min(1, "At least one tone is required"),
    requiredSections: z.array(z.string().min(1, "Section cannot be empty")).min(1, "At least one section is required"),
    seoRequirements: z.object({
      metaDescription: z.boolean(),
      keywords: z.boolean(),
      headingStructure: z.boolean(),
    }),
    submissionGuidelines: z.string().min(10, "Guidelines must be at least 10 characters"),
  }),
})

export type WebsiteFormSchema = z.infer<typeof websiteFormSchema>
