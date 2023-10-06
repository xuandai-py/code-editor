import Image from "next/image";
import { MouseEventHandler } from "react";
import { Button as MuiButton } from '@mui/material';
type Props = {
    title: string,
    leftIcon?: string | null,
    rightIcon?: string | null,
    handleClick?: MouseEventHandler,
    submitting?: boolean | false,
    type?: 'button' | 'submit',
    bgColor?: string,
    textColor?: string
}

const Button = ({ title, leftIcon, rightIcon, handleClick, submitting, type, bgColor, textColor }: Props) => (
    <button
        type={type || 'button'}
        disabled={submitting || false}
        className={`button flexCenter gap-3 px-4 py-3 
        ${textColor ? textColor : 'text-white'} 
        ${submitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
        onClick={handleClick}
    >
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left icon" />}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right icon" />}
    </button>
)

export const CommonButtons = ({ onClickEvent, children }: { onClickEvent: MouseEventHandler, children: React.ReactNode }) => (
    <MuiButton
        onClick={onClickEvent}
        sx={{
            color: { sx: '#1976D2', sm: 'white' },
            p: 1,
            width: '100%',
            border: { xs: '1px solid #1976D2', sm: '1px solid white' }
        }}
    >
        {children}
    </MuiButton>
)
export default Button;