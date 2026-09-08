import { useEffect, useMemo, type ReactNode } from 'react';
import { App, ConfigProvider } from 'antd';
import { createOpsTheme, type OpsThemeOptions } from '../assets/meta-ant-theme';
import '../assets/meta-ant.css';

export interface OpsThemeProviderProps extends OpsThemeOptions {
  children: ReactNode;
}

/**
 * Standalone root example, not an extra provider to nest inside an existing app.
 * Existing apps should merge this mapping while keeping locale/CSP/prefix/form.
 * Set matching HTML data attributes server-side for SSR/first-paint correctness.
 */
export function OpsThemeProvider({
  children, mode = 'light', density = 'comfortable', reducedMotion = false,
}: OpsThemeProviderProps) {
  const config = useMemo(
    () => createOpsTheme({ mode, density, reducedMotion }),
    [mode, density, reducedMotion],
  );
  useEffect(() => {
    const root = document.documentElement;
    const previousMode = root.getAttribute('data-ops-theme');
    const previousDensity = root.getAttribute('data-ops-density');
    root.setAttribute('data-ops-theme', mode);
    root.setAttribute('data-ops-density', density);
    return () => {
      if (previousMode === null) root.removeAttribute('data-ops-theme');
      else root.setAttribute('data-ops-theme', previousMode);
      if (previousDensity === null) root.removeAttribute('data-ops-density');
      else root.setAttribute('data-ops-density', previousDensity);
    };
  }, [mode, density]);
  return <ConfigProvider theme={config}><App>{children}</App></ConfigProvider>;
}
