import { AuthProvider } from "@/context/AuthContext";
import theme from "@/theme";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { ReactNode } from "react";

interface ThemeProviderWrapperProps {
    children: ReactNode;
  }
  
  const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => (
    <ClerkProvider>
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      
    </ClerkProvider>
  );
  export default ThemeProviderWrapper;