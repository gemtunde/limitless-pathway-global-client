// data/countries.ts

export type InfoItem = {
  title: string;
  description: string;
};

export type CountryData = {
  name: string;
  slug: string;
  flagCode: string;
  description: string;
  highlights: InfoItem[];
  scholarships: InfoItem[];
  visaRequirements: string[];
  benefits: InfoItem[];
};

export const countriesData: CountryData[] = [
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    flagCode: "GB",
    description:
      "Prestigious universities, a global education hub, and access to top careers.",
    highlights: [
      {
        title: "Top Universities",
        description:
          "Home to Oxford, Cambridge, and Russell Group institutions",
      },
      {
        title: "Global Recognition",
        description: "Degrees recognized worldwide",
      },
      {
        title: "Innovation",
        description: "Strong focus on research and innovation",
      },
    ],
    scholarships: [
      {
        title: "Chevening Scholarships",
        description: "UK government global scholarship program",
      },
      {
        title: "Commonwealth Scholarships",
        description: "Scholarships for students from Commonwealth countries",
      },
      {
        title: "University Grants",
        description: "Institution-specific scholarships and bursaries",
      },
    ],
    visaRequirements: [
      "Student visa (Tier 4)",
      "Confirmation of Acceptance for Studies (CAS)",
      "Proof of financial means and English proficiency",
    ],
    benefits: [
      {
        title: "Career Opportunities",
        description: "Access to top-tier career paths",
      },
      {
        title: "Cultural Experience",
        description: "Rich history and multicultural society",
      },
      {
        title: "Work While Studying",
        description: "Permission to work part-time during studies",
      },
    ],
  },
  {
    name: "United States",
    slug: "united-states",
    flagCode: "US",
    description: "World-class universities offering diverse courses.",
    highlights: [
      { title: "Ivy League", description: "Top-ranked Ivy League schools" },
      {
        title: "Diversity",
        description: "Diverse programs and specializations",
      },
      { title: "Flexibility", description: "Flexible academic system" },
    ],
    scholarships: [
      {
        title: "Fulbright Program",
        description: "Prestigious exchange program for international students",
      },
      {
        title: "Hubert Humphrey Fellowship",
        description: "Non-degree program for mid-career professionals",
      },
      { title: "AAUW Fellowships", description: "Funding for women scholars" },
    ],
    visaRequirements: [
      "F-1 Visa application",
      "I-20 form from a SEVP-certified school",
      "Proof of financial support",
    ],
    benefits: [
      { title: "Research", description: "Cutting-edge research opportunities" },
      { title: "Campus Life", description: "Multicultural campus life" },
      { title: "OPT", description: "Optional Practical Training (OPT)" },
    ],
  },
  {
    name: "Canada",
    slug: "canada",
    flagCode: "CA",
    description: "Known for quality education and multicultural diversity.",
    highlights: [
      { title: "Affordable Tuition", description: "Affordable tuition fees" },
      { title: "Quality of Life", description: "High quality of life" },
      { title: "Work Permit", description: "Post-graduation work permit" },
    ],
    scholarships: [
      {
        title: "Vanier Scholarships",
        description: "Support for doctoral studies",
      },
      {
        title: "Lester B. Pearson",
        description: "Undergraduate scholarships for international students",
      },
      {
        title: "Commonwealth Scholarship",
        description: "For students from Commonwealth countries",
      },
    ],
    visaRequirements: [
      "Study Permit application",
      "Letter of Acceptance",
      "Proof of funds and medical exam",
    ],
    benefits: [
      { title: "Safety", description: "Safe and inclusive society" },
      {
        title: "Residency Pathway",
        description: "Pathway to permanent residency",
      },
      {
        title: "Global Recognition",
        description: "Internationally recognized degrees",
      },
    ],
  },
  {
    name: "Wales",
    slug: "wales",
    flagCode: "GB",
    description: "Welsh universities offer innovative teaching and research.",
    highlights: [
      { title: "Culture", description: "Cultural richness" },
      { title: "Cost of Living", description: "Affordable cost of living" },
      { title: "Community", description: "Close-knit student communities" },
    ],
    scholarships: [
      { title: "Global Wales", description: "Postgraduate scholarships" },
      {
        title: "Chevening",
        description: "Prestigious UK government scholarship",
      },
      {
        title: "Commonwealth Scholarships",
        description: "UK funding for students from Commonwealth",
      },
    ],
    visaRequirements: [
      "Student visa (Tier 4)",
      "Confirmation of Acceptance for Studies (CAS)",
      "English language proficiency",
    ],
    benefits: [
      { title: "Nature", description: "Stunning natural landscapes" },
      { title: "History", description: "Historic universities" },
      { title: "Student Support", description: "Supportive student services" },
    ],
  },
  {
    name: "Scotland",
    slug: "scotland",
    flagCode: "GB",
    description: "Famous for cutting-edge research and vibrant campus life.",
    highlights: [
      {
        title: "Ancient Universities",
        description: "Four of the world's oldest universities",
      },
      { title: "Innovation", description: "Strong focus on innovation" },
      {
        title: "Historic Cities",
        description: "Beautiful and historic cities",
      },
    ],
    scholarships: [
      {
        title: "Saltire Scholarships",
        description: "Scottish government scholarship",
      },
      { title: "Chevening", description: "UK global scholarship program" },
      {
        title: "University-specific",
        description: "Funding offered by individual universities",
      },
    ],
    visaRequirements: [
      "Student visa",
      "Letter of acceptance",
      "Proof of financial capability",
    ],
    benefits: [
      { title: "Heritage", description: "Rich cultural heritage" },
      { title: "Work Options", description: "Post-study work opportunities" },
      { title: "Community", description: "Warm and welcoming communities" },
    ],
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    flagCode: "NZ",
    description: "Quality education in a stunning natural environment.",
    highlights: [
      { title: "Recognition", description: "Globally recognized universities" },
      { title: "Part-Time Work", description: "Work while studying" },
      { title: "Research", description: "Research-driven curriculum" },
    ],
    scholarships: [
      {
        title: "NZ Int'l Scholarships",
        description: "New Zealand government scholarship",
      },
      {
        title: "Commonwealth Scholarships",
        description: "Funding for international students",
      },
      {
        title: "University Grants",
        description: "Offered by individual universities",
      },
    ],
    visaRequirements: [
      "Student visa",
      "Offer of Place",
      "Proof of funds and health insurance",
    ],
    benefits: [
      {
        title: "Friendly Society",
        description: "Welcoming social environment",
      },
      { title: "Adventure", description: "Adventure and outdoor lifestyle" },
      { title: "Residency", description: "Pathway to residence" },
    ],
  },
  {
    name: "Ireland",
    slug: "ireland",
    flagCode: "IE",
    description: "English-speaking education with rich cultural heritage.",
    highlights: [
      { title: "Job Market", description: "Strong job market for graduates" },
      {
        title: "Tech & Pharma",
        description: "Top global companies in tech and pharma",
      },
      { title: "Research", description: "Research excellence" },
    ],
    scholarships: [
      {
        title: "Ireland Govt Scholarships",
        description: "Scholarships by the Irish government",
      },
      {
        title: "University Scholarships",
        description: "Funding from Irish universities",
      },
      {
        title: "Fulbright Ireland",
        description: "Exchange program with the US",
      },
    ],
    visaRequirements: [
      "Study visa",
      "Letter of Acceptance",
      "Proof of financial means",
    ],
    benefits: [
      { title: "City Life", description: "Vibrant cities" },
      { title: "Work Rights", description: "Post-study work rights" },
      { title: "European Access", description: "Gateway to Europe" },
    ],
  },
];
