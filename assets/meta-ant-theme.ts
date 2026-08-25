import type { ThemeConfig } from 'antd';

/**
 * Conservative Ant Design theme seed for enterprise administration products.
 *
 * Copy this file into the consuming application and merge it with the existing
 * ConfigProvider theme. Keep product brand colors and accessibility requirements
 * authoritative; this seed exists to establish a quiet neutral baseline.
 */
export const metaAntTheme: ThemeConfig = {
  cssVar: true,
  hashed: true,
  token: {
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorSuccess: '#389e0d',
    colorWarning: '#d48806',
    colorError: '#cf1322',
    colorBgLayout: '#f5f7fa',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorText: '#1f2329',
    colorTextSecondary: '#646a73',
    colorTextTertiary: '#8f959e',
    colorBorder: '#d9dce1',
    colorBorderSecondary: '#e8eaed',
    borderRadius: 8,
    borderRadiusLG: 12,
    controlHeight: 36,
    controlHeightSM: 28,
    controlHeightLG: 44,
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    lineHeight: 1.5715,
    wireframe: false,
  },
};

export default metaAntTheme;

