import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const testeMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/teste',
		name: 'Exemplo',
		icon: <SysIcon name={'dashboard'} />
	}
];
