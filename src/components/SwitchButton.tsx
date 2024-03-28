import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 3,
        '&.Mui-checked': {
            transform: 'translateX(18px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#8ED000',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 7,
        color:'#676767',
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
        transform: 'translateX(0px) translateY(0px)',
    },
    '& .Mui-checked .MuiSwitch-thumb': {
        color:'white'
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#2A2B2E',
        boxSizing: 'border-box',
        borderWidth: 1,
        borderColor: "#ffffff44"
    },
}));

export default function SwitchButton({ checked, onChange, disabled }: { checked: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void, disabled: boolean }) {
    return (
        <AntSwitch checked={checked} onChange={onChange} disabled={disabled} inputProps={{ 'aria-label': 'ant design' }} />
    );
}