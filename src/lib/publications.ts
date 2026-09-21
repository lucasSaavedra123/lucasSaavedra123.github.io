import { parseAsync, type Entry } from "@retorquere/bibtex-parser";
import type { Metadata } from "./schema/metadata.schema";
import {
  PublicationSchema,
  PublicationSectionSchema,
  type Publication,
  type PublicationSection,
} from "./schema/publications.schema";

function formatVenue(fields: Entry["fields"]): string {
  if (fields.journal) return fields.journal;
  if (fields.journaltitle) return fields.journaltitle;
  if (fields.booktitle) return fields.booktitle;
  if (fields.publisher && fields.publisher.length > 0) {
    return fields.publisher.join(", ");
  }
  return "";
}

function formatYear(fields: Entry["fields"]): string {
  if (fields.year) return fields.year;
  if (fields.date) return fields.date.slice(0, 4);
  return "";
}

function formatAuthors(fields: Entry["fields"]): string[] {
  return (fields.author ?? [])
    .map((creator) => `${creator.firstName ?? ""} ${creator.lastName ?? creator.name ?? ""}`.trim())
    .filter((name) => name.length > 0);
}

// Campo custom opcional (no estándar de BibTeX/BibLaTeX): lista de índices
// 1-based de autores con contribución igualitaria, ej. "1,2". La fuente real
// usada hoy (papers_source) no lo trae, así que hoy no produce asteriscos —
// queda listo para cuando el .bib real del usuario lo incluya.
function parseEqualContrib(fields: Entry["fields"]): number[] {
  if (!fields.equalcontrib) return [];
  return fields.equalcontrib
    .split(",")
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
}

// Campo custom opcional (no estándar de BibTeX/BibLaTeX): a qué de las 3
// secciones fijas de Publications pertenece la entrada (ver plan.md, Fase 9).
// Sin este campo (como en el .bib de ejemplo usado hoy), o con un valor que
// no matchea ninguna sección conocida, se deja sin definir y el schema le
// aplica el default "journal".
function parsePubSection(fields: Entry["fields"]): PublicationSection | undefined {
  const result = PublicationSectionSchema.safeParse(fields.pub_section?.trim());
  return result.success ? result.data : undefined;
}

function toPublication(entry: Entry): Publication {
  const { fields } = entry;
  const raw = {
    key: entry.key,
    type: entry.type,
    title: fields.title ?? "",
    authors: formatAuthors(fields),
    equalContribIndexes: parseEqualContrib(fields),
    venue: formatVenue(fields),
    year: formatYear(fields),
    abstract: fields.abstract || undefined,
    doi: fields.doi || undefined,
    url: fields.url || undefined,
    pdfUrl: fields.pdf_url || undefined,
    section: parsePubSection(fields),
    bibtex: entry.input,
  };

  const result = PublicationSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `La entrada BibTeX "${entry.key}" no cumple el schema de Publication:\n${result.error.toString()}`
    );
  }
  return result.data;
}

const cache = new Map<string, Promise<Publication[]>>();

export function fetchPublications(metadata: Metadata): Promise<Publication[]> {
  const cached = cache.get(metadata.papers_source);
  if (cached) return cached;

  const promise = (async () => {
    const res = await fetch(metadata.papers_source);
    if (!res.ok) {
      throw new Error(
        `No se pudo obtener el .bib desde papers_source (${metadata.papers_source}): ${res.status}`
      );
    }
    const bibText = await res.text();
    const library = await parseAsync(bibText);
    return library.entries
      .filter((entry) => entry.type !== "set") // agrupadores BibLaTeX, no publicaciones reales
      .map((entry) => toPublication(entry));
  })();

  cache.set(metadata.papers_source, promise);
  return promise;
}

export function groupByYear(
  publications: Publication[]
): { year: string; publications: Publication[] }[] {
  const byYear = new Map<string, Publication[]>();
  for (const publication of publications) {
    const group = byYear.get(publication.year) ?? [];
    group.push(publication);
    byYear.set(publication.year, group);
  }
  return [...byYear.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, pubs]) => ({ year, publications: pubs }));
}

// Orden fijo de las 3 secciones de Publications (ver plan.md, Fase 9).
// Reemplaza el panel de filtro por tags que había antes.
const SECTION_ORDER: PublicationSection[] = ["journal", "under_review", "conference"];

export function groupBySection(
  publications: Publication[]
): { section: PublicationSection; publications: Publication[] }[] {
  return SECTION_ORDER.map((section) => ({
    section,
    publications: publications.filter((publication) => publication.section === section),
  })).filter((group) => group.publications.length > 0);
}
