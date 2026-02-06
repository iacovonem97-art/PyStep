import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock environment variables
vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co')
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-anon-key')

describe('Supabase Client', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should initialize without error', async () => {
    const { supabase } = await import('./supabase')
    expect(supabase).toBeDefined()
  })

  it('should export auth methods', async () => {
    const { supabase } = await import('./supabase')
    expect(supabase.auth).toBeDefined()
    expect(supabase.auth.signUp).toBeDefined()
    expect(supabase.auth.signInWithPassword).toBeDefined()
    expect(supabase.auth.signOut).toBeDefined()
  })
})
