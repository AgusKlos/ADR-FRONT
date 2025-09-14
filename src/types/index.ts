// Tipos para la aplicación de Agenda de Contactos
export interface Contact {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactFormData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  errors?: string[];
}
