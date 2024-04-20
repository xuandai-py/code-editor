'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import {useState} from 'react';


import Corner from "../theme_registry/octoSign";
import LanguageOptions from "./pieces/common/lang_switch";
import ThemeToggle from "./pieces/common/themeToggle";

import SideBar from "./sidebar";
import FunctionalButtons from './pieces/functionalButtons';

const Navbar = ({ isFormat, isBundleList, isEditorOption, state }: { isFormat: boolean }) => {

    const [isLoading, setIsLoading] = useState(false);

    // const bundleState = useSelector(state => state.editor.bundle);
    // const currentSetting = settings.find((setting) => setting.path === pathname);
    console.log('sidebarfromnav')

    return (
        <>
            <Corner />
            <AppBar position="static" sx={{ bgColor: "background.default" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ gap: 2, justifyContent: 'end' }}>
                        {/* {isLoading && <Box sx={{ display: 'flex' }}>
                            <CircularProgress
                                style={{ color: 'white' }}
                                size={30}
                            />
                        </Box>} */}

                        {/* {!isMobile && <FunctionalButtons setIsLoading={setIsLoading} isFormat={isFormat} />} */}

                        <FunctionalButtons
                            isBundleList={isBundleList}
                            isFormat={isFormat}
                            setIsLoading={setIsLoading}
                            sx={{
                                display: { xs: 'none', sm: 'flex' }
                            }}
                        />
                        <SideBar
                            setIsLoading={setIsLoading}
                            isFormat={isFormat}
                            isBundleList={isBundleList}
                            isEditorOption={isEditorOption}
                        />
                        <Box
                            display={{ xs: 'none', md: 'block' }}>
                            <LanguageOptions type="menu"/>
                        </Box>
                        <ThemeToggle />

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};



//! Fix

export default Navbar;

