import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "routes/router";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme.style";
import GlobalStyles from "styles/global.style";
import { worker } from "__mock__/browser";

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
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
