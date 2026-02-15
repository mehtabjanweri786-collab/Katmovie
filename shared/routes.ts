import { z } from 'zod';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  movies: {
    trending: {
      method: 'GET' as const,
      path: '/api/movies/trending',
      responses: {
        200: z.object({
          results: z.array(z.any()),
          page: z.number().optional(),
          total_pages: z.number().optional()
        })
      }
    },
    detail: {
      method: 'GET' as const,
      path: '/api/movies/:id',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound
      }
    },
    category: {
      method: 'GET' as const,
      path: '/api/movies/category/:genreId',
      responses: {
        200: z.object({
          results: z.array(z.any())
        })
      }
    },
    search: {
      method: 'GET' as const,
      path: '/api/movies/search',
      responses: {
        200: z.object({
          results: z.array(z.any())
        })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
