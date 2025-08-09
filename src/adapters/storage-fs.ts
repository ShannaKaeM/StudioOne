const API_BASE = 'http://localhost:5175'

export async function getConfig() {
  const res = await fetch(`${API_BASE}/config`)
  if (!res.ok) throw new Error('Failed to load config')
  return res.json()
}

export async function getNodes() {
  const res = await fetch(`${API_BASE}/nodes`)
  if (!res.ok) throw new Error('Failed to load nodes')
  return res.json()
}

export async function getNode(id: string) {
  const res = await fetch(`${API_BASE}/nodes/${id}`)
  if (!res.ok) throw new Error('Failed to load node')
  return res.json()
}

export async function saveNode(id: string, data: any) {
  const res = await fetch(`${API_BASE}/nodes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to save node')
  return res.json()
}

export async function runChecks() {
  const res = await fetch(`${API_BASE}/checks/run`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to run checks')
  return res.json() as Promise<{ results: { nodeId: string; ok: boolean; issues: any[] }[]; advisories?: any[] }>
}

export async function getAdvisories() {
  const res = await fetch(`${API_BASE}/advisories`)
  if (!res.ok) throw new Error('Failed to load advisories')
  return res.json()
}

export async function updateAdvisory(id: string, data: any) {
  const res = await fetch(`${API_BASE}/advisories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update advisory')
  return res.json()
}

export async function approveBaseline(nodeId: string) {
  const res = await fetch(`${API_BASE}/nodes/${nodeId}/approve-baseline`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to approve baseline')
  return res.json()
}

// Docs
export async function getDocsList() {
  const res = await fetch(`${API_BASE}/docs`)
  if (!res.ok) throw new Error('Failed to list docs')
  return res.json() as Promise<string[]>
}

export async function getDoc(name: string) {
  const res = await fetch(`${API_BASE}/docs/${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error('Failed to load doc')
  return res.text()
}

export async function saveDoc(name: string, content: string) {
  const res = await fetch(`${API_BASE}/docs/${encodeURIComponent(name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  })
  if (!res.ok) throw new Error('Failed to save doc')
  return res.json()
}

// Theme
export async function getTheme() {
  const res = await fetch(`${API_BASE}/theme`)
  if (!res.ok) throw new Error('Failed to load theme')
  return res.json()
}

export async function saveTheme(theme: any) {
  const res = await fetch(`${API_BASE}/theme`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(theme)
  })
  if (!res.ok) throw new Error('Failed to save theme')
  return res.json()
}

