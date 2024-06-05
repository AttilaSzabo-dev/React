import { AppShell, Burger, Loader, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Layout(): JSX.Element {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding={20}
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      aside={{
        width: 300,
        breakpoint: "sm",
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
