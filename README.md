# BeyondLabs_assignment

Backlink Marketplace 
This is a feature-rich web application simulating a Backlink Marketplace, where users can list their websites and describe the backlink-related services they offer. This project was built as part of the technical evaluation for the Senior Frontend Developer role at Beyond Labs.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/shweta1007/BeyondLabs_assignment.git
   cd BeyondLabs_assignment

2. ** Install dependencies
    ```bash
   npm install

3. Run the development server
   ```bash
   npm run dev

4. Open in browser
   ```bash
   Visit: http://localhost:3000


## 🚀 Deployment
The app is deployed on Vercel:
🔗 Live Demo

### Features
🗂 Website List Page

Paginated table listing all websites.
Columns: Website URL, Primary Language, Country, Offers Summary, Edit.
Add Website button (navigates to create mode).
Row click navigates to edit mode with pre-filled form.
Table updates instantly on new additions or edits via global state (Zustand).

🧾 Website Details Page
A multi-section form segmented as:

A. Website Details
Fields: Website name, Website URL, Status, Categories, Description.

B. Offers
Normal Offers: Guest Post Price, Link Insertion Price.

Grey Niche Offers: Guest Post & Link Insertion for 6 niches.

Homepage Offer: Price and Description.

C. Article Specifications
Dynamic editorial input section.

🎯 Additional Highlights
Pixel-perfect UI using Tailwind CSS based on provided Figma.
Smooth UX with clear form validation using Zod + React Hook Form.
Modular components and scalable folder structure.
Form state management optimized for performance.


Data persistence with localStorage for unsaved progress.

🧑‍💻 Tech Stack
Framework	 - Next.js
Styling	- Tailwind CSS
UI Components	- shadcn/ui
State Management - Zustand
Form Handling	 - React Hook Form
Validation -	Zod
Type Safety	- TypeScript
Routing	- Next.js App Router


💾 Bonus Features
🚦 Empty state and validation feedback.
🧹 Optimized rendering using useMemo, useFormContext, and dynamic imports.


Author: Shweta Dhote
