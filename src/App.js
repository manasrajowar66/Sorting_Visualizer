import React from "react";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

function App() {
  return (
    <>
        <ThemeProvider theme={theme}>
          <SortingVisualizer />
      </ThemeProvider>
    </>
  );
}

export default App;
