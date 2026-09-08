import { theme, type ThemeConfig } from 'antd';
import { opsTokens, type OpsDensity, type OpsMode } from './design-tokens';

/** Public options. Mode and density must also be reflected at the CSS root. */
export interface OpsThemeOptions {
  /** Light content or a complete dark palette; default: light. */
  mode?: OpsMode;
  /** Control/table density without shrinking body text; default: comfortable. */
  density?: OpsDensity;
  /** Disable Ant motion using the application's accessibility preference. */
  reducedMotion?: boolean;
}

/**
 * Build a side-effect-free AntD v5/v6 theme configuration.
 * Merge at the existing application provider; do not create another shell.
 * Component overrides deliberately preserve normal/hover/active color pairs.
 */
export function createOpsTheme({
  mode = 'light',
  density = 'comfortable',
  reducedMotion = false,
}: OpsThemeOptions = {}): ThemeConfig {
  const c = opsTokens.color[mode];
  const d = opsTokens.density[density];
  const { typography: t, radius: r, space: s, motion: m } = opsTokens;
  const focusShadow = `0 0 0 2px ${c.focus}`;

  return {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: c.primary,
      colorPrimaryHover: c.primaryHover,
      colorPrimaryActive: c.primaryActive,
      colorPrimaryBg: c.selected,
      colorPrimaryBgHover: c.selectedHover,
      colorPrimaryBorder: c.controlBorder,
      colorPrimaryText: c.primary,
      colorPrimaryTextHover: c.primaryHover,
      colorPrimaryTextActive: c.primaryActive,
      colorLink: c.primary,
      colorLinkHover: c.primaryHover,
      colorLinkActive: c.primaryActive,
      colorSuccess: c.success,
      colorSuccessText: c.success,
      colorSuccessBg: c.successBg,
      colorSuccessBorder: c.successBorder,
      colorWarning: c.warning,
      colorWarningText: c.warning,
      colorWarningBg: c.warningBg,
      colorWarningBorder: c.warningBorder,
      colorError: c.error,
      colorErrorHover: c.errorHover,
      colorErrorActive: c.errorActive,
      colorErrorText: c.error,
      colorErrorTextHover: c.errorHover,
      colorErrorTextActive: c.errorActive,
      colorErrorBg: c.errorBg,
      colorErrorBorder: c.errorBorder,
      colorInfo: c.info,
      colorInfoText: c.info,
      colorInfoBg: c.infoBg,
      colorInfoBorder: c.infoBorder,
      colorBgLayout: c.canvas,
      colorBgContainer: c.surface,
      colorBgElevated: c.elevated,
      colorBgContainerDisabled: c.disabledBg,
      colorText: c.text,
      colorTextHeading: c.text,
      colorTextSecondary: c.textSecondary,
      colorTextTertiary: c.textMuted,
      colorTextQuaternary: c.textMuted,
      colorTextDescription: c.textSecondary,
      colorTextLabel: c.textSecondary,
      colorTextPlaceholder: c.textMuted,
      colorTextDisabled: c.textDisabled,
      colorTextLightSolid: c.onPrimary,
      colorIcon: c.textMuted,
      colorIconHover: c.text,
      colorBorder: c.controlBorder,
      colorBorderSecondary: c.border,
      colorSplit: c.border,
      colorFillQuaternary: c.subtle,
      controlItemBgActive: c.selected,
      controlItemBgActiveHover: c.selectedHover,
      controlItemBgHover: c.subtle,
      controlOutline: c.focus,
      controlOutlineWidth: 2,
      controlHeight: d.controlHeight,
      controlHeightSM: d.controlHeightSM,
      controlHeightLG: d.controlHeightLG,
      borderRadius: r.control,
      borderRadiusSM: r.small,
      borderRadiusLG: r.overlay,
      fontFamily: t.fontFamily,
      fontFamilyCode: t.fontFamilyCode,
      fontSize: t.fontSize.body,
      fontSizeSM: t.fontSize.caption,
      fontSizeHeading1: t.fontSize.page,
      fontSizeHeading2: t.fontSize.result,
      fontSizeHeading3: t.fontSize.section,
      fontSizeHeading4: t.fontSize.section,
      fontSizeHeading5: t.fontSize.body,
      lineHeight: t.lineHeight.body / t.fontSize.body,
      fontWeightStrong: t.weight.strong,
      boxShadow: opsTokens.shadow.overlay,
      boxShadowSecondary: opsTokens.shadow.overlay,
      boxShadowTertiary: opsTokens.shadow.surface,
      motion: !reducedMotion,
      motionDurationFast: `${m.fast / 1000}s`,
      motionDurationMid: `${m.normal / 1000}s`,
      motionDurationSlow: `${m.slow / 1000}s`,
    },
    components: {
      Button: {
        fontWeight: t.weight.medium,
        primaryColor: c.onPrimary,
        dangerColor: c.onError,
        primaryShadow: 'none',
        dangerShadow: 'none',
        defaultShadow: 'none',
        defaultBg: c.surface,
        defaultColor: c.text,
        defaultBorderColor: c.controlBorder,
        defaultHoverBg: c.subtle,
        defaultHoverColor: c.primaryHover,
        defaultHoverBorderColor: c.primaryHover,
        defaultActiveBg: c.selected,
        defaultActiveColor: c.primaryActive,
        defaultActiveBorderColor: c.primaryActive,
      },
      Input: { activeBorderColor: c.focus, hoverBorderColor: c.primaryHover, activeShadow: focusShadow },
      InputNumber: { activeBorderColor: c.focus, hoverBorderColor: c.primaryHover, activeShadow: focusShadow },
      Select: {
        activeBorderColor: c.focus,
        hoverBorderColor: c.primaryHover,
        activeOutlineColor: c.focus,
        optionSelectedBg: c.selected,
        optionSelectedColor: c.selectedText,
      },
      DatePicker: { activeBorderColor: c.focus, hoverBorderColor: c.primaryHover, activeShadow: focusShadow },
      Table: {
        headerBg: c.subtle,
        headerColor: c.textSecondary,
        borderColor: c.border,
        rowHoverBg: c.subtle,
        rowSelectedBg: c.selected,
        rowSelectedHoverBg: c.selectedHover,
        headerBorderRadius: r.surface,
        cellPaddingBlock: d.cellPaddingBlock,
        cellPaddingInline: d.cellPaddingInline,
        cellPaddingBlockMD: d.cellPaddingBlock,
        cellPaddingInlineMD: d.cellPaddingInline,
        cellPaddingBlockSM: opsTokens.density.compact.cellPaddingBlock,
        cellPaddingInlineSM: opsTokens.density.compact.cellPaddingInline,
        cellFontSize: t.fontSize.body,
        cellFontSizeMD: t.fontSize.body,
        cellFontSizeSM: t.fontSize.body,
      },
      Card: { borderRadiusLG: r.surface, headerFontSize: t.fontSize.section, bodyPadding: s.xl },
      Descriptions: { labelColor: c.textSecondary, contentColor: c.text, itemPaddingBottom: s.lg },
      Form: { labelColor: c.textSecondary, itemMarginBottom: s.xl },
      Tabs: { itemColor: c.textSecondary, itemSelectedColor: c.primary, inkBarColor: c.primary },
      Menu: {
        itemSelectedBg: c.selected,
        itemSelectedColor: c.selectedText,
        darkItemBg: c.shell,
        darkSubMenuItemBg: c.shell,
        darkItemColor: c.shellMuted,
        darkItemHoverColor: c.shellText,
        darkItemSelectedBg: c.shellSelected,
        darkItemSelectedColor: c.shellSelectedText,
      },
      Layout: { bodyBg: c.canvas, headerBg: c.surface, siderBg: c.shell },
    },
  };
}

/** Backwards-compatible import name; v2 intentionally changes visual defaults. */
export const metaAntTheme = createOpsTheme();
export default metaAntTheme;
