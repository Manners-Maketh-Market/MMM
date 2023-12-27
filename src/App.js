import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "routes/router";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme.style";
import GlobalStyles from "styles/global.style";
import { worker } from "__mock__/browser";
import React from "react";
import AuthProvider from "provider/auth-provider";
import SocketProvider from "socket/socket";

const queryClient = new QueryClient();
// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <RecoilRoot>
              <React.Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
              </React.Suspense>
            </RecoilRoot>
          </SocketProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
