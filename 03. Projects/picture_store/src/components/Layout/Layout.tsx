import { AppShell, Loader, useMantineTheme } from "@mantine/core";
import * as c from "./Layout.module.css";
import MainHeader from "./MainHeader/MainHeader";

export default function Layout(): JSX.Element {
  return (
    <AppShell padding={20} header={{ height: 43 }} footer={{ height: 50 }}>
      <MainHeader />
      <AppShell.Main>Main</AppShell.Main>
      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell>
  );
}
