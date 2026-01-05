import type { GatsbySSR } from 'gatsby';
import { StrictMode, ReactNode } from 'react';
import React from 'react'; // Ensure React is imported for JSX

import { App } from './src/App';
import { Root } from './src/Root';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <StrictMode>
    <Root>{element}</Root>
  </StrictMode>
);

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
  <App>{element}</App>
);

// Add this section to inject the font into the head
export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="preconnect-google-fonts"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="preconnect-gstatic"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="font-grandstander"
      href="https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />,
  ]);
};