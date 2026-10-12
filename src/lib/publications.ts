import { parseAsync, type Entry } from "@retorquere/bibtex-parser";
import {
  PublicationSchema,
  type Publication,
  type PublicationSection,
} from "./schema/publications.schema";

// Import estático del .bib local como texto (mismo mecanismo `?raw` que usaba
// el loader de metadata): Vite lo bundlea como asset en el build de producción.
// Reemplaza el fetch remoto que antes leía `papers_source` desde el YAML.
import refBibRaw from "../data/ref.bib?raw";

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

// Carpeta pública donde viven los PDFs de los papers. El campo `file` del .bib
// trae el nombre del archivo (ej. "ijms-23-10435-v2.pdf"); el PDF real se
// coloca en `public/papers/` y se sirve desde esta ruta. Dejar los archivos
// ahí habilita automáticamente el botón "PDF" de cada publicación.
const PAPERS_BASE_URL = "/papers";

// Resuelve el campo `file` del .bib a la URL pública del PDF. Tolera que el
// valor venga con una ruta (toma solo el nombre de archivo) o en el formato
// "descripción:ruta.pdf:PDF" de JabRef/Zotero (toma el token que termina en
// .pdf). Si no hay `file`, devuelve undefined y el botón queda deshabilitado.
function resolvePdfUrl(fields: Entry["fields"]): string | undefined {
  const raw = fields.file?.trim();
  if (!raw) return undefined;
  const pdfToken = raw.split(":").find((part) => part.trim().toLowerCase().endsWith(".pdf")) ?? raw;
  const fileName = pdfToken.split(/[\\/]/).pop()?.trim();
  if (!fileName) return undefined;
  return `${PAPERS_BASE_URL}/${fileName}`;
}

// A cuál de las 3 secciones fijas de Publications pertenece la entrada, según
// la convención que documenta el propio ref.bib:
//   - entradas @inproceedings -> conferencias
//   - keywords = {under_review} -> en revisión
//   - resto (@article, etc.) -> journals
function resolveSection(entry: Entry): PublicationSection {
  if (entry.type === "inproceedings") return "conference";
  const keywords = entry.fields.keywords ?? [];
  if (keywords.some((keyword) => keyword.trim().toLowerCase() === "under_review")) {
    return "under_review";
  }
  return "journal";
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
    pdfUrl: resolvePdfUrl(fields),
    section: resolveSection(entry),
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

let cache: Promise<Publication[]> | undefined;

export function getPublications(): Promise<Publication[]> {
  if (cache) return cache;

  cache = (async () => {
    const library = await parseAsync(refBibRaw);
    return library.entries
      .filter((entry) => entry.type !== "set") // agrupadores BibLaTeX, no publicaciones reales
      .map((entry) => toPublication(entry));
  })();

  return cache;
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
