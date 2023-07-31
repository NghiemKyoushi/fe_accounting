import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "../theme";
import { ReactQueryProvider } from "@/config/react-query";
import { AuthProvider } from "@/config/auth";
const theme = createTheme();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      {/* <AuthProvider> */}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </AuthProvider> */}
    </ReactQueryProvider>
  );
}
