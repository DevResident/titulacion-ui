// A) Fragmentos atómicos (cada oración por separado)
export const HELP_FRAGMENTS = {
    FORMATO_JPG: 'En formato JPG.',
    FORMATO_PDF: 'En formato PDF.',
    SELFIE: 'Fotografía estilo “selfie”.',
    CUENTAS_ESPECIALES:
        'Sólo los alumnos cuyo número de cuenta inicie con 1, 306, 307, 308, 309, 310 y 311.',
    ANTIGUEDAD_3_MESES: 'No mayor a 3 meses de antigüedad.',
    CIEN_PORCIENTO_CREDITOS: 'Con 100% de créditos y reciente.',
    SOLO_NEGOCIOS_INT:
        'Sólo alumnos de la licenciatura en Negocios Internacionales.',
} as const;

export type HelpKey = keyof typeof HELP_FRAGMENTS;

// B) Accept de inputs
export const ACCEPT = {
    JPG: '.jpg,.jpeg,image/jpeg',
    PDF: '.pdf,application/pdf',
} as const;
export type AcceptValue = (typeof ACCEPT)[keyof typeof ACCEPT];

// C) Catálogo de requisitos que combina fragmentos
export type Requisito = {
    label: string;
    accept: AcceptValue;
    help: HelpKey[];
};

export const REQUISITOS: Record<string, Requisito> = {
    fotografiaAlumno: {
        label: 'Fotografía del alumno:',
        accept: ACCEPT.JPG,
        help: ['FORMATO_JPG', 'SELFIE'],
    },
    docPdfGenerico: {
        label: 'Documento:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    docPdfAntiguedad3Meses: {
        label: 'Comprobante:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF', 'ANTIGUEDAD_3_MESES'],
    },
    docPdfCuentaEspecial: {
        label: 'Documento (cuentas especiales):',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF', 'CUENTAS_ESPECIALES'],
    },
    docPdf100Creditos: {
        label: 'Constancia:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF', 'CIEN_PORCIENTO_CREDITOS'],
    },
    docPdfSoloNegociosInt: {
        label: 'Documento (Negocios Internacionales):',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF', 'SOLO_NEGOCIOS_INT'],
    },
} as const;

// D) Utilidad opcional para validar accept
export function fileMatchesAccept(file: File, accept: string): boolean {
    const types = accept.split(',').map(s => s.trim().toLowerCase());
    const name = file.name.toLowerCase();
    const mime = (file.type || '').toLowerCase();
    return types.some(t => (t.startsWith('.') ? name.endsWith(t) : mime === t));
}

// E) Requisitos en una sola cadena con saltos de línea
export function joinHelp(keys: HelpKey[], sep = '\n'): string {
    return keys.map(k => HELP_FRAGMENTS[k]).join(sep);
}
