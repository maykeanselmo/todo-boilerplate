import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface IToDosDetailStyles {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	Body: ElementType<BoxProps>;
	Footer: ElementType<BoxProps>;
	FormColumn: ElementType<BoxProps>;
}

const ToDosDetailStyles: IToDosDetailStyles = {
	Container: styled(SysSectionPaddingXY)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center', 
		alignItems: 'center', 
		width: '100%',
		maxWidth: '100%',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
		  width: '95%',
		  padding: theme.spacing(2),
		},
	  })),
	Header: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
		gap: theme.spacing(1),
	})),
	Body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		gap: '64px',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			gap: sysSizing.spacingFixedMd,
		}
	})),
	Footer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		gap: sysSizing.spacingRemMd,
		marginTop: '40px',
		flexWrap: 'wrap',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			gap: theme.spacing(2),
		}
	})),
	FormColumn: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: sysSizing.spacingFixedLg,
		paddingBottom: theme.spacing(2)
	}))


};

export default ToDosDetailStyles;
