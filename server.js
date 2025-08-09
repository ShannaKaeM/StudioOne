import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const app = express()
const PORT = 5175
const DATA_DIR = path.resolve(process.cwd(), 'guardian-data')

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(bodyParser.json({ limit: '2mb' }))

function safePath(...segments) {
  const p = path.resolve(DATA_DIR, ...segments)
  if (!p.startsWith(DATA_DIR)) {
    throw new Error('Invalid path')
  }
  return p
}

function readJSON(rel) {
  const file = safePath(rel)
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}
function writeJSON(rel, data) {
  const file = safePath(rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

function sha256OfFile(absPath) {
  const hash = crypto.createHash('sha256')
  const data = fs.readFileSync(absPath)
  hash.update(data)
  return hash.digest('hex')
}

// Config
app.get('/config', (_req, res) => {
  try { res.json(readJSON('guardian.config.json')) } catch (e) { res.status(404).json({ error: 'config not found' }) }
})
app.put('/config', (req, res) => {
  try { writeJSON('guardian.config.json', req.body); res.json({ success: true }) } catch (e) { res.status(500).json({ error: e.message }) }
})

// Nodes
app.get('/nodes', (_req, res) => {
  try {
    const dir = safePath('nodes')
    if (!fs.existsSync(dir)) return res.json([])
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
    const items = files.map(f => readJSON(path.join('nodes', f)))
    res.json(items)
  } catch (e) { res.status(500).json({ error: e.message }) }
})
app.get('/nodes/:id', (req, res) => {
  try { res.json(readJSON(path.join('nodes', `${req.params.id}.json`))) } catch (e) { res.status(404).json({ error: 'not found' }) }
})
app.put('/nodes/:id', (req, res) => {
  try { writeJSON(path.join('nodes', `${req.params.id}.json`), req.body); res.json({ success: true }) } catch (e) { res.status(500).json({ error: e.message }) }
})

// Agents
app.get('/agents', (_req, res) => {
  try {
    const dir = safePath('agents')
    if (!fs.existsSync(dir)) return res.json([])
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
    const items = files.map(f => readJSON(path.join('agents', f)))
    res.json(items)
  } catch (e) { res.status(500).json({ error: e.message }) }
})
app.get('/agents/:id', (req, res) => {
  try { res.json(readJSON(path.join('agents', `${req.params.id}.json`))) } catch (e) { res.status(404).json({ error: 'not found' }) }
})
app.put('/agents/:id', (req, res) => {
  try { writeJSON(path.join('agents', `${req.params.id}.json`), req.body); res.json({ success: true }) } catch (e) { res.status(500).json({ error: e.message }) }
})

// Advisories
app.get('/advisories', (_req, res) => {
  try {
    const dir = safePath('advisories')
    if (!fs.existsSync(dir)) return res.json([])
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
    const items = files.map(f => readJSON(path.join('advisories', f)))
    res.json(items)
  } catch (e) { res.status(500).json({ error: e.message }) }
})
app.get('/advisories/:id', (req, res) => {
  try { res.json(readJSON(path.join('advisories', `${req.params.id}.json`))) } catch (e) { res.status(404).json({ error: 'not found' }) }
})
app.put('/advisories/:id', (req, res) => {
  try { writeJSON(path.join('advisories', `${req.params.id}.json`), req.body); res.json({ success: true }) } catch (e) { res.status(500).json({ error: e.message }) }
})

// Docs (simple by name)
app.get('/docs', (_req, res) => {
  try {
    const dir = safePath('docs')
    if (!fs.existsSync(dir)) return res.json([])
    const files = fs.readdirSync(dir)
    res.json(files)
  } catch (e) { res.status(500).json({ error: e.message }) }
})
app.get('/docs/:name', (req, res) => {
  try {
    const file = safePath(path.join('docs', req.params.name))
    res.type(path.extname(file)).send(fs.readFileSync(file, 'utf8'))
  } catch (e) { res.status(404).json({ error: 'not found' }) }
})
app.put('/docs/:name', (req, res) => {
  try {
    const file = safePath(path.join('docs', req.params.name))
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, typeof req.body === 'string' ? req.body : JSON.stringify(req.body, null, 2), 'utf8')
    res.json({ success: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// Theme
app.get('/theme', (_req, res) => {
  try { res.json(readJSON(path.join('themes', 'guardian-theme.json'))) } catch (e) { res.status(404).json({ error: 'theme not found' }) }
})
app.put('/theme', (req, res) => {
  try { writeJSON(path.join('themes', 'guardian-theme.json'), req.body); res.json({ success: true }) } catch (e) { res.status(500).json({ error: e.message }) }
})

// Checks: scan node paths for forbidden patterns
function normalizeRelPath(p) {
  if (p.startsWith('guardian-data/')) return p.replace(/^guardian-data\//, '')
  return p
}

app.post('/checks/run', (_req, res) => {
  try {
    const dir = safePath('nodes')
    if (!fs.existsSync(dir)) return res.json({ results: [] })
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
    const nodes = files.map(f => readJSON(path.join('nodes', f)))

    const results = []
    const createdAdvisories = []
    nodes.forEach(node => {
      const issues = []
      const patterns = (node.checks && node.checks.patterns) || {}
      const forbid = patterns.forbid || []
      const requireP = patterns.require || []

      (node.paths || []).forEach(rel => {
        const normalized = normalizeRelPath(rel)
        const filePath = safePath(normalized)
        if (!fs.existsSync(filePath)) {
          issues.push({ path: rel, rule: 'missing', message: 'File not found' })
          return
        }
        const content = fs.readFileSync(filePath, 'utf8')
        // Forbid patterns
        forbid.forEach(pattern => {
          try {
            const re = new RegExp(pattern)
            if (re.test(content)) {
              issues.push({ path: rel, rule: 'forbid', pattern, message: `Forbidden pattern matched: ${pattern}` })
            }
          } catch (e) {
            issues.push({ path: rel, rule: 'forbid', pattern, message: `Invalid regex: ${pattern}` })
          }
        })
        // Require patterns
        requireP.forEach(pattern => {
          try {
            const re = new RegExp(pattern)
            if (!re.test(content)) {
              issues.push({ path: rel, rule: 'require', pattern, message: `Required pattern not found: ${pattern}` })
            }
          } catch (e) {
            issues.push({ path: rel, rule: 'require', pattern, message: `Invalid regex: ${pattern}` })
          }
        })
      })

      // Checksum baseline compare (if enabled)
      if (node.checks && (node.checks.checksum === 'sha256')) {
        const baseline = (node.checks.baseline || {})
        ;(node.paths || []).forEach(rel => {
          const normalized = normalizeRelPath(rel)
          const filePath = safePath(normalized)
          if (fs.existsSync(filePath)) {
            const current = sha256OfFile(filePath)
            const prev = baseline[rel] || baseline[normalized]
            if (prev && prev !== current) {
              issues.push({ path: rel, rule: 'checksum', message: 'Checksum changed from baseline' })
            }
          }
        })
      }

      const ok = issues.length === 0
      results.push({ nodeId: node.id, ok, issues })

      if (!ok) {
        const advisoryId = `${node.id}-${Date.now()}`
        const advisory = {
          id: advisoryId,
          nodeId: node.id,
          createdAt: new Date().toISOString(),
          state: 'open',
          issues
        }
        writeJSON(path.join('advisories', `${advisoryId}.json`), advisory)
        createdAdvisories.push(advisory)
      }
    })

    res.json({ results, advisories: createdAdvisories })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Approve baseline for a node (compute current sha256 for each path and store)
app.post('/nodes/:id/approve-baseline', (req, res) => {
  try {
    const nodePath = path.join('nodes', `${req.params.id}.json`)
    const node = readJSON(nodePath)
    if (!node.checks) node.checks = {}
    if (!node.checks.baseline) node.checks.baseline = {}
    node.checks.checksum = 'sha256'

    ;(node.paths || []).forEach(rel => {
      const normalized = normalizeRelPath(rel)
      const filePath = safePath(normalized)
      if (fs.existsSync(filePath)) {
        const h = sha256OfFile(filePath)
        node.checks.baseline[rel] = h
      }
    })
    writeJSON(nodePath, node)
    res.json({ success: true, baseline: node.checks.baseline })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`Guardian API running at http://localhost:${PORT}`)
})

