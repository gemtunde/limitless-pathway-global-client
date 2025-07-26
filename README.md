# Limitless Global Pathways - Study Abroad Consultancy

A modern, responsive website for a study abroad consultancy firm built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **🎨 Modern Design**: Clean, professional design with smooth animations
- **📱 Responsive**: Fully responsive across all devices
- **⚡ Fast**: Built with Next.js 14 App Router for optimal performance
- **🔧 TypeScript**: Type-safe development experience
- **🎯 Form Validation**: Robust form validation with React Hook Form and Zod
- **💫 Animations**: Smooth animations using Framer Motion
- **🎨 UI Components**: Modern UI components with Shadcn/UI and Tailwind CSS

## Pages

### Main Pages
- **Home**: Landing page with hero section, services overview, testimonials
- **About**: Company information, mission, values, and team
- **Services**: Detailed service offerings and process
- **Contact**: Contact form with validation and company information
- **Scholarships**: Available scholarship opportunities
- **Countries**: Study destinations overview

### Authentication Pages
- **Login**: User authentication with form validation
- **Register**: User registration with password confirmation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Forms**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd limitless-global-pathways
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── countries/         # Countries page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── scholarships/      # Scholarships page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/                # UI components (Shadcn/UI)
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Footer.tsx         # Footer component
│   └── ...                # Other components
└── lib/                   # Utility functions
    ├── utils.ts           # Utility functions
    └── validations.ts     # Form validation schemas
```

## Key Features

### 🎨 Design System
- Professional blue and white color palette
- Consistent spacing and typography
- Hover effects and smooth transitions
- Modern card-based layouts

### 📝 Form Validation
- Contact form with comprehensive validation
- Login/Register forms with secure password handling
- Real-time validation feedback
- Success/error states

### 🎬 Animations
- Smooth page transitions
- Scroll-triggered animations
- Interactive hover effects
- Loading states

### 📱 Responsive Design
- Mobile-first approach
- Responsive navigation
- Optimized for all screen sizes
- Touch-friendly interactions

## Customization

### Colors
The color scheme can be customized in `src/app/globals.css`:
- Primary: Blue (#3b82f6)
- Secondary: Yellow (#eab308)
- Accent: Various shades of blue and gray

### Content
- Update company information in respective page components
- Modify service offerings in `/services/page.tsx`
- Update scholarship data in `/scholarships/page.tsx`
- Customize country information in `/countries/page.tsx`

## Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any other hosting platform supporting Node.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
