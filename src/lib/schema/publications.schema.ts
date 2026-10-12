import { z } from "zod";

// Las 3 secciones fijas de Publications. La asignación la resuelve
// `resolveSection` en src/lib/publications.ts a partir del tipo de entrada
// (@inproceedings) y del campo `keywords` ({under_review}) del .bib; el resto
// cae en "journal" por default.
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
