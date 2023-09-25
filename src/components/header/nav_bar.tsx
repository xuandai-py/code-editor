'use client'
import Image from "next/image";
import Link from "next/link";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FormControlLabel, SwipeableDrawer, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ResizeEditor from "./reisze_editor";
import { getFrameHeight, getZoomLevel, setBundle } from "@/redux/editor_slice";
import { setCode, setErr } from "@/redux/bundle_slice";
import bundler from "@/helper/bundler";
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import parserPostcss from 'prettier/parser-postcss';

// import { ESLint } from 'eslint';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = [
    {
        'key': 'Javascript',
        'path': '/js_re',
        'status': true
    },

    {
        'key': 'Rust',
        'path': '/rust_re',
        'status': false

    }
];
// import { NavLinks } from "@/constant";
// import { getCurrentUser } from "@/lib/session";

// import AuthProviders from "./AuthProviders";
// import ProfileMenu from "./ProfileMenu";


const Navbar = ({ showBundle }: { showBundle: boolean }) => {

    const { script, bundle: bundleState } = useSelector((state) => state.editor);
    const dispatch = useDispatch();
    // const bundleState = useSelector(state => state.editor.bundle);

    const onClickHandler = async () => {
        const bundleResult = await bundler(script);
        dispatch(setCode(bundleResult.code));
        dispatch(setErr(bundleResult.err));
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (bundleState) {
                onClickHandler()
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [script, bundleState]);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ gap: 2 }}>
                    <FormatSnippet />
                    <LanguageOptions />
                    {!bundleState && showBundle &&
                        <Button
                            variant="outlined"
                            sx={{ color: 'white', p: 1, border: '1px solid white' }}
                            onClick={onClickHandler}
                        >Bundle</Button>
                    }
                    <SideBar showBundle={showBundle} />

                </Toolbar>
            </Container>
        </AppBar>
    );
};

const FormatSnippet: React.FC<{}> = () => {
    const editorRef = useSelector((state) => state.editor.editorRef);
    console.log(editorRef)
    const onFormatClick = async () => {
        try {
            const unformatted = editorRef.getModel().getValue()
            const formatted = await prettier.format(unformatted, {
                parser: 'css',
                // depcrepted   
                plugins: [parserBabel, parserHtml, parserPostcss],
                useTabs: false,
                semi: true,
                singleQuote: true
            })
      
            editorRef.setValue(formatted)
        } catch (error) {
            console.error("An error occurred:", error)
            console.error("Error details: " + error.message)
        }
    }
    return (
        <Button
            variant="outlined"
            sx={{ color: 'white', p: 1, border: '1px solid white' }}
            onClick={onFormatClick} >
            Format
        </Button>
    )
}

const LanguageOptions: React.FC<{}> = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Languages options">
                <Button onClick={handleOpenUserMenu} sx={{ color: 'white', p: 1, border: '1px solid white' }}>
                    Languages
                </Button>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <Link href={setting.path}>
                        <MenuItem key={setting.key} disabled={!setting.status} onClick={handleCloseUserMenu}>

                            <Typography textAlign="center">{setting.key}</Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Box>
    )
}
const SideBar = (props) => {
    const innerPropsZoomEditor = {
        title: 'zoom',
        step: 1,
        min: 0,
        max: 30
    }
    const innerPropsFrameHeight = {
        title: 'height',
        step: 200,
        min: 400,
        max: 2000
    }

    const zoomLevel = useSelector((state) => state.editor.zoomLevel);
    const frameHeight = useSelector((state) => state.editor.frameHeight);

    return (
        <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'row', bgcolor: '#fff' }}>
            <SwipeableTemporaryDrawer anchor={'right'}  >
                <ResizeEditor
                    inputState={frameHeight}
                    innerProps={innerPropsFrameHeight}
                    dispatchTo={getFrameHeight}
                />
                <ResizeEditor
                    inputState={zoomLevel}
                    innerProps={innerPropsZoomEditor}
                    dispatchTo={getZoomLevel}
                />

                {props.showBundle && <AutoBundle />}
            </SwipeableTemporaryDrawer>
        </Box>
    )
}

const AutoBundle: React.FC<{}> = () => {
    const state = useSelector((state) => state.editor.bundle);
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setBundle(!state));
    };

    React.useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <FormControlLabel
            control={
                <Switch checked={state} onChange={handleChange} name="auto_bundle" />
            }
            label="Auto Bundle"
        />
    )
}

type Anchor = 'right';
interface SwipeableTemporaryDrawerProps {
    anchor: Anchor,
    children: React.ReactNode
}

const SwipeableTemporaryDrawer: React.FC<SwipeableTemporaryDrawerProps> = ({ anchor, children }) => {
    const [state, setState] = React.useState({

        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List sx={{ px: 2 }}>
                {React.Children.map(children, (child, index) => (
                    <ListItem key={index} disablePadding sx={{ my: 1 }}>
                        {/* <ListItemText primary={child} /> */}
                        {child}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(anchor, true)}>Options</Button>
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}

            >
                {list(anchor)}
            </SwipeableDrawer>
        </div>
    );
}

const NavLogo = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
        </>
    )
}


//! Fix

export default Navbar;

