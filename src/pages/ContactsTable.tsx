import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { contactsApi } from '../services/api';
import { Contact } from '../types';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
`;

const AddButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const TableHeader = styled.thead`
  background-color: #f8fafc;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &:hover {
    background-color: #f8fafc;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${props => props.theme.colors.text};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled(Link)`
  background-color: ${props => props.theme.colors.warning};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d97706;
  }
`;

const DeleteButton = styled.button`
  background-color: ${props => props.theme.colors.danger};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.danger};
  background-color: #fef2f2;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ContactsTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const contacts = await contactsApi.getAll();
      setContacts(contacts);
    } catch (err) {
      const errorMessage = 'Error al cargar los contactos';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      try {
        await contactsApi.delete(id);
        setContacts(contacts.filter(contact => contact.id !== id));
        toast.success('¡Contacto eliminado exitosamente!');
      } catch (err) {
        const errorMessage = 'Error al eliminar el contacto';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error deleting contact:', err);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Cargando contactos...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Agenda de Contactos</Title>
        <AddButton to="/add">Agregar Contacto</AddButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {contacts.length === 0 ? (
        <EmptyState>
          <h3>No hay contactos</h3>
          <p>Comienza agregando tu primer contacto</p>
        </EmptyState>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Apellido</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.nombre}</TableCell>
                <TableCell>{contact.apellido}</TableCell>
                <TableCell>{contact.telefono}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <ActionButtons>
                    <EditButton to={`/edit/${contact.id}`}>
                      Editar
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(contact.id!)}>
                      Eliminar
                    </DeleteButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default ContactsTable;
