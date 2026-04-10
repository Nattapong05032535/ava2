export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  details: string | null;
  heroImg: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
