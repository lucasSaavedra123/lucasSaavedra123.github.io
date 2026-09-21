import { z } from "zod";

// Las 3 secciones fijas de Publications (ver plan.md, Fase 9). Se asignan por
// el campo custom `pub_section` del .bib; sin ese dato, la entrada cae en
// "journal" por default (mismo criterio que equalContribIndexes: el mecanismo
// queda listo, inerte hasta que el .bib real del usuario traiga el campo).
export const PublicationSectionSchema = z.enum(["journal", "under_review", "conference"]);
export type PublicationSection = z.infer<typeof PublicationSectionSchema>;

export const PublicationSchema = z.object({
  key: z.string(),
  type: z.string(),
  title: z.string(),
  authors: z.array(z.string()).default([]),
  equalContribIndexes: z.array(z.number()).default([]),
  venue: z.string().default(""),
  year: z.string().default(""),
  abstract: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().optional(),
  pdfUrl: z.string().optional(),
  section: PublicationSectionSchema.default("journal"),
  bibtex: z.string(),
});

export type Publication = z.infer<typeof PublicationSchema>;
