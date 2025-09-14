<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ADR Frontend Project Instructions

This is a React TypeScript frontend application for managing Architecture Decision Records (ADR). When working on this project, please follow these guidelines:

## Project Context
- This is a React 18 application built with Vite
- Uses TypeScript for type safety
- Styled with styled-components for CSS-in-JS
- React Router for client-side routing
- Axios for HTTP requests to the backend API
- Backend API runs on http://localhost:3001/api

## Development Guidelines

### Component Development
- Use functional components with hooks
- Follow React best practices for state management
- Use styled-components for styling with the theme system
- Implement proper TypeScript types for all props and state
- Use React.FC type for function components

### API Integration
- All API calls should use the centralized api service in `src/services/api.ts`
- Handle loading states and error states appropriately
- Use proper TypeScript types for API requests and responses

### Styling
- Use the theme system defined in `src/styles/theme.ts`
- Follow responsive design principles
- Use semantic HTML elements
- Maintain consistency with the existing design system

### File Organization
- Components in `src/components/`
- Pages in `src/pages/`
- Types in `src/types/`
- Services in `src/services/`
- Styles in `src/styles/`

### Code Quality
- Follow ESLint rules
- Write descriptive variable and function names
- Add proper error handling
- Use loading states for async operations
- Implement proper form validation
