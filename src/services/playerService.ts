/** Cloud-ready player profile — swap storage for Supabase/Firebase later */

export interface PlayerProfile {
  nickname: string
  createdAt: string
  /** Reserved for future auth uid */
  externalId?: string
}

const STORAGE_KEY = 'finnish-survival-player-v2'

export const playerService = {
  load(): PlayerProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as PlayerProfile
      if (!parsed.nickname?.trim()) return null
      return parsed
    } catch {
      return null
    }
  },

  save(nickname: string): PlayerProfile {
    const profile: PlayerProfile = {
      nickname: nickname.trim(),
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    return profile
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY)
  },

  /** Placeholder for Supabase/Firebase sync */
  async syncToCloud(_profile: PlayerProfile): Promise<void> {
    // await supabase.from('players').upsert(...)
  },
}
