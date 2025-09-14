import { Contact, FormErrors } from '../types';

/**
 * Valida un contacto usando las mismas reglas que el backend (Joi)
 */
export const validateContact = (contact: Partial<Contact>, isUpdate = false): FormErrors => {
  const errors: FormErrors = {};

  // Para updates, solo validar campos que estén presentes
  const shouldValidateField = (value: any) => isUpdate ? value !== undefined && value !== '' : true;

  // Validación nombre
  if (shouldValidateField(contact.nombre)) {
    if (!contact.nombre || contact.nombre.trim() === '') {
      errors.nombre = isUpdate ? 'El nombre no puede estar vacío' : 'El nombre es requerido';
    } else if (contact.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (contact.nombre.length > 50) {
      errors.nombre = 'El nombre no puede exceder 50 caracteres';
    }
  }

  // Validación apellido
  if (shouldValidateField(contact.apellido)) {
    if (!contact.apellido || contact.apellido.trim() === '') {
      errors.apellido = isUpdate ? 'El apellido no puede estar vacío' : 'El apellido es requerido';
    } else if (contact.apellido.length < 2) {
      errors.apellido = 'El apellido debe tener al menos 2 caracteres';
    } else if (contact.apellido.length > 50) {
      errors.apellido = 'El apellido no puede exceder 50 caracteres';
    }
  }

  // Validación teléfono - Regex exacta del backend
  if (shouldValidateField(contact.telefono)) {
    if (!contact.telefono || contact.telefono.trim() === '') {
      errors.telefono = 'El teléfono es requerido';
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
      if (!phoneRegex.test(contact.telefono)) {
        errors.telefono = 'El teléfono debe tener un formato válido';
      }
    }
  }

  // Validación email
  if (shouldValidateField(contact.email)) {
    if (!contact.email || contact.email.trim() === '') {
      errors.email = 'El email es requerido';
    } else {
      // Validación básica de email (similar a Joi.email())
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact.email)) {
        errors.email = 'El email debe tener un formato válido';
      } else if (contact.email.length > 100) {
        errors.email = 'El email no puede exceder 100 caracteres';
      }
    }
  }

  // Para updates, verificar que al menos un campo esté presente
  if (isUpdate) {
    const hasAtLeastOneField = contact.nombre || contact.apellido || 
                               contact.telefono || contact.email;
    if (!hasAtLeastOneField) {
      errors.nombre = 'Al menos un campo debe ser proporcionado para la actualización';
    }
  }

  return errors;
};

/**
 * Verifica si hay errores de validación
 */
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).some(key => errors[key as keyof FormErrors]);
};

/**
 * Obtiene el primer error para mostrar como mensaje general
 */
export const getFirstError = (errors: FormErrors): string | null => {
  const firstErrorKey = Object.keys(errors).find(key => errors[key as keyof FormErrors]);
  return firstErrorKey ? errors[firstErrorKey as keyof FormErrors] || null : null;
};