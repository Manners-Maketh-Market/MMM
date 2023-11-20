import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "routes/router";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme.style";
import GlobalStyles from "styles/global.style";
import { worker } from "__mock__/browser";
import React from "react";

const queryClient = new QueryClient();
if (process.env.NODE_ENV === "development") {
  worker.start();
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <React.Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </React.Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
