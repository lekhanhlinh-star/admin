import { LoadingIndicator, LocalesMenuButton } from 'react-admin';
import { ThemeSwapper } from '../Themes/ThemeSwapper';


export const AppBarToolbar = () => (
    <>
        <LocalesMenuButton />
        <ThemeSwapper />
        <LoadingIndicator />
    </>
);