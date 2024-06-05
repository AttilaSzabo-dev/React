import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import Layout from "components/Layout/Layout";
import { cssVariableResolver, theme } from "./theme";
import MobileLayout from "components/Mobile/MobileLayout/MobileLayout";

function App(): JSX.Element {
  const isLandscapeOrientation = useMediaQuery("(orientation: landscape)");
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  return (
    <div>
      <MantineProvider theme={theme} cssVariablesResolver={cssVariableResolver}>
        <Routes>
          {isMobile === true ? (
            <Route path="/" element={<MobileLayout />} />
          ) : (
            <Route path="/" element={<Layout />}></Route>
          )}
        </Routes>
      </MantineProvider>
    </div>
  );
}

export default App;
