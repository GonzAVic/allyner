import * as React from "react";
import Script from "next/script";
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
        <Script id="show-banner">
          {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3582438,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
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
  "/_sites/[site]",
];
