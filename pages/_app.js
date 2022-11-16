import * as React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
// import { CacheProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "../styles/globals.css";
import theme from "../config/theme";
// import createEmotionCache from "../config/createEmotionCache";
import { client } from "graphql/apolloClient";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  // emotionCache = clientSideEmotionCache,
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </LocalizationProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
