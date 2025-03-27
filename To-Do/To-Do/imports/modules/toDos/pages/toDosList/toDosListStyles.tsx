import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import  Box,{ BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface IToDosListStyles {
	Container: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
	SearchContainer: ElementType<BoxProps>;
	TaskContainer: ElementType<BoxProps>;

}

const ToDosListStyles: IToDosListStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
    marginBottom: sysSizing.contentFabDistance
	})),
	LoadingContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: theme.spacing(2)
	})),
	SearchContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		maxWidth: '616px',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		}
	})),

	TaskContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		maxWidth: 600,
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
		padding: theme.spacing(2),
	})),
	  
};

export default ToDosListStyles;
