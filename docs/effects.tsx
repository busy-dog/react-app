import { useContext, useEffect } from 'react';
import { ThemeContext } from 'rspress/runtime';

import { iThemeRoot } from '@/utils';

const setIframeTheme = (
  element: HTMLElement,
  theme: string,
  type: 'add' | 'remove'
) => {
  element.querySelectorAll('iframe').forEach((iframe) => {
    const { protocol, host } = location;
    const hostname = `${protocol}//${host}`;
    if (iframe?.src?.startsWith(hostname)) {
      try {
        const { document } = iframe.contentWindow ?? {};
        document?.documentElement?.classList?.[type]?.(theme);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

const Index: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    iThemeRoot.classList.add(theme);
    setIframeTheme(document.body, theme, 'add');
    return () => {
      setIframeTheme(document.body, theme, 'remove');
      iThemeRoot.classList.remove(theme);
    };
  }, [theme]);

  return null;
};

export default Index;
