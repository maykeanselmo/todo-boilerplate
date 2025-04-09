import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";
import { Checkbox, CheckboxProps } from '@mui/material';

interface IHomeStyles {
    Container: ElementType<BoxProps>;
    Header: ElementType<BoxProps>;
    RowButtons: ElementType<BoxProps>;
    RoundCheckbox: ElementType<CheckboxProps>;
}

const ToDosHomeStyles: IHomeStyles = {
    Container: styled(SysSectionPaddingXY)(() => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '2.5rem',
        width: '100%',
    })),
    Header: styled(Box)(({}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem',
        marginBottom: '1rem'
    })),
    RowButtons: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '0.5rem',
        flexWrap: 'wrap',
        rowGap: '0.8rem',
        [theme.breakpoints.down('lg')]: {
            justifyContent: 'space-around'
        },
        [theme.breakpoints.down('sm')]: {
            columnGap: '1rem'
        }
    })),
            RoundCheckbox: styled(Checkbox)(({ theme }) => ({
                '& .MuiSvgIcon-root': {
                    borderRadius: '50%',
                    backgroundColor: theme.palette.common.white,
                    color: theme.palette.common.black,
                },
                '&.Mui-checked .MuiSvgIcon-root': {
                    backgroundColor: theme.palette.common.black,
                    color: theme.palette.common.white,
                },
                marginRight: 8
            }))
};

export default ToDosHomeStyles;
