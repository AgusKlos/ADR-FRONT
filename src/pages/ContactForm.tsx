import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { contactsApi } from '../services/api';
import { ContactFormData, FormErrors } from '../types';
import { validateContact, hasErrors, getFirstError } from '../utils/validation';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 1.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin: 0;
`;

const Form = styled.form`
  background-color: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &.error {
    border-color: ${props => props.theme.colors.danger};
  }
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.danger};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.primaryHover};
    }
  ` : `
    background-color: transparent;
    color: ${props.theme.colors.textSecondary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background-color: ${props.theme.colors.background};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  color: ${props => props.theme.colors.danger};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 1rem;
`;

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      loadContact(parseInt(id));
    }
  }, [id, isEditing]);

  const loadContact = async (contactId: number) => {
    try {
      setInitialLoading(true);
      setError(null);
      const contact = await contactsApi.getById(contactId);
      setFormData({
        nombre: contact.nombre,
        apellido: contact.apellido,
        telefono: contact.telefono,
        email: contact.email
      });
    } catch (err) {
      const errorMessage = 'Error al cargar el contacto';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error loading contact:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const validationErrors = validateContact(formData, isEditing);
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      const firstError = getFirstError(validationErrors);
      if (firstError) {
        toast.error(firstError);
      }
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditing && id) {
        await contactsApi.update(parseInt(id), formData);
        toast.success('Contacto actualizado exitosamente');
      } else {
        await contactsApi.create(formData);
        toast.success('Contacto creado exitosamente');
      }

      navigate('/');
    } catch (err: any) {
      console.error('Error saving contact:', err);
      
      // Manejo de errores del backend
      if (err.response?.data?.details) {
        // Si el backend devuelve errores de validación específicos
        const backendErrors: FormErrors = {};
        err.response.data.details.forEach((detail: any) => {
          if (detail.path && detail.message) {
            backendErrors[detail.path[0] as keyof FormErrors] = detail.message;
          }
        });
        setErrors(backendErrors);
        toast.error('Por favor corrige los errores en el formulario');
      } else {
        const errorMessage = isEditing ? 'Error al actualizar el contacto' : 'Error al crear el contacto';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (initialLoading) {
    return (
      <Container>
        <LoadingMessage>Cargando contacto...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton to="/">←</BackButton>
        <Title>
          {isEditing ? 'Editar Contacto' : 'Agregar Contacto'}
        </Title>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={errors.nombre ? 'error' : ''}
            placeholder="Ingresa el nombre"
            maxLength={50}
            required
          />
          {errors.nombre && <ErrorText>{errors.nombre}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="apellido">Apellido *</Label>
          <Input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            className={errors.apellido ? 'error' : ''}
            placeholder="Ingresa el apellido"
            maxLength={50}
            required
          />
          {errors.apellido && <ErrorText>{errors.apellido}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className={errors.telefono ? 'error' : ''}
            placeholder="+54 11 1234-5678"
            maxLength={20}
            required
          />
          {errors.telefono && <ErrorText>{errors.telefono}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="ejemplo@correo.com"
            maxLength={100}
            required
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FormGroup>

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={() => navigate('/')}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default ContactForm;
