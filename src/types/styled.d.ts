import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      success: string;
      danger: string;
      warning: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      borderHover: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
