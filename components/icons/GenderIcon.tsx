import React from 'react';
import {GenderIconMap} from '@/lib/constants';
export const GenderIcon = ({gender}: {gender: string}) => {
	const {icon: GenderIcon, props} =
		GenderIconMap[gender] || GenderIconMap.default;
	const {size, color} = props;
	return <GenderIcon {...props} />;
};
