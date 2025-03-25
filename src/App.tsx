import AppRoutes from "src/routes/Routes";
import "./App.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "src/theme";
import { Provider } from "react-redux";
import { store } from "src/store";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
