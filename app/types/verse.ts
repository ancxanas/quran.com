export interface Verse {
  id: number;
  chapter_id?: number;
  verse_number: number;
  verse_key: string;
  verse_index?: number;
  text_uthmani?: string;
  text_uthmani_simple?: string;
  text_imlaei?: string;
  text_imlaei_simple?: string;
  text_indopak?: string;
  text_uthmani_tajweed?: string;
  text_qpc_hafs?: string;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number?: number;
  page_number?: number;
  image_url?: string;
  image_width?: string;
  words: Word[];
}

export interface Word {
  id: number;
  position: number;
  line_number: number;
  page_number: number;
  text_qpc_hafs?: string;
  location?: number;
  audio_url: string;
  char_type_name: string;
  text: string;
  translation: Translation;
  transileration: Transliteration;
}

export interface Translation {
  text: string;
  language_name: string;
}

export interface Transliteration {
  text: string;
  language_name: string;
}

export interface Pagination {
  per_page: number;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  total_records: number;
}

export interface VersesResponse {
  verses: Verse[];
  pagination: Pagination;
}
