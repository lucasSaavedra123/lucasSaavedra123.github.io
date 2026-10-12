import type { SocialPlatformKey } from "../icons/social";

// Fuente de datos única y simple del "chrome" del sitio (nombre, resumen,
// contacto, redes, CV, etc.). Reemplaza la vieja capa de metadata (YAML +
// loader + Zod), que se eliminó. Es un objeto TS plano: sin parseo ni
// validación en runtime, el tipo lo da `Profile`.
//
// Los papers NO viven acá: se leen del .bib local en src/lib/publications.ts.
//
// Casi todo es placeholder ("poné cualquier cosa") salvo lo que ya es real;
// completá los datos reales (redes, mail, bio, CV, etc.) directamente acá.

export interface Email {
  address: string;
  label: string;
}

export interface SocialLink {
  platform: SocialPlatformKey;
  url: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  start_date: string; // "YYYY-MM"
  end_date: string; // "YYYY-MM" o "present"
  location: string;
  highlights: string[];
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  start_date: string;
  end_date: string;
  location: string;
  highlights: string[];
  highlights_short: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Course {
  name: string;
  institution: string;
  date: string;
}

export interface NewsItem {
  date: string; // "YYYY-MM-DD"
  text: string;
  link?: string;
}

export interface Profile {
  personal: {
    full_name: string;
    display_name: string;
    roles: string[];
    location: string;
    photo_url: string;
  };
  summary: {
    full: string;
    short: string;
  };
  contact: {
    emails: Email[];
    phone: string;
    calendly_url: string;
    intro: string;
  };
  social: SocialLink[];
  about: {
    bio: string[];
  };
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  interests: string[];
  courses: Course[];
  news: NewsItem[];
  cv_pdf_url: string;
  resume_pdf_url: string;
}

export const profile: Profile = {
  personal: {
    full_name: "Lucas Ariel Saavedra",
    display_name: "Lucas A. Saavedra",
    roles: ["Software Engineer", "Researcher"],
    location: "Buenos Aires, Argentina",
    photo_url: "/images/placeholder-photo.svg",
  },
  summary: {
    full: "Placeholder professional summary. Replace with the real CV summary.",
    short: "Placeholder short summary for About Me and meta description.",
  },
  contact: {
    emails: [{ address: "placeholder@example.com", label: "Personal" }],
    phone: "",
    calendly_url: "https://calendly.com/placeholder",
    intro:
      "Placeholder intro: feel free to reach out by email or schedule a meeting below.",
  },
  social: [
    { platform: "github", url: "https://github.com/placeholder" },
    { platform: "linkedin", url: "https://linkedin.com/in/placeholder" },
    { platform: "x", url: "https://x.com/placeholder" },
    {
      platform: "researchgate",
      url: "https://www.researchgate.net/profile/placeholder",
    },
    {
      platform: "google_scholar",
      url: "https://scholar.google.com/citations?user=placeholder",
    },
    { platform: "orcid", url: "https://orcid.org/0000-0000-0000-0000" },
  ],
  about: {
    bio: [
      "Placeholder biography paragraph one. This is where the real, narrative story of the user's background and path would go — replace with the actual biography.",
      "Placeholder biography paragraph two. It would continue the narrative, covering education, early interests, and how the user got into their current field.",
      "Placeholder biography paragraph three. It would wrap up with current focus, what the user is working on now, and what they're looking for next.",
    ],
  },
  education: [
    {
      institution: "Placeholder University",
      degree: "M.Sc. in Placeholder Engineering",
      start_date: "2018-03",
      end_date: "2020-12",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Placeholder highlight: thesis on a placeholder research topic.",
        "Placeholder highlight: graduated with placeholder honors.",
      ],
    },
    {
      institution: "Placeholder Institute of Technology",
      degree: "B.Sc. in Placeholder Science",
      start_date: "2013-03",
      end_date: "2018-01",
      location: "Buenos Aires, Argentina",
      highlights: [],
    },
  ],
  experience: [
    {
      organization: "Placeholder Labs",
      role: "Placeholder Senior Engineer",
      start_date: "2022-01",
      end_date: "present",
      location: "Remote",
      highlights: [
        "Placeholder achievement: led a placeholder project end-to-end.",
        "Placeholder achievement: mentored placeholder junior engineers.",
      ],
      highlights_short: ["Placeholder achievement: led a placeholder project."],
    },
    {
      organization: "Placeholder Research Group",
      role: "Placeholder Research Assistant",
      start_date: "2019-06",
      end_date: "2021-12",
      location: "Buenos Aires, Argentina",
      highlights: ["Placeholder achievement: co-authored a placeholder paper."],
      highlights_short: [],
    },
  ],
  skills: [
    { category: "Languages", items: ["Placeholder language A", "Placeholder language B"] },
    { category: "Tools", items: ["Placeholder tool A", "Placeholder tool B"] },
    { category: "Research", items: ["Placeholder research skill A"] },
  ],
  interests: [
    "Placeholder interest: artificial intelligence",
    "Placeholder interest: mathematics",
    "Placeholder interest: chess",
  ],
  courses: [
    {
      name: "Placeholder Advanced Course",
      institution: "Placeholder Online Academy",
      date: "2021-05",
    },
  ],
  news: [
    {
      date: "2026-08-15",
      text: "Placeholder news item: gave a talk at a placeholder conference.",
    },
    {
      date: "2026-06-02",
      text: "Placeholder news item: started a new placeholder research project.",
      link: "https://example.com/placeholder-project",
    },
    {
      date: "2026-04-20",
      text: "Placeholder news item: paper accepted at a placeholder venue.",
    },
    {
      date: "2026-02-10",
      text: "Placeholder news item: joined a placeholder organization.",
    },
    {
      date: "2026-01-05",
      text: "Placeholder news item: launched this personal website.",
    },
  ],
  cv_pdf_url: "/cv/cv-en.pdf",
  resume_pdf_url: "/cv/resume-en.pdf",
};
