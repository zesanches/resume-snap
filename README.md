# ResumeSnap - Professional Resume Builder

A modern, client-side resume builder that helps users create professional resumes and download them as PDF files. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ **No Backend Required** - Everything runs in the browser
- 📝 **Easy Form Builder** - Simple, intuitive form interface
- 👀 **Live Preview** - See your resume update in real-time
- 📄 **PDF Export** - High-quality PDF generation using html2pdf.js
- 💰 **Freemium Model** - 2 free downloads, upgrade for unlimited
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔒 **Privacy First** - No data stored on servers
- 🎨 **Professional Templates** - Clean, ATS-friendly design
- ⚡ **Fast & Lightweight** - Optimized for performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **PDF Generation**: html2pdf.js
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/resumesnap.git
   cd resumesnap
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
resumesnap/
├── app/
│ ├── page.tsx # Landing page
│ ├── create/
│ │ └── page.tsx # Resume builder page
│ ├── layout.tsx # Root layout
│ └── globals.css # Global styles
├── components/
│ ├── ResumeForm.tsx # Form component
│ ├── ResumePreview.tsx # Preview component
│ ├── PaymentButton.tsx # Monetization component
│ └── ui/ # shadcn/ui components
├── types/
│ └── resume.ts # TypeScript interfaces
└── README.md
\`\`\`

## Key Features Explained

### 1. Client-Side PDF Generation

Uses html2pdf.js to convert the HTML resume preview into a high-quality PDF without requiring a server.

### 2. Freemium Monetization

- Users get 2 free PDF downloads
- Download count stored in localStorage
- Upgrade to "Pro" for unlimited downloads
- Simulated payment flow (integrate with Stripe for production)

### 3. Live Preview

Real-time preview updates as users type in the form fields, providing immediate visual feedback.

### 4. Privacy-First Approach

- No user data sent to servers
- Everything processed client-side
- No user accounts or registration required

### 5. Responsive Design

Fully responsive design that works on all device sizes, built with Tailwind CSS.

## Customization

### Adding New Resume Templates

1. Create a new preview component in `components/`
2. Add template selection to the form
3. Update the PDF generation logic

### Integrating Real Payments

Replace the simulated payment in `PaymentButton.tsx` with actual Stripe integration:

\`\`\`typescript
// Install Stripe
npm install @stripe/stripe-js

// Add to PaymentButton.tsx
import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
// Implement Stripe Checkout
\`\`\`

### Adding More Form Fields

1. Update the `ResumeData` interface in `types/resume.ts`
2. Add form fields in `ResumeForm.tsx`
3. Update the preview in `ResumePreview.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any static hosting platform:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Environment Variables

For production with real payments, add:
\`\`\`env
NEXT*PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live*...
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@resumesnap.com or create an issue on GitHub.

## Roadmap

- [ ] Multiple resume templates
- [ ] Real Stripe integration
- [ ] Cover letter builder
- [ ] LinkedIn import
- [ ] Resume scoring/tips
- [ ] Dark mode
- [ ] Multi-language support

---

Built with ❤️ using Next.js and TypeScript
