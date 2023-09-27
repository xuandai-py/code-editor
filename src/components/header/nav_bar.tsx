'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { FormControlLabel, SwipeableDrawer, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ResizeEditor from "./reisze_editor";
import { setCode, setErr } from "@/redux/bundle_slice";
import bundler from "@/helper/bundler";

import LanguageOptions from "./lang_switch";
import FormatSnippet from "./format";
import SideBar from "./sidebar";
import BundleButton from "./exe_button";
import Corner from "../theme_registry/octoSign";

const pages = ['Products', 'Pricing', 'Blog'];

const Navbar = ({ showEditorOptions }: { showEditorOptions: boolean }) => {

    const { zoomLevel, frameHeight, script, bundle: bundleState, editorRef } = useSelector((state) => state.editor);
    const dispatch = useDispatch();
    const pathname = usePathname();
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

    // const currentSetting = settings.find((setting) => setting.path === pathname);

    return (
        <>
            <Corner />
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ gap: 2 , justifyContent: 'end'}}>
                        <NavLogo />
                        {showEditorOptions && <FormatSnippet refObject={editorRef} />}
                        {!bundleState && showEditorOptions && <BundleButton onClickHandler={onClickHandler} />}

                        <LanguageOptions />
                        <SideBar {...{ showEditorOptions, zoomLevel, frameHeight, bundleState }} />

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};
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
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    // mr: 2,
                    left: '50%',
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    position: 'absolute',
                }}
            >
                LOGO
            </Typography>

           
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
        </>
    )
}


//! Fix

export default Navbar;

