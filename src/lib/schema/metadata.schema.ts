import { z } from "zod";

const EmailSchema = z.object({
  address: z.email(),
  label: z.string(),
});

const SocialPlatform = z.enum([
  "github",
  "linkedin",
  "x",
  "researchgate",
  "google_scholar",
  "orcid",
]);

export type SocialPlatformKey = z.infer<typeof SocialPlatform>;

const SocialSchema = z.object({
  platform: SocialPlatform,
  url: z.url().or(z.literal("")),
});

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  start_date: z.string(),
  end_date: z.string(), // "YYYY-MM" o "present"
  location: z.string(),
  highlights: z.array(z.string()).default([]),
});

const ExperienceSchema = z.object({
  organization: z.string(),
  role: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  location: z.string(),
  highlights: z.array(z.string()).default([]),
  highlights_short: z.array(z.string()).default([]),
});

const SkillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()).default([]),
});

const CourseSchema = z.object({
  name: z.string(),
  institution: z.string(),
  date: z.string(),
});

const NewsItemSchema = z.object({
  date: z.string(), // "YYYY-MM-DD"
  text: z.string(),
  link: z.url().optional().or(z.literal("")),
});

export type NewsItem = z.infer<typeof NewsItemSchema>;

const AboutSchema = z.object({
  bio: z.array(z.string()).default([]), // párrafos narrativos largos (About Me)
});

export const MetadataSchema = z.object({
  personal: z.object({
    full_name: z.string(),
    display_name: z.string(),
    roles: z.array(z.string()),
    location: z.string(),
    photo_url: z.string(),
  }),
  summary: z.object({
    full: z.string(),
    short: z.string(),
  }),
  contact: z.object({
    emails: z.array(EmailSchema),
    phone: z.string().optional().default(""),
    calendly_url: z.string(),
    intro: z.string().default(""), // copy corto de la página Contacto (campo nuevo, Fase 7)
  }),
  social: z.array(SocialSchema),
  about: AboutSchema.default({ bio: [] }),
  education: z.array(EducationSchema).default([]),
  experience: z.array(ExperienceSchema).default([]),
  skills: z.array(SkillGroupSchema).default([]),
  interests: z.array(z.string()).default([]),
  courses: z.array(CourseSchema).default([]),
  news: z.array(NewsItemSchema).default([]),
  // No se incluye honors_awards: sección "Honores y Premios" descartada (ver plan.md).
  papers_source: z.url(),
  cv_pdf_url: z.string(),
  resume_pdf_url: z.string(), // PDF de "Resumé" separado del CV completo (campo nuevo, Fase 9)
});

export type Metadata = z.infer<typeof MetadataSchema>;
