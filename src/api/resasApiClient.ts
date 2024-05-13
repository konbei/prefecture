"use client"
import { z } from 'zod';

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
const NEXT_PUBLIC_RESAS_BASE_URL = process.env.NEXT_PUBLIC_RESAS_BASE_URL as string;

export const fetcher = async <T>(apiPass: string, schema: z.Schema<T>, cache: RequestCache="force-cache"): Promise<T> => {
  const url =NEXT_PUBLIC_RESAS_BASE_URL + apiPass;
  console.log(url)
  try {
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': NEXT_PUBLIC_API_KEY,
      },
      cache
    });

    if (!response.ok) {
      const errorMessage = `An error occurred while fetching the data from ${url}. Status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const result = schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      const errorMessage = `Parsing error for URL: ${url}, Schema: ${schema.description}, Error: ${result.error.message}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw error;
  }
};



