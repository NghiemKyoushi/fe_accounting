import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "../theme";
import { ReactQueryProvider } from "@/api/react-query";
import { SnackbarProvider, useSnackbar } from "notistack";
import { StateContextProvider } from "@/context/index";
const theme = createTheme();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <StateContextProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            maxSnack={3}
            autoHideDuration={2000}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </StateContextProvider>
    </ReactQueryProvider>
  );
}
