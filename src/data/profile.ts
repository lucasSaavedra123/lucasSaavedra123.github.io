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

export interface Reference {
  text: string;
  url: string;
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
  // Página propia "Research Interests" (nav, al nivel de About/CV/Publications).
  research_interests: {
    headline: string; // tesis/título del statement
    body: string[]; // un párrafo por string (citas en el texto como "(Autor, Año)")
    references: Reference[];
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
    short: "Computer engineer and AI researcher using deep learning to study the dynamics of proteins from microscopy and molecular dynamics simulations.",
  },
  contact: {
    emails: [
      { address: "lucasarielsaavedra@hotmail.com", label: "Personal" },
      { address: "lucasarielsaavedra@uca.edu.ar", label: "Academic" },
    ],
    phone: "",
    calendly_url: "https://calendly.com/lucasarielsaavedra",
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
      "I was born in Ramos Mejía, Argentina. From a very young age I was so drawn to numbers that I liked to fill the receipt slips lying around the house with nothing but numbers — nothing more than that.",
      "I attended a technical secondary school, Instituto San José (A-355), where I graduated as an electronics technician. It was there that I discovered how much I loved programming, which led me to pursue Computer Engineering at university.",
      "I began my engineering degree in 2018. I greatly enjoyed reading physics and mathematics books, and I was quite interested of formalisms too. But above all, I was fascinated by artificial intelligence. As I took courses on the subject, I realized it was the field I wanted to explore over time.",
      "Midway through my degree, I had the opportunity to join the laboratory of Professor Francisco Barrantes, with whom I have published more than five papers over four years. I have applied artificial intelligence (specifically, deep learning) to the trajectories of the acetylcholine neurotransmitter receptor in order to decode its motion, both in clusters and on its own. I also took part in the analysis of molecular dynamics (MD) simulations and studied receptor structures with deep learning to examine its affinity for cholesterol.",
      "Now, I am looking for the opportunity to pursue a PhD at the intersection of computational science and molecular biology, focused on understanding, through AI, the dynamic molecular mechanisms of proteins and their interactions with surrounding molecules at the cellular and atomistic scales, separately. My goal is to develop AI methods that deepen the analysis within each modality — extracting dynamic information from SRM data on one hand, and from MD simulations on the other. With these methods, researchers can answer new biological questions that traditional methods cannot address with sufficient precision or scale. Through this work, I aim to contribute both to experimental cell-biology labs using advanced imaging techniques and to more quantitative groups focused on image analysis and computational modeling.",
      "Outside of academia and research, I enjoy playing the electric guitar, watching and playing football and basketball whenever I get the chance. I like computer games. I am also a passionate Boca Juniors fan, eagerly waiting for our seventh Copa Libertadores title.",
    ],
  },
  research_interests: {
    headline:
      "Development of artificial intelligence methods for the analysis of single-molecule dynamics using molecular dynamics simulations and experimental data of living cells.",
    body: [
      "The dynamics of biological components (e.g., cells) can be visualized using microscopy techniques. Among these, so-called superresolution microscopy (SRM) methods surpass the diffraction limit of light, providing sufficient resolution to interrogate the movement of molecules. SRM has made possible the study of the behaviour and lipid interactions of transmembrane proteins such as nicotinic acetylcholine receptors (nAChRs) (Barrantes, 2022). Proteins involved in genetics like the RNA polymerase (RNAP) were also interrogated using SRM (Stracy & Kapanidis, 2017).",
      "Another methodology to study the dynamics of proteins and their interactions with their surrounding environment is the usage of all-atom molecular dynamics (MD) simulations. SRM techniques like MINFLUX and STED provide unprecedented insights into receptor dynamics in native cellular environments with resolutions below 100 nm, but atomistic details are not entirely captured in the cellular context. Conversely, all-atom MD simulations offer atomic-level resolution of receptor-lipid interactions but are sometimes computationally prohibitive because large time scales are not possible to attain.",
      "In some cases, both approaches are used to analyse the same biological object independently. For example, the first steps of the hepatocyte growth factor receptor MET were analysed using both approaches: whereas MD simulations revealed that the binding of InlB to MET induces a conformation in the latter that enables dimer formation, smFRET showed that the structure formed by dimers is too close to previously published structures (Li et al., 2024). Although this study included AlphaFold, the application of AI remains limited as AI was barely used to analyse the dynamics of the biological system.",
      "The application of artificial intelligence (AI) to SRM and all-atom MD simulations to process and analyse their output data is increasing. Important examples are AlphaFold to predict protein structures and Convolutional Neural Networks (CNN) to increase resolution in SRM. The question is: how can deep learning (DL) characterize the interactions between proteins and their surrounding environment through time? The application of AI to the cellular scale and, separately, to atomic scale data can enhance analysis of proteins in speed and accuracy.",
      "My research interests lie at the intersection of computational science and molecular biology, focused on understanding, through AI, the dynamic molecular mechanisms of proteins and their interactions with surrounding molecules at the cellular and atomistic scales, separately. My goal is to develop AI methods that deepen the analysis within each modality extracting dynamic information from SRM data on one hand, and from MD simulations on the other. With these methods, researchers can answer new biological questions that traditional methods cannot answer with sufficient precision or scale. Through this work, I aim to contribute both to experimental cell biology labs using advanced imaging techniques and to more quantitative groups focused on image analysis and computational modeling.",
    ],
    references: [
      {
        text: "Barrantes, F. J. (2022). Fluorescence microscopy imaging of a neurotransmitter receptor and its cell membrane lipid milieu. Frontiers in Molecular Biosciences, 9, 1014659.",
        url: "https://doi.org/10.3389/fmolb.2022.1014659",
      },
      {
        text: "Chen, H., Yan, G., Wen, M.-H., Brooks, K. N., Zhang, Y., Huang, P.-S., & Chen, T.-Y. (2024). Advancements and Practical Considerations for Biophysical Research: Navigating the Challenges and Future of Super-resolution Microscopy. Chemical & Biomedical Imaging, 2(5), 331–344.",
        url: "https://doi.org/10.1021/cbmi.4c00019",
      },
      {
        text: "Li, Y., Arghittu, S. M., Dietz, M. S., Hella, G. J., Haße, D., Ferraris, D. M., Freund, P., Barth, H.-D., Iamele, L., de Jonge, H., Niemann, H. H., Covino, R., & Heilemann, M. (2024). Single-molecule imaging and molecular dynamics simulations reveal early activation of the MET receptor in cells. Nature Communications, 15(1), 9486.",
        url: "https://doi.org/10.1038/s41467-024-53772-7",
      },
      {
        text: "Son, A., Kim, W., Park, J., Lee, W., Lee, Y., Choi, S., & Kim, H. (2024). Utilizing Molecular Dynamics Simulations, Machine Learning, Cryo-EM, and NMR Spectroscopy to Predict and Validate Protein Dynamics. International Journal of Molecular Sciences, 25(17).",
        url: "https://doi.org/10.3390/ijms25179725",
      },
      {
        text: "Stracy, M., & Kapanidis, A. N. (2017). Single-molecule and super-resolution imaging of transcription in living bacteria. Methods, 120, 103–114.",
        url: "https://doi.org/10.1016/j.ymeth.2017.04.001",
      },
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
    // Research
    {
      category: "research",
      organization: "Pontifical Catholic University Argentina (UCA)",
      role: "Research Assistant — Molecular Neurobiology Laboratory (BIOMED UCA-CONICET)",
      start_date: "2022-01",
      end_date: "present",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Laboratory head: Prof. Francisco J. Barrantes.",
        "Implementation of Deep Learning models for the analysis of static and dynamic properties of the receptor for the neurotransmitter acetylcholine (nAChR) with orientation to graph theory, artificial neural networks and geometric computing.",
        "Analysis of distribution and density of nicotinic acetylcholine receptors (nAChRs) in the plasma membrane of CHO-K1/A5 cells using super-resolution microscopy (STED and STORM). Advanced analytical methods implemented with MATLAB, based on graph theory and computational geometry to study the topography of nanoclusters.",
        "Development of an efficient and autonomous algorithm based on binary classifications with supervised Graph Neural Networks (GNNs) to detect and quantify the dynamic clustering of particles in membrane proteins in single-molecule microscopy (SMLM) data. The algorithm was developed with TensorFlow.",
        "Analysis of sub-millisecond, two-colour MINFLUX single-molecule tracking data of nicotinic acetylcholine receptors and cholesterol in live cells. Segmented trajectories into confined and free-diffusion states, classified diffusive regimes (subdiffusive, Brownian, superdiffusive) via time-averaged MSD fitting adapted to irregular sampling intervals, and applied deep learning to characterise confinement.",
        "Developed WadTCN, a deep learning architecture for pointwise and trajectory-level analysis of 2D single-particle diffusion: anomalous exponent and diffusion coefficient estimation, model classification and trajectory segmentation. It was applied to nAChR trajectories in live cells.",
        "Application of AlphaFold3-equivalent models to study protein-ligand structures (specifically, the nAChR and cholesterol), combined with coarse-grained and all-atom molecular dynamics (MD) simulations, using CHARMM-GUI to prepare the systems, the GROMACS software, and high-performance computing (HPC) platforms with SLURM. Implemented deep learning methods to analyse the receptor's affinity for cholesterol, and used PyLipID to characterise cholesterol binding sites in the simulations.",
        "Design and programming in C++ of electronic circuits with Arduino to control piezo motors.",
      ],
    },
    {
      category: "research",
      organization: "Pontifical Catholic University Argentina (UCA)",
      role: "Research Assistant — Data Science and AI Laboratory",
      start_date: "2025-01",
      end_date: "2026-01",
      location: "Buenos Aires, Argentina",
      highlights: [
        "Supervisor: Prof. Antonio Quintero-Rincón.",
        "Analysis of electroencephalogram (EEG) data during mental arithmetic tasks using self-supervised learning (specifically, hierarchical variational autoencoders) to detect specific cognitive activity with PyTorch and MNE-Python.",
      ],
    },

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
    { category: "DevOps", items: ["AWS", "Docker", "CircleCI", "Azure", "GitHub Actions"] },
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
