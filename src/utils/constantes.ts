// A) Fragmentos atómicos (cada oración por separado)
export const HELP_FRAGMENTS = {
    FORMATO_JPG: 'En formato JPG.',
    FORMATO_PDF: 'En formato PDF.',
    SELFIE: 'Fotografía estilo “selfie”. Reciente, a color y sin filtros',
    CUENTAS_ESPECIALES:
        'Actualizada con el 100% de créditos, esta deberá tener la columna de exámenes ordinarios, extraordinarios',
    ANTIGUEDAD_3_MESES: 'No mayor a 3 meses de antigüedad.',
    CIEN_PORCIENTO_CREDITOS: 'Con 100% de créditos y reciente.',
    SOLO_NEGOCIOS_INT:
        ' ',
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
        label: 'Fotografía tomada con celular:',
        accept: ACCEPT.JPG,
        help: ['FORMATO_JPG'],
    },
    historiaAcademica: {
        label: 'Historia académica:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    certificado: {
        label: 'Certificado original de estudios anteriores al ingreso a la UNAM:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    constanciaActividadesExtracurriculares: {
        label: 'Constancia de actividades extracurriculares:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    servicioSocial: {
        label: 'Constancia de término de servicio social original:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    actaNacimiento: {
        label: 'Acta de nacimiento original:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    CURP: {
        label: 'CURP:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
    },
    protestaUniversitaria: {
        label: 'Protesta Universitaria:',
        accept: ACCEPT.PDF,
        help: ['FORMATO_PDF'],
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
