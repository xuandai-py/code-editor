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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CircularProgress from '@mui/material/CircularProgress';

import { FormControlLabel, SwipeableDrawer, Switch, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ResizeEditor from "./reisze_editor";
import { setCode, setErr } from "@/redux/bundle_slice";
import bundler from "@/helper/bundler";

import LanguageOptions from "./lang_switch";
import FormatSnippet from "./format";
import SideBar from "./sidebar";
import BundleButton from "./exe_button";
import Corner from "../theme_registry/octoSign";


const Navbar = ({ showEditorOptions }: { showEditorOptions: boolean }) => {

    const [isLoading, setIsLoading] = React.useState(false);

    // const bundleState = useSelector(state => state.editor.bundle);



    // const currentSetting = settings.find((setting) => setting.path === pathname);

    return (
        <>
            <Corner />
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ gap: 2, justifyContent: 'end' }}>
                        {isLoading && <Box sx={{ display: 'flex' }}>
                            <CircularProgress
                                style={{ color: 'white' }}
                                size={30}
                            />
                        </Box>}
                        {/* {!isMobile && <FunctionalButtons setIsLoading={setIsLoading} showEditorOptions={showEditorOptions} />} */}
                        <FunctionalButtons
                            setIsLoading={setIsLoading}
                            showEditorOptions={showEditorOptions}
                            sx={{
                                display: { xs: 'none', sm: 'flex' }
                            }}
                        />
                        <SideBar
                            setIsLoading={setIsLoading}
                            showEditorOptions={showEditorOptions}
                        />

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export const FunctionalButtons = ({ setIsLoading, showEditorOptions, sx }: { setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, showEditorOptions: boolean }) => {
    const { script, bundle: bundleState, editorRef } = useSelector((state) => state.editor);
    const dispatch = useDispatch();

    const onClickHandler = async () => {
        setIsLoading(true);

        try {
            const bundleResult = await bundler(script);
            dispatch(setCode(bundleResult.code));
            dispatch(setErr(bundleResult.err));
        } catch (error) {
            // Handle any errors that occur during bundling
            console.error('Something wrong happened', error);
        }

        setIsLoading(false);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (bundleState) {
                onClickHandler()
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [script, bundleState]);

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={sx} >
            {!bundleState && showEditorOptions && <BundleButton onClickHandler={onClickHandler} />}
            {showEditorOptions && <FormatSnippet refObject={editorRef} />}
            <LanguageOptions />
        </Stack>
    )
}


//! Fix

export default Navbar;

