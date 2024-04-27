import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useState } from "react";
import { DARK_MODE, LIGHT_MODE } from "@/utils/Themes";
import { useThemeStore } from "../../lib/stores/ThemeStore";

const modes = [
  { id: 2, icon: <LightModeIcon />, text: LIGHT_MODE },
  { id: 3, icon: <DarkModeIcon />, text: DARK_MODE },
];

export default function ThemePicker(props) {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const defaultIcon =
    theme === DARK_MODE ? <DarkModeIcon /> : <LightModeIcon />;
  const [buttonIcon, setButtonIcon] = useState(defaultIcon);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenuItemClick(event, mode) {
    event.preventDefault();
    setButtonIcon(mode.icon);
    toggleTheme(mode.text);
    handleClose();
  }

  return (
    <>
      <Button startIcon={buttonIcon} onClick={handleClick} {...props}>
        Theme
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {modes.map((mode) => {
          const { id, icon, text } = mode;
          return (
            <MenuItem
              key={id}
              onClick={(event) => handleMenuItemClick(event, mode)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
