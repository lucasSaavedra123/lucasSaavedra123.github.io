import { parse } from "yaml";
import { MetadataSchema, type Metadata } from "./schema/metadata.schema";
import type { Locale } from "../i18n/ui";

// Import estático (no dinámico): Vite necesita el path literal para poder
// bundlear el YAML como asset en el build de producción (SSG) — un
// `readFileSync` con ruta calculada en runtime no se resuelve en `dist/`.
// Agregar `metadata.es.yaml` más adelante es sumar un import + una entrada acá.
import metadataEnRaw from "../data/metadata.en.yaml?raw";

const rawByLocale: Partial<Record<Locale, string>> = {
  en: metadataEnRaw,
};

const cache = new Map<Locale, Metadata>();

export function loadMetadata(locale: Locale): Metadata {
  const cached = cache.get(locale);
  if (cached) return cached;

  const raw = rawByLocale[locale];
  if (!raw) {
    throw new Error(`No hay metadata.${locale}.yaml todavía (locale sin contenido).`);
  }

  const parsed = parse(raw);
  const result = MetadataSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(
      `metadata.${locale}.yaml no cumple el schema:\n${result.error.toString()}`
    );
  }

  cache.set(locale, result.data);
  return result.data;
}
