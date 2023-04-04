import * as React from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

// MATERIAL UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// OTHER
import "../styles/globals.css";
import theme from "../config/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/apolloClient";
import { AppContext } from "../AppContext";
import useModalRepo from "utils/useModalRepo";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const modalRepo = useModalRepo();

  const contextObject = { modalRepo };
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme()}>
            <AppContext.Provider value={contextObject}>
              {Boolean(modalRepo.currentModal) && modalRepo.currentModal}
              <CssBaseline />
              <Component {...pageProps} />
            </AppContext.Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
