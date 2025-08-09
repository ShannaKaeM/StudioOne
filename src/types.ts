export interface NodeCheckConfig {
  checksum?: 'sha256' | 'git' | 'none'
  baseline?: Record<string, string> // path -> sha256
  patterns?: {
    forbid?: string[]
    require?: string[]
  }
  custom?: string[]
}

export interface GuardianNode {
  id: string
  name: string
  type: 'theme' | 'generator' | 'processor' | 'docs' | 'export'
  paths: string[]
  checks: NodeCheckConfig
  agent?: { id: string, name: string, email?: string }
  status?: 'clean' | 'drift' | 'advisory' | 'approved'
}

