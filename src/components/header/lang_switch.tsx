import { langs } from "@/helper/files";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import Link from "next/link";
import React from "react";
import { Divider } from "@mui/material";



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
                {langs.map((setting) => (
                    <Link href={setting.path} key={setting.key}>
                        {setting.path.match('compare_re') && <Divider variant="middle"/>}
                        <MenuItem  disabled={!setting.status} onClick={handleCloseUserMenu}>

                            <Typography textAlign="center">{setting.key}</Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Box>
    )
}

export default LanguageOptions