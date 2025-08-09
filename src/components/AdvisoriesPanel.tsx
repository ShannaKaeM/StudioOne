import React, { useEffect, useState } from 'react'
import { getAdvisories, updateAdvisory } from '@/adapters/storage-fs'

interface Advisory {
  id: string
  nodeId: string
  createdAt: string
  state: 'open' | 'acknowledged' | 'approved' | 'rejected'
  issues: { path: string; message: string; rule?: string }[]
}

export function AdvisoriesPanel() {
  const [items, setItems] = useState<Advisory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdvisories()
        setItems(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const updateState = async (adv: Advisory, state: Advisory['state']) => {
    const next = { ...adv, state }
    await updateAdvisory(adv.id, next)
    setItems(prev => prev.map(a => (a.id === adv.id ? next : a)))
  }

  if (loading) return <p>Loading advisories…</p>
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>

  return (
    <div>
      <h3>Advisories</h3>
      {items.length === 0 && <p>No advisories yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(a => (
          <li key={a.id} style={{ border: '1px solid #ddd', borderRadius: 8, margin: '8px 0', padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{a.nodeId}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>#{a.id} • {new Date(a.createdAt).toLocaleString()}</div>
                <div style={{ fontSize: 12, marginTop: 6 }}>State: {a.state}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => updateState(a, 'acknowledged')}>Acknowledge</button>
                <button onClick={() => updateState(a, 'approved')}>Approve</button>
                <button onClick={() => updateState(a, 'rejected')}>Reject</button>
              </div>
            </div>
            <ul style={{ marginTop: 8 }}>
              {a.issues.map((iss, i) => (
                <li key={i} style={{ fontSize: 13 }}>
                  <code>{iss.path}</code> — {iss.message}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

