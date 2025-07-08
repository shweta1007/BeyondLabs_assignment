import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Website, WebsiteFormData } from "@/types/website"

interface WebsiteStore {
  websites: Website[]
  currentWebsite: Website | null
  isLoading: boolean

  // Actions
  addWebsite: (website: WebsiteFormData) => void
  updateWebsite: (id: string, website: WebsiteFormData) => void
  deleteWebsite: (id: string) => void
  getWebsite: (id: string) => Website | undefined
  setCurrentWebsite: (website: Website | null) => void
  setLoading: (loading: boolean) => void
}

// Static website data
const staticWebsites: Website[] = [
  {
    id: "website-1",
    name: "TechCrunch",
    url: "https://techcrunch.com",
    description:
      "Leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
    category: "News",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    offers: {
      pricing: {
        type: "freemium",
      },
      features: ["Breaking Tech News", "Startup Coverage", "Product Reviews", "Industry Analysis"],
      targetAudience: ["Tech Entrepreneurs", "Investors", "Tech Enthusiasts", "Startup Founders"],
      uniqueSellingPoints: ["Exclusive Startup Scoops", "Expert Analysis", "Global Tech Coverage"],
    },
    articleSpecs: {
      contentTypes: ["News Articles", "Product Reviews", "Startup Profiles", "Industry Reports"],
      wordCountRange: { min: 800, max: 2500 },
      toneOfVoice: ["Professional", "Authoritative", "Engaging"],
      requiredSections: ["Headline", "Lead", "Body", "Conclusion", "Related Links"],
      seoRequirements: {
        metaDescription: true,
        keywords: true,
        headingStructure: true,
      },
      submissionGuidelines:
        "Articles must be original, well-researched, and include credible sources. All claims must be fact-checked and verified.",
    },
  },
  {
    id: "website-2",
    name: "Shopify",
    url: "https://shopify.com",
    description:
      "Complete commerce platform that lets you start, grow, and manage a business. Build your online store with Shopify's ecommerce software.",
    category: "E-commerce",
    status: "active",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-22T16:20:00Z",
    offers: {
      pricing: {
        type: "paid",
        amount: 29,
        currency: "USD",
        billingCycle: "monthly",
      },
      features: [
        "Online Store Builder",
        "Payment Processing",
        "Inventory Management",
        "Marketing Tools",
        "Analytics Dashboard",
      ],
      targetAudience: ["Small Business Owners", "Entrepreneurs", "E-commerce Managers", "Retail Businesses"],
      uniqueSellingPoints: ["Easy Setup", "Scalable Platform", "Extensive App Store", "24/7 Support"],
    },
    articleSpecs: {
      contentTypes: ["How-to Guides", "Case Studies", "Feature Announcements", "Best Practices"],
      wordCountRange: { min: 1000, max: 3000 },
      toneOfVoice: ["Helpful", "Professional", "Encouraging"],
      requiredSections: ["Introduction", "Step-by-step Instructions", "Examples", "Tips", "Conclusion"],
      seoRequirements: {
        metaDescription: true,
        keywords: true,
        headingStructure: true,
      },
      submissionGuidelines:
        "Content should be actionable and help merchants grow their business. Include real examples and practical tips.",
    },
  },
  {
    id: "website-3",
    name: "Notion",
    url: "https://notion.so",
    description:
      "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
    category: "SaaS",
    status: "active",
    createdAt: "2024-01-08T11:45:00Z",
    updatedAt: "2024-01-25T13:30:00Z",
    offers: {
      pricing: {
        type: "freemium",
      },
      features: ["Note Taking", "Database Management", "Project Planning", "Team Collaboration", "Template Library"],
      targetAudience: ["Knowledge Workers", "Students", "Project Managers", "Content Creators"],
      uniqueSellingPoints: [
        "All-in-one Workspace",
        "Flexible Building Blocks",
        "Powerful Databases",
        "Beautiful Interface",
      ],
    },
    articleSpecs: {
      contentTypes: ["Tutorials", "Templates", "Productivity Tips", "Use Cases"],
      wordCountRange: { min: 600, max: 2000 },
      toneOfVoice: ["Friendly", "Helpful", "Inspiring"],
      requiredSections: ["Overview", "Setup Instructions", "Examples", "Pro Tips", "Resources"],
      seoRequirements: {
        metaDescription: true,
        keywords: true,
        headingStructure: true,
      },
      submissionGuidelines:
        "Focus on practical applications and real-world use cases. Include screenshots and step-by-step instructions.",
    },
  },
  {
    id: "website-4",
    name: "Dribbble",
    url: "https://dribbble.com",
    description:
      "Dribbble is the world's leading community for creatives to share, grow, and get hired. Discover and connect with designers worldwide.",
    category: "Portfolio",
    status: "active",
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-23T10:15:00Z",
    offers: {
      pricing: {
        type: "freemium",
      },
      features: ["Portfolio Showcase", "Design Community", "Job Board", "Design Resources", "Inspiration Feed"],
      targetAudience: ["Graphic Designers", "UI/UX Designers", "Creative Directors", "Design Students"],
      uniqueSellingPoints: [
        "Premium Design Community",
        "High-Quality Showcases",
        "Networking Opportunities",
        "Career Growth",
      ],
    },
    articleSpecs: {
      contentTypes: ["Design Showcases", "Tutorials", "Industry Insights", "Designer Interviews"],
      wordCountRange: { min: 400, max: 1500 },
      toneOfVoice: ["Creative", "Inspiring", "Professional"],
      requiredSections: ["Visual Introduction", "Design Process", "Key Features", "Inspiration"],
      seoRequirements: {
        metaDescription: true,
        keywords: false,
        headingStructure: true,
      },
      submissionGuidelines:
        "Emphasize visual storytelling. Include high-quality images and focus on design process and inspiration.",
    },
  },
  {
    id: "website-5",
    name: "Medium",
    url: "https://medium.com",
    description:
      "Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing.",
    category: "Blog",
    status: "active",
    createdAt: "2024-01-05T16:30:00Z",
    updatedAt: "2024-01-24T12:45:00Z",
    offers: {
      pricing: {
        type: "freemium",
      },
      features: ["Publishing Platform", "Reader Network", "Monetization", "Analytics", "Community Engagement"],
      targetAudience: ["Writers", "Thought Leaders", "Content Creators", "Professionals"],
      uniqueSellingPoints: [
        "Quality Content Focus",
        "Built-in Audience",
        "Clean Reading Experience",
        "Writer-Friendly Tools",
      ],
    },
    articleSpecs: {
      contentTypes: ["Opinion Pieces", "How-to Articles", "Personal Stories", "Industry Analysis"],
      wordCountRange: { min: 800, max: 4000 },
      toneOfVoice: ["Thoughtful", "Personal", "Engaging"],
      requiredSections: ["Compelling Hook", "Main Arguments", "Supporting Evidence", "Call to Action"],
      seoRequirements: {
        metaDescription: false,
        keywords: false,
        headingStructure: true,
      },
      submissionGuidelines:
        "Focus on original insights and personal experiences. Write in a conversational tone and engage with readers.",
    },
  },
  {
    id: "website-6",
    name: "Stripe",
    url: "https://stripe.com",
    description:
      "Stripe is a suite of payment APIs that powers commerce for online businesses of all sizes, including fraud prevention, and subscription management.",
    category: "SaaS",
    status: "active",
    createdAt: "2024-01-03T08:45:00Z",
    updatedAt: "2024-01-26T15:20:00Z",
    offers: {
      pricing: {
        type: "paid",
        amount: 2.9,
        currency: "USD",
        billingCycle: "one-time",
      },
      features: [
        "Payment Processing",
        "Subscription Management",
        "Fraud Prevention",
        "Global Payments",
        "Developer APIs",
      ],
      targetAudience: ["Developers", "E-commerce Businesses", "SaaS Companies", "Marketplaces"],
      uniqueSellingPoints: ["Developer-First", "Global Scale", "Advanced Security", "Comprehensive APIs"],
    },
    articleSpecs: {
      contentTypes: ["Technical Documentation", "Integration Guides", "Best Practices", "Case Studies"],
      wordCountRange: { min: 1200, max: 3500 },
      toneOfVoice: ["Technical", "Clear", "Authoritative"],
      requiredSections: ["Overview", "Implementation", "Code Examples", "Testing", "Troubleshooting"],
      seoRequirements: {
        metaDescription: true,
        keywords: true,
        headingStructure: true,
      },
      submissionGuidelines:
        "Technical accuracy is paramount. Include working code examples and comprehensive testing instructions.",
    },
  },
  {
    id: "website-7",
    name: "Behance",
    url: "https://behance.net",
    description:
      "Behance is the world's largest creative network for showcasing and discovering creative work. Connect with creative professionals worldwide.",
    category: "Portfolio",
    status: "pending",
    createdAt: "2024-01-18T13:15:00Z",
    updatedAt: "2024-01-27T09:30:00Z",
    offers: {
      pricing: {
        type: "free",
      },
      features: [
        "Creative Portfolio",
        "Project Showcase",
        "Creative Community",
        "Adobe Integration",
        "Talent Discovery",
      ],
      targetAudience: ["Creative Professionals", "Art Directors", "Photographers", "Illustrators"],
      uniqueSellingPoints: [
        "Adobe Ecosystem",
        "Professional Network",
        "High-Quality Showcases",
        "Industry Recognition",
      ],
    },
    articleSpecs: {
      contentTypes: ["Project Case Studies", "Creative Process", "Behind the Scenes", "Industry Trends"],
      wordCountRange: { min: 500, max: 2000 },
      toneOfVoice: ["Creative", "Inspiring", "Visual"],
      requiredSections: ["Project Overview", "Creative Process", "Visual Showcase", "Results"],
      seoRequirements: {
        metaDescription: true,
        keywords: false,
        headingStructure: true,
      },
      submissionGuidelines:
        "Showcase the creative process with high-quality visuals. Focus on storytelling and inspiration.",
    },
  },
  {
    id: "website-8",
    name: "GitHub",
    url: "https://github.com",
    description:
      "GitHub is where over 100 million developers shape the future of software, together. Build, ship, and maintain your projects on GitHub.",
    category: "SaaS",
    status: "inactive",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-28T11:45:00Z",
    offers: {
      pricing: {
        type: "freemium",
      },
      features: ["Version Control", "Code Collaboration", "Project Management", "CI/CD", "Security Features"],
      targetAudience: ["Software Developers", "DevOps Engineers", "Open Source Contributors", "Development Teams"],
      uniqueSellingPoints: [
        "Largest Developer Community",
        "Integrated DevOps",
        "Open Source Hub",
        "Enterprise Security",
      ],
    },
    articleSpecs: {
      contentTypes: ["Technical Tutorials", "Open Source Guides", "Best Practices", "Feature Announcements"],
      wordCountRange: { min: 1000, max: 4000 },
      toneOfVoice: ["Technical", "Community-Focused", "Educational"],
      requiredSections: ["Introduction", "Prerequisites", "Step-by-Step Guide", "Code Examples", "Next Steps"],
      seoRequirements: {
        metaDescription: true,
        keywords: true,
        headingStructure: true,
      },
      submissionGuidelines:
        "Provide clear, actionable technical content with working code examples. Focus on community best practices.",
    },
  },
]

export const useWebsiteStore = create<WebsiteStore>()(
  persist(
    (set, get) => ({
      websites: staticWebsites,
      currentWebsite: null,
      isLoading: false,

      addWebsite: (websiteData) => {
        const newWebsite: Website = {
          ...websiteData,
          id: `website-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          websites: [newWebsite, ...state.websites],
        }))
      },

      updateWebsite: (id, websiteData) => {
        set((state) => ({
          websites: state.websites.map((website) =>
            website.id === id ? { ...website, ...websiteData, updatedAt: new Date().toISOString() } : website,
          ),
        }))
      },

      deleteWebsite: (id) => {
        set((state) => ({
          websites: state.websites.filter((website) => website.id !== id),
        }))
      },

      getWebsite: (id) => {
        return get().websites.find((website) => website.id === id)
      },

      setCurrentWebsite: (website) => {
        set({ currentWebsite: website })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: "website-store",
    },
  ),
)
