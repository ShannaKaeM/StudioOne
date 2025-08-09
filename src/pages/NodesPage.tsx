import React, { useEffect, useState } from 'react'
import { getNodes, saveNode, runChecks, approveBaseline } from '@/adapters/storage-fs'
import type { GuardianNode } from '@/types'

export function NodesPage() {
  const [nodes, setNodes] = useState<GuardianNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await getNodes()
        setNodes(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const markApproved = async (node: GuardianNode) => {
    const updated = { ...node, status: 'approved' as const }
    await saveNode(node.id, updated)
    setNodes(prev => prev.map(n => n.id === node.id ? updated : n))
  }

  const [checkResults, setCheckResults] = useState<Record<string, { ok: boolean; issues: any[] }>>({})
  const [checking, setChecking] = useState(false)

  const onRunChecks = async () => {
    setChecking(true)
    try {
      const res = await runChecks()
      const map: Record<string, { ok: boolean; issues: any[] }> = {}
      res.results.forEach((r: any) => { map[r.nodeId] = { ok: r.ok, issues: r.issues } })
      setCheckResults(map)
    } catch (e) {
      console.error(e)
      alert('Failed to run checks')
    } finally {
      setChecking(false)
    }
  }

  if (loading) return <p>Loading nodes…</p>
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>

  return (
    <div>
      <h2>Protected Nodes</h2>
      <div style={{ margin: '8px 0 16px' }}>
        <button onClick={onRunChecks} disabled={checking}>{checking ? 'Running checks…' : 'Run Checks'}</button>
      </div>
      {nodes.length === 0 && <p>No nodes yet. Seed guardian-data/nodes/ to begin.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {nodes.map(node => (
          <li key={node.id} style={{ border: '1px solid #ddd', borderRadius: 8, margin: '12px 0', padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{node.name}</strong>
                <div style={{ color: '#666', fontSize: 13 }}>Type: {node.type} • Status: {node.status || 'unknown'}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => markApproved(node)}>Mark Approved</button>
                <button onClick={async () => { await approveBaseline(node.id); alert('Baseline approved for '+node.id); }}>
                  Approve Baseline
                </button>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <code style={{ fontSize: 12 }}>{node.paths.join(', ')}</code>
            </div>
            {checkResults[node.id] && (
              <div style={{ marginTop: 10 }}>
                {checkResults[node.id].ok ? (
                  <div style={{ color: 'green' }}>✔ No issues found</div>
                ) : (
                  <>
                    <ul style={{ color: 'crimson', margin: 0 }}>
                      {checkResults[node.id].issues.map((iss, i) => (
                        <li key={i}>{iss.path}: {iss.message}</li>
                      ))}
                    </ul>
                    <div style={{ fontSize: 12, color: '#555', marginTop: 6 }}>An advisory file was created in guardian-data/advisories/</div>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

