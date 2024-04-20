import { langs } from "@/helper/files";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import React from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { CommonButtons } from "../button";
import { useTheme } from '@mui/material/styles';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import TerminalIcon from '@mui/icons-material/Terminal';
enum Type {
    menu = 'menu',
    list = 'list',
}

type LanguageOptionsProps = {
    type?: "menu" | "list";
    style?: React.CSSProperties;
};

const LanguageOptions: React.FC<LanguageOptionsProps> = ({ type, style }) => {
    switch (type) {
        case Type.menu:
            return <LanguageOptionsNavMenu {...style} />;
        case Type.list:
            return <LanguageOptionsSideList {...style} />;
        default:
            return <LanguageOptionsNavMenu {...style} />;
    }
};

const LanguageOptionsNavMenu = ({ style }) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const theme = useTheme();
    const screenSize = theme.breakpoints.values.sm;

    const transformOrigin = {
        vertical: screenSize < theme.breakpoints.values.sm ? 'bottom' : 'top',
        horizontal: 'right',
    };

    return (
        <Box sx={{ flexGrow: 0, ...style }}>
            <CommonButtons onClickEvent={handleOpenUserMenu}>
                languages
            </CommonButtons>

            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={transformOrigin}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {langs.map((setting) => (
                    <Link href={setting.path} key={setting.key}>
                        {setting.path.match('compare_re') && <Divider variant="middle" />}
                        <MenuItem disabled={!setting.status} onClick={handleCloseUserMenu}>

                            <Typography textAlign="center" color='text.primary'>{setting.key}</Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Box>
    )
}



const LanguageOptionsSideList = ({ style }) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', ...style }}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <TerminalIcon />
                </ListItemIcon>
                <ListItemText primary="Language" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {langs.map((setting) => (
                        <Link href={setting.path} key={setting.key}>
                            {setting.path.match('compare_re') && <Divider variant="middle" />}
                            {/* <MenuItem disabled={!setting.status} onClick={handleCloseUserMenu}>

                                <Typography textAlign="center" color='text.primary'>{setting.key}</Typography>
                            </MenuItem> */}
                            <ListItemButton
                                sx={{ pl: 4 }}
                                disabled={!setting.status}
                            // onClick={handleCloseUserMenu}
                            >
                                <ListItemText primary={setting.key} />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}

export default LanguageOptions