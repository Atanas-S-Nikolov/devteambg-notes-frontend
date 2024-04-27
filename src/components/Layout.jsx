import { CssBaseline, ThemeProvider, styled } from "@mui/material";
import { initializeTheme } from "@/utils/Themes";
import ThemePicker from "@/components/utils/ThemePicker";
import { useThemeStore } from "@/lib/stores/ThemeStore";

const StyledSection = styled("section")({
  display: "flex",
  justifyContent: "flex-end",
});

export default function RootLayout({ children }) {
  const theme = useThemeStore((state) => state.theme)

  return (
    <>
      <ThemeProvider theme={initializeTheme(theme)}>
        <CssBaseline />
        <StyledSection>
          <ThemePicker />
        </StyledSection>
        {children}
      </ThemeProvider>
    </>
  );
}
