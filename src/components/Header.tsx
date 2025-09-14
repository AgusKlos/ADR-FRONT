import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">📞 Agenda de Contactos</Logo>
        <NavContent>
          <NavLinks>
            <li>
              <NavLink to="/" $isActive={location.pathname === '/'}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" $isActive={location.pathname === '/contacts'}>
                Contactos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts/new" $isActive={location.pathname === '/contacts/new'}>
                Nuevo Contacto
              </NavLink>
            </li>
          </NavLinks>
        </NavContent>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
