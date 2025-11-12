import { ChakraProvider } from '@chakra-ui/react';
import systemTheme from 'theme/theme';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={systemTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
