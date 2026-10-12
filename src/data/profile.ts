import type { SocialPlatformKey } from "../icons/social";

// Fuente de datos única y simple del "chrome" del sitio (nombre, resumen,
// contacto, redes, CV, etc.). Reemplaza la vieja capa de metadata (YAML +
// loader + Zod), que se eliminó. Es un objeto TS plano: sin parseo ni
// validación en runtime, el tipo lo da `Profile`.
//
// Los papers NO viven acá: se leen del .bib local en src/lib/publications.ts.
//
// Datos extraídos del CV (personal_cv) y del resumé (personal_resume). Las
// secciones `interests` y la categoría `research` de `experience` las completa
// el usuario.

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
  start_date: string; // "YYYY-MM" o "YYYY"
  end_date: string; // "YYYY-MM", "YYYY" o "present"
  location: string;
  highlights: string[];
}

// La experiencia se divide en tres bloques en la página de CV.
export type ExperienceCategory = "research" | "teaching" | "industry";

export interface ExperienceEntry {
  category: ExperienceCategory;
  organization: string;
  role: string;
  start_date: string;
  end_date: string;
  location: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Course {
  name: string;
  institution: string; // vacío para certificaciones sin institución
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
    date_of_birth: string; // "YYYY-MM-DD"
    nationalities: string[];
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
  certificates: Course[];
  courses: Course[];
  news: NewsItem[];
  cv_pdf_url: string;
  resume_pdf_url: string;
}

export const profile: Profile = {
  personal: {
    full_name: "Lucas Ariel Saavedra",
    display_name: "Lucas A. Saavedra",
    roles: ["Computer Engineer", "Artificial Intelligence Researcher"],
    location: "Buenos Aires, Argentina",
    date_of_birth: "1999-04-30",
    nationalities: ["Argentina", "Spain"],
    photo_url: "/images/profile.jpg",
  },
  summary: {
    full: "Placeholder professional summary. Replace with the real CV summary.",
    short: "Placeholder short summary for About Me and meta description.",
  },
  contact: {
    emails: [
      { address: "lucasarielsaavedra@hotmail.com", label: "Personal" },
      { address: "lucasarielsaavedra@uca.edu.ar", label: "Academic" },
    ],
    phone: "",
    calendly_url: "https://calendly.com/placeholder",
    intro:
      "Placeholder intro: feel free to reach out by email or schedule a meeting below.",
  },
  social: [
    { platform: "github", url: "https://github.com/lucasSaavedra123" },
    { platform: "linkedin", url: "https://linkedin.com/in/lucassaave" },
    { platform: "x", url: "https://x.com/LucaasSaave" },
    {
      platform: "researchgate",
      url: "https://researchgate.net/profile/Lucas-Saavedra-3",
    },
    {
      platform: "google_scholar",
      url: "https://scholar.google.com/citations?user=vozUZ10AAAAJ",
    },
    { platform: "orcid", url: "https://orcid.org/0000-0002-3566-1154" },
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
      institution: "Pontifical Catholic University Argentina (UCA)",
      degree: "Computer Engineering",
      start_date: "2018",
      end_date: "2023",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Final work: Comparison of Machine Learning models for the analysis of anomalous diffusion of acetylcholine neurotransmitter receptor trajectories (grade: 10/10).",
        "GPA: 8.02/10.",
      ],
    },
  ],
  experience: [
    // Research: lo completa el usuario (ver research_experience.tex en personal_cv).
    // Agregar acá entradas con category: "research".

    // Teaching
    {
      category: "teaching",
      organization: "Pontifical Catholic University Argentina (UCA)",
      role: "Assistant Professor — Discrete Mathematics",
      start_date: "2024-03",
      end_date: "2024-06",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Main topics: number theory, graph theory, demonstration methods, Boolean algebra.",
      ],
    },
    {
      category: "teaching",
      organization: "Pontifical Catholic University Argentina (UCA)",
      role: "Assistant Professor — Data Oriented Programming",
      start_date: "2023-07",
      end_date: "2024-12",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Main topics: object-oriented programming (OOP), NumPy, Pandas, Python, Java, SQL, software design with UML.",
      ],
    },
    {
      category: "teaching",
      organization: "Pontifical Catholic University Argentina (UCA)",
      role: "Assistant Professor — Introduction to Data Science",
      start_date: "2023-03",
      end_date: "2025-06",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Main topics: definitions and concepts of artificial intelligence, introduction to artificial neural networks, scientific method.",
      ],
    },

    // Industry
    {
      category: "industry",
      organization: "Accenture",
      role: "Senior Full-Stack AI Developer",
      start_date: "2025-05",
      end_date: "present",
      location: "Buenos Aires, Argentina",
      highlights: [
        "LLM-based multi-agent systems (LangGraph, FastAPI, Azure OpenAI, Elasticsearch) for automated code migration between languages, data-quality testing, and AI-assisted accounting reconciliation.",
        "Dynamic social-network analysis platform combining a Neo4j knowledge graph and LLMs, including community detection of messages and users. Spring Boot batch classification pipeline and a LangGraph conversational agent exposed through a Next.js chat interface, plus an MCP (Model Context Protocol) server exposing the Neo4j graph as agent-consumable tools.",
        "Real-time computer vision systems (YOLO, OpenCV, TensorFlow) for vehicle detection, customer profiling, and dataset preparation for gas-station clients.",
        "Full-stack development with Next.js/React and enterprise Angular applications, deployed with Docker and Azure Pipelines.",
        "Research on Small Language Models (SLMs).",
        "Development of agents for automating the Software Development Life Cycle (SDLC) through Spec-Driven Development.",
        "CCTV camera-movement detection with computer vision: siamese neural networks (TensorFlow) comparing the current scene against a reference to detect angle changes, defocus, or scene changes while tolerating minor variations.",
  ],
    },
    {
      category: "industry",
      organization: "UpWork",
      role: "Freelancer",
      start_date: "2023-12",
      end_date: "2025-05",
      location: "Remote",
      highlights: [
        "Web scraping scripts with Python and Selenium, hosted on AWS Linux EC2 instances.",
        "YOLO training to identify basketball players in match videos from a European league, with a SQL database on Supabase fed by a handcrafted scraper of the FIBA website.",
        "Napari plugins (GUIs) combined with scikit-learn decision-tree classifiers to extract information from laser-spot images provided by the client.",
      ],
    },
    {
      category: "industry",
      organization: "Deloitte",
      role: "Back-End Developer",
      start_date: "2021-06",
      end_date: "2022-06",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Threat Intelligence back-end developer, working under Agile methodologies (Scrum).",
        "Developed Codex Gigas (a malware \"DNA\" profiling search engine) and ImageSimilarity (an SSIM-based image-grouping tool), plus ThreatConnect apps.",
        "Built with Python, Docker, MongoDB, and SQL.",
      ],
    },
    {
      category: "industry",
      organization: "Deloitte",
      role: "Cyber Risk Advisory Intern",
      start_date: "2021-01",
      end_date: "2021-06",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Offensive/defensive security and threat-intelligence fundamentals.",
      ],
    },
  ],
  skills: [
    { category: "Programming", items: ["Python", "Java", "C", "C++", "R", "LaTeX", "MATLAB"] },
    {
      category: "Technologies",
      items: [
        "Django",
        "REST API",
        "TensorFlow",
        "PyTorch",
        "Pandas",
        "NumPy",
        "SQL",
        "MongoDB",
        "Redis",
        "Selenium",
        "Docker",
        "YOLO",
        "LangGraph",
        "LangChain",
        "Azure OpenAI",
      ],
    },
    { category: "DevOps", items: ["AWS", "Docker", "CircleCI"] },
  ],
  // Interests: lo completa el usuario.
  interests: [],
  // Certificaciones (del CV, subrubric "Certifications").
  certificates: [
    { name: "IELTS Score: 7.5", institution: "", date: "2025" },
    { name: "Duolingo English Test (DET) Score: 135 (Advanced: CEFR C1)", institution: "", date: "2025" },
    { name: "AWS Certified Cloud Practitioner", institution: "", date: "2022" },
  ],
  courses: [
    { name: "Golang for Beginners", institution: "Udemy", date: "2026" },
    { name: "Kubernetes for the Absolute Beginners — Hands-on", institution: "Udemy", date: "2026" },
    { name: "Basic to Advanced: Retrieval-Augmented Generation (RAG)", institution: "Udemy", date: "2025" },
    { name: "Bioinformatics; Learn Docking & Mol Dynamics Simulation", institution: "Udemy", date: "2025" },
    { name: "Introduction to Statistics", institution: "Stanford Online, Coursera", date: "2025" },
    { name: "Deep Neural Networks with PyTorch", institution: "IBM, Coursera", date: "2024" },
    { name: "Natural Language Processing in TensorFlow", institution: "DeepLearning.AI, Coursera", date: "2022" },
    { name: "DeepLearning.AI TensorFlow Developer", institution: "DeepLearning.AI, Coursera", date: "2022" },
    { name: "Data Science", institution: "Coderhouse", date: "2022" },
    { name: "Machine Learning", institution: "Stanford Online, Coursera", date: "2021" },
    { name: "R Programming", institution: "Johns Hopkins University, Coursera", date: "2021" },
    { name: "Docker for the Absolute Beginner — Hands On — DevOps", institution: "Udemy", date: "2021" },
    { name: "Programming Foundations: Design Patterns", institution: "LinkedIn Learning", date: "2021" },
    { name: "The Data Scientist's Toolbox", institution: "Johns Hopkins University, Coursera", date: "2020" },
    { name: "Neural Networks and Deep Learning", institution: "DeepLearning.AI, Coursera", date: "2020" },
    { name: "CS50's Introduction to Artificial Intelligence with Python", institution: "Harvard, edX", date: "2020" },
  ],
  news: [],
  cv_pdf_url: "/cv/cv-en.pdf",
  resume_pdf_url: "/cv/resume-en.pdf",
};
