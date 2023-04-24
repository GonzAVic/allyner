import * as React from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

// MATERIAL UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// COMPONENTS
import BusinessApplication from "components/BusinessApplication";
import ClientApplication from "components/ClientApplication";

// OTHER
import "../styles/globals.css";
import theme from "../config/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/apolloClient";
import { AppContext } from "contexts/AppContext";

// HOOKS
import useModalRepo from "utils/useModalRepo";
import useSession from "utils/useSession";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  const modalRepo = useModalRepo();
  const sessionRepo = useSession();

  const contextObject = { modalRepo, sessionRepo };
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme()}>
            <AppContext.Provider value={contextObject}>
              {Boolean(modalRepo.currentModal) &&
                React.cloneElement(modalRepo.currentModal, modalRepo.ctx)}
              <CssBaseline />

              {router.route.includes("/app") ? (
                <BusinessApplication>
                  <Component {...pageProps} />
                </BusinessApplication>
              ) : (
                <ClientApplication>
                  <Component {...pageProps} />
                </ClientApplication>
              )}
            </AppContext.Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
