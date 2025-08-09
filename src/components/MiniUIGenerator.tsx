import React, { useEffect, useState } from 'react'
import { getTheme } from '@/adapters/storage-fs'
import { applyThemeToRoot } from '@/theme/themeProcessor'

// Minimal UIGenerator: renders a tiny dashboard driven by tokens
export function MiniUIGenerator() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    (async () => {
      const theme = await getTheme()
      applyThemeToRoot(theme)
      setReady(true)
    })()
  }, [])

  if (!ready) return <p>Loading theme…</p>

  const cardStyle: React.CSSProperties = {
    background: 'var(--g-color-bg, #fff)',
    color: 'var(--g-color-fg, #111)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 8,
    padding: 'var(--g-space-md, 16px)'
  }

  const buttonStyle: React.CSSProperties = {
    background: 'var(--g-color-accent, #4f46e5)',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer'
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--g-space-lg, 24px)' }}>
      <h3 style={{ margin: 0 }}>Mini UIGenerator (token-driven)</h3>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>Card Title</h4>
        <p style={{ color: 'var(--g-color-muted, #667085)' }}>
          This card uses tokens from guardian-theme.json applied as CSS variables.
        </p>
        <button style={buttonStyle}>Primary Action</button>
      </div>
    </div>
  )
}

