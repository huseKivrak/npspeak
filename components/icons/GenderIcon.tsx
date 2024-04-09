import {GenderIconMap} from '@/lib/constants';
export const GenderIcon = (gender: string, size = 24) => {
	const {icon: GenderIcon, props} =
		GenderIconMap[gender] || GenderIconMap.default;
	return <GenderIcon {...props} size={size} />;
};
