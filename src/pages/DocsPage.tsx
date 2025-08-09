import React, { useEffect, useState } from 'react'
import { getDocsList, getDoc, saveDoc } from '@/adapters/storage-fs'

export function DocsPage() {
  const [files, setFiles] = useState<string[]>([])
  const [active, setActive] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const list = await getDocsList()
        setFiles(list)
        if (list.length > 0) {
          const first = list[0]
          setActive(first)
          const text = await getDoc(first)
          setContent(text)
        }
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const openFile = async (name: string) => {
    setActive(name)
    setContent(await getDoc(name))
  }

  const onSave = async () => {
    if (!active) return
    setSaving(true)
    try {
      await saveDoc(active, content)
      alert('Saved!')
    } catch (e) {
      alert('Failed to save doc')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading docs…</p>
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>

  return (
    <div>
      <h3>Docs</h3>
      {files.length === 0 && <p>No docs yet. Create a file under guardian-data/docs/</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16, alignItems: 'start' }}>
        <div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {files.map(name => (
              <li key={name}>
                <button style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 8px', background: name === active ? '#eef' : 'transparent' }} onClick={() => openFile(name)}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {active && (
            <>
              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <strong>{active}</strong>
                <button onClick={onSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={24} style={{ width: '100%', fontFamily: 'monospace' }} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

