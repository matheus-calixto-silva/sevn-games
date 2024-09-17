import axios from 'axios';
import { env } from '../config/env';
import type { IRound } from '../interfaces/IRound';

export async function getApiData(): Promise<IRound[]> {
  try {
    const response = await axios.get<IRound[]>(env.apiUrl);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
}
