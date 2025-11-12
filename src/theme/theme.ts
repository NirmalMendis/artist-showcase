import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  strictTokens: true,
});
const systemTheme = createSystem(defaultConfig, config);
export default systemTheme;
