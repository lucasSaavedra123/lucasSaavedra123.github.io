// Strings de UI (chrome fijo: navbar, footer). Distinto del contenido personal
// del usuario, que vive en metadata.<locale>.yaml (ver src/lib/metadata.ts).
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const en = {
  "nav.home": "Home",
  "nav.about": "About Me",
  "nav.cv": "CV",
  "nav.publications": "Publications",
  "nav.researchInterests": "Research Interests",
  "researchInterests.references": "References",
  "nav.blog": "Blog",
  "nav.news": "News",
  "nav.contact": "Contact",
  "theme.toggle.toDark": "Switch to dark theme",
  "theme.toggle.toLight": "Switch to light theme",
  "language.label": "Language",
  "footer.copyright": "© {year} {name}",
  "hero.cta.resume": "View CV",
  "news.heading": "News",
  "news.viewAll": "View all →",
  "news.empty": "No news to share at the moment — check back soon.",
  "contact.schedule": "Schedule a meeting",
  "about.greeting": "Hi, I'm",
  "cv.download.cv": "Download CV",
  "cv.download.resume": "Download Resumé",
  "cv.section.contact": "Contact",
  "cv.section.education": "Education",
  "cv.section.experience": "Experience",
  "cv.section.skills": "Skills",
  "cv.section.certificates": "Certificates",
  "cv.section.courses": "Courses",
  "cv.section.interests": "Interests",
  "cv.experience.research": "Research",
  "cv.experience.teaching": "Teaching",
  "cv.experience.industry": "Industry",
  "cv.contact.dob": "Date of birth",
  "cv.contact.nationalities": "Citizenships",
  "publications.section.journal": "Full-Length Publications in International Peer Reviewed Journals",
  "publications.section.underReview": "Under review",
  "publications.section.conference": "Presentations at International Conferences",
  "publications.action.abstract": "Abstract",
  "publications.action.bibtex": "BibTeX",
  "publications.action.doi": "DOI",
  "publications.action.website": "Website",
  "publications.action.pdf": "PDF",
  "publications.action.copy": "Copy",
  "publications.action.copied": "Copied!",
  "publications.scholar.badge": "Google Scholar citations",
  "a11y.skipToContent": "Skip to main content",
  "error404.title": "Page not found",
  "error404.message": "The page you're looking for doesn't exist or was moved.",
  "error404.backHome": "Back to Home",
} as const;

type Dictionary = typeof en;
export type UiKey = keyof Dictionary;

// es: { ... } — se agrega cuando se sume soporte real de español.
const dictionaries: Partial<Record<Locale, Dictionary>> = { en };

export function t(locale: Locale, key: UiKey): string {
  const dict = dictionaries[locale] ?? dictionaries[defaultLocale];
  return (dict as Dictionary)[key];
}
