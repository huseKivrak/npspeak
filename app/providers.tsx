'use client';
import {NextUIProvider} from '@nextui-org/system';
import {useRouter} from 'next/navigation';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {ThemeProviderProps} from 'next-themes/dist/types';

export function Providers({children}: {children: React.ReactNode}) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider attribute='class' defaultTheme='dark'>
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
}
