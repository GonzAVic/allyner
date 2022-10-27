import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { ApolloProvider } from "@apollo/client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "../styles/globals.css";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { client } from "graphql/apolloClient";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
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
    </CacheProvider>
  );
}
