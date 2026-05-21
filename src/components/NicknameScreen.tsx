import { useState } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LanguageSwitcher } from './LanguageSwitcher'

interface NicknameScreenProps {
  onContinue: () => void
}

export function NicknameScreen({ onContinue }: NicknameScreenProps) {
  const { ui, setNickname } = useApp()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setError(true)
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
      return
    }
    setError(false)
    setNickname(trimmed)
    onContinue()
  }

  return (
    <div className="flex min-h-[100dvh] flex-col px-4 pb-8 pt-4">
      <div className="mx-auto flex w-full max-w-md justify-end">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-8 w-full max-w-md text-center"
      >
        <p className="text-5xl">🇫🇮</p>
        <h1 className="mt-4 text-2xl font-black text-cyan-300">{ui.welcomeTitle}</h1>
        <p className="mt-2 text-sm text-slate-400">{ui.welcomeSubtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-8 w-full max-w-md"
      >
        <label htmlFor="nickname" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
          <User className="h-4 w-4 text-cyan-400" />
          {ui.nicknameLabel}
        </label>
        <motion.input
          id="nickname"
          type="text"
          maxLength={24}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error) setError(false)
          }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={ui.nicknamePlaceholder}
          animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-slate-600 focus:ring-2 ${
            error
              ? 'border-red-500 ring-red-500/30'
              : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-500/30'
          }`}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm font-medium text-red-400"
          >
            {ui.nicknameError}
          </motion.p>
        )}
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        onClick={submit}
        className="mx-auto mt-8 w-full max-w-md rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]"
      >
        {ui.continueBtn}
      </motion.button>

      <p className="mx-auto mt-4 max-w-md text-center text-[10px] text-slate-600">
        {ui.demoBadge}
      </p>
    </div>
  )
}
