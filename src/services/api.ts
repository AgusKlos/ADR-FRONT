import axios from 'axios';
import { Contact, ContactFormData } from '../types';

// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || import.meta.env.VITE_REACT_APP_API_BASE_URL || '/api';

console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para logging
api.interceptors.request.use((config) => {
  console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ Error en API:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API de contactos con manejo de errores del backend
export const contactsApi = {
  // Obtener todos los contactos
  getAll: async (): Promise<Contact[]> => {
    try {
      const response = await api.get<Contact[]>('/contacts');
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener contactos:', error.response?.data);
      
      // Si el backend devuelve error 500, retornamos array vacío por ahora
      if (error.response?.status === 500) {
        console.warn('⚠️ Backend con error 500, retornando lista vacía');
        return [];
      }
      throw error;
    }
  },

  // Obtener contacto por ID
  getById: async (id: number): Promise<Contact> => {
    try {
      const response = await api.get<Contact>(`/contacts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener contacto:', error.response?.data);
      throw error;
    }
  },

  // Crear nuevo contacto
  create: async (contactData: ContactFormData): Promise<Contact> => {
    try {
      const response = await api.post<Contact>('/contacts', contactData);
      return response.data;
    } catch (error: any) {
      console.error('Error al crear contacto:', error.response?.data);
      
      // Si el backend tiene error, mostramos un mensaje más descriptivo
      if (error.response?.status === 500) {
        throw new Error('Error interno del servidor. Verifica la configuración de la base de datos.');
      }
      throw error;
    }
  },

  // Actualizar contacto
  update: async (id: number, contactData: ContactFormData): Promise<Contact> => {
    try {
      const response = await api.put<Contact>(`/contacts/${id}`, contactData);
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar contacto:', error.response?.data);
      
      if (error.response?.status === 500) {
        throw new Error('Error interno del servidor. Verifica la configuración de la base de datos.');
      }
      throw error;
    }
  },

  // Eliminar contacto
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/contacts/${id}`);
    } catch (error: any) {
      console.error('Error al eliminar contacto:', error.response?.data);
      
      if (error.response?.status === 500) {
        throw new Error('Error interno del servidor. Verifica la configuración de la base de datos.');
      }
      throw error;
    }
  },
};

// API de health check (adaptada para el error 404)
export const healthApi = {
  check: async (): Promise<{ status: string }> => {
    try {
      // Intentamos primero /health
      const response = await api.get<{ status: string }>('/health');
      return response.data;
    } catch (error: any) {
      // Si /health no existe (404), intentamos /contacts como health check alternativo
      if (error.response?.status === 404) {
        try {
          await api.get('/contacts');
          return { status: 'ok' }; // Si /contacts responde, el servidor está funcionando
        } catch (contactsError) {
          return { status: 'error' };
        }
      }
      throw error;
    }
  },
};

export default api;
