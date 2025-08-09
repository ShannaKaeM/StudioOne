export type ThemeTokens = {
  color?: Record<string, string>
  space?: Record<string, string>
  [key: string]: any
}

export function applyThemeToRoot(theme: { name?: string; tokens?: ThemeTokens }) {
  if (!theme || !theme.tokens) return
  const root = document.documentElement
  const { color = {}, space = {}, ...rest } = theme.tokens

  // Prefix variables with --g- to avoid collisions
  Object.entries(color).forEach(([k, v]) => root.style.setProperty(`--g-color-${k}`, String(v)))
  Object.entries(space).forEach(([k, v]) => root.style.setProperty(`--g-space-${k}`, String(v)))

  // Generic pass-through for other token groups
  Object.entries(rest).forEach(([group, obj]) => {
    if (obj && typeof obj === 'object') {
      Object.entries(obj as Record<string, any>).forEach(([k, v]) => {
        root.style.setProperty(`--g-${group}-${k}`, String(v))
      })
    }
  })
}

