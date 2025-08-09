import React from 'react'
import { NodesPage } from './pages/NodesPage'
import { AdvisoriesPanel } from './components/AdvisoriesPanel'
import { DocsPage } from './pages/DocsPage'
import { MiniUIGenerator } from './components/MiniUIGenerator'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24 }}>
      <h1>Studio ONE</h1>
      <p>Unified visual builder with governance - merging S4, One, Docs, and Guardian.</p>
      <NodesPage />
      <div style={{ marginTop: 24 }}>
        <AdvisoriesPanel />
      </div>
      <div style={{ marginTop: 24 }}>
        <DocsPage />
      </div>
      <div style={{ marginTop: 24 }}>
        <h2>UIGenerator Preview</h2>
        <p>Token-driven preview using guardian-theme.json</p>
        <MiniUIGenerator />
      </div>
    </div>
  )
}

