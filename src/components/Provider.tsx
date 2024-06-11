
import theme from "@/theme";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { ReactNode } from "react";

interface ThemeProviderWrapperProps {
    children: ReactNode;
  }
  
  const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      
    
  );
  export default ThemeProviderWrapper;