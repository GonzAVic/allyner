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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  const modalRepo = useModalRepo();
  // TODO: Remove this session Repo

  console.log('-> router.pathname: ', router.pathname)

  const renderView = () => {
    if (router.route.includes("/app")) {
      return (
        <BusinessApplication>
          <Component {...pageProps} />
          {Boolean(modalRepo.currentModal) &&
            React.cloneElement(modalRepo.currentModal, modalRepo.ctx)}
        </BusinessApplication>
      );
    } else if (noSessionViews.includes(router.pathname)) {
      return (
        <>
          <Component {...pageProps} />
          {Boolean(modalRepo.currentModal) &&
            React.cloneElement(modalRepo.currentModal, modalRepo.ctx)}
        </>
      );
    } else {
      return (
        <ClientApplication>
          <Component {...pageProps} />
          {Boolean(modalRepo.currentModal) &&
            React.cloneElement(modalRepo.currentModal, modalRepo.ctx)}
        </ClientApplication>
      );
    }
  };

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
              <CssBaseline />
              {renderView()}
            </AppContext.Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

const noSessionViews = [
  "/_sites/[site]/signin",
  "/_sites/[site]/signup",
  "/_sites/[site]/services/[serviceId]",
  "/business-signup",
  "/business-signin",
  "/_sites/[site]"
];
