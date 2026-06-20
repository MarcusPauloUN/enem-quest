import { useState, useEffect, useCallback, useRef } from 'react'
import { EventBus, Events } from '@game/EventBus'
import { useUIStore } from '@store/uiStore'
import { usePhaserEvent } from '@hooks/usePhaserEvent'
import type { QuizPayload, AnswerKey, QuizAnswerPayload } from '../../types/question.d'

const TIMER_SECONDS = 60

type QuizTab = 'question' | 'scratch' | 'calc'

// ── Calculadora simples ───────────────────────────────────────────────────────
function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expr, setExpr] = useState('')

  function press(val: string) {
    if (val === 'C') { setDisplay('0'); setExpr(''); return }
    if (val === '=') {
      try {
        // Substitui × por * e ÷ por / e √ por Math.sqrt
        const safe = expr
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/√(\d+\.?\d*)/g, (_, n) => String(Math.sqrt(Number(n))))
          .replace(/(\d+\.?\d*)²/g, (_, n) => String(Math.pow(Number(n), 2)))
        // eslint-disable-next-line no-new-func
        const result = Function('"use strict"; return (' + safe + ')')()
        const str = String(parseFloat(result.toFixed(10)))
        setDisplay(str)
        setExpr(str)
      } catch {
        setDisplay('Erro')
        setExpr('')
      }
      return
    }
    const next = expr === '0' || expr === 'Erro' ? val : expr + val
    setExpr(next)
    setDisplay(next)
  }

  const rows = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['√', '0', '.', '²'],
    ['='],
  ]

  return (
    <div className="flex flex-col gap-1 p-2">
      <div className="bg-black/50 border border-gray-700 rounded px-3 py-2 font-mono text-right text-green-300 text-sm min-h-[2rem] overflow-x-auto whitespace-nowrap">
        {display}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((btn) => (
            <button
              key={btn}
              onClick={() => press(btn)}
              className={`flex-1 py-2 font-mono text-xs rounded border transition-colors
                ${btn === '=' ? 'bg-blue-700 hover:bg-blue-600 border-blue-500 text-white' :
                  btn === 'C' ? 'bg-red-900 hover:bg-red-800 border-red-700 text-red-200' :
                  'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200'}`}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── QuizModal principal ───────────────────────────────────────────────────────
export function QuizModal() {
  const { quizOpen, quizPayload, openQuiz, closeQuiz } = useUIStore()
  const [selected, setSelected] = useState<AnswerKey | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [eliminatedOptions, setEliminatedOptions] = useState<AnswerKey[]>([])
  const [shuffledKeys, setShuffledKeys] = useState<AnswerKey[]>(['A', 'B', 'C', 'D', 'E'])
  const [activeTab, setActiveTab] = useState<QuizTab>('question')
  const [scratchText, setScratchText] = useState('')
  const startTime = useRef(Date.now())

  const onShowQuiz = useCallback((payload: QuizPayload) => {
    openQuiz(payload)
    setSelected(null)
    setRevealed(false)
    setTimeLeft(TIMER_SECONDS)
    setEliminatedOptions([])
    setActiveTab('question')
    setScratchText('')
    startTime.current = Date.now()

    const abilities = payload.bossAbilities ?? []
    if (abilities.some((a) => a.effect === 'shuffle_options')) {
      const keys: AnswerKey[] = ['A', 'B', 'C', 'D', 'E']
      setShuffledKeys([...keys].sort(() => Math.random() - 0.5))
    } else {
      setShuffledKeys(['A', 'B', 'C', 'D', 'E'])
    }
  }, [openQuiz])

  usePhaserEvent<QuizPayload>(Events.SHOW_QUIZ, onShowQuiz)

  useEffect(() => {
    if (!quizOpen || revealed) return
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(interval); handleAnswer(null); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [quizOpen, revealed])

  if (!quizOpen || !quizPayload) return null

  const { question, clueHint, bossAbilities } = quizPayload
  const activeEffects = (bossAbilities ?? []).map((a) => a.effect)
  const hideStatement = activeEffects.includes('hide_statement')
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100
  const timerColor = timeLeft > 30 ? '#27ae60' : timeLeft > 10 ? '#f39c12' : '#e74c3c'

  function handleAnswer(key: AnswerKey | null) {
    if (revealed || !quizPayload) return
    setSelected(key)
    setRevealed(true)
    const correct = key === quizPayload.question.answer
    const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)
    const payload: QuizAnswerPayload = {
      correct, answer: key ?? quizPayload.question.answer,
      timeSpent, itemUsed: null, clueId: quizPayload.clueId,
    }
    setTimeout(() => { EventBus.emit(Events.QUIZ_ANSWER, payload); closeQuiz() }, 1800)
  }

  function handleHintPotion() {
    if (!quizPayload) return
    const wrong = (Object.keys(quizPayload.question.options) as AnswerKey[])
      .filter((k) => k !== quizPayload.question.answer && !eliminatedOptions.includes(k))
    setEliminatedOptions(wrong.slice(0, 2))
    EventBus.emit(Events.INVENTORY_USE_ITEM, { itemId: 'hint_potion', context: quizPayload.context })
  }

  const tabs: { id: QuizTab; label: string }[] = [
    { id: 'question', label: '📋 Questão' },
    { id: 'scratch',  label: '✏️ Rascunho' },
    { id: 'calc',     label: '🔢 Calculadora' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-gray-900 border-2 border-blue-800 rounded-sm w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 shrink-0">
          <span className="font-mono text-[10px] text-blue-300 uppercase tracking-widest">
            {question.subject.toUpperCase()} • {question.year} • Dif. {'⭐'.repeat(question.difficulty)}
          </span>
          <span className="font-mono text-[10px]" style={{ color: timerColor }}>⏱ {timeLeft}s</span>
        </div>

        {/* Timer bar */}
        <div className="h-1 bg-gray-700 shrink-0">
          <div className="h-full transition-all duration-1000" style={{ width: `${timerPercent}%`, backgroundColor: timerColor }} />
        </div>

        {/* Boss ability warning */}
        {activeEffects.length > 0 && (
          <div className="px-4 py-1 bg-red-950 border-b border-red-800 text-center shrink-0">
            <span className="font-mono text-[9px] text-red-300">⚡ {activeEffects.join(', ')}</span>
          </div>
        )}

        {/* Clue hint */}
        {clueHint && (
          <div className="px-4 py-1.5 bg-yellow-950 border-b border-yellow-800 shrink-0">
            <p className="font-mono text-[10px] text-yellow-300">💡 Pista: {clueHint}</p>
          </div>
        )}

        {/* Enunciado — sempre visível */}
        <div className="px-5 pt-3 pb-2 border-b border-gray-700 shrink-0 max-h-[28vh] overflow-y-auto">
          <div
            className={`font-mono text-[11px] text-gray-200 leading-relaxed ${hideStatement ? 'blur-[2px] select-none' : ''}`}
            dangerouslySetInnerHTML={{ __html: question.statement }}
          />
          {question.image_url && (
            <img src={question.image_url} alt="Imagem da questão" className="mt-2 max-w-full rounded border border-gray-700" />
          )}
        </div>

        {/* Abas */}
        <div className="flex border-b border-gray-700 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-1.5 font-mono text-[10px] transition-colors
                ${activeTab === tab.id
                  ? 'bg-gray-800 text-blue-300 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        <div className="flex-1 overflow-y-auto min-h-0">

          {/* ABA: Questão */}
          {activeTab === 'question' && (
            <div className="px-5 py-3 space-y-2">
              {shuffledKeys.map((key) => {
                const isEliminated = eliminatedOptions.includes(key)
                const isSelected = selected === key
                const isCorrect = revealed && key === question.answer
                const isWrong = revealed && isSelected && !isCorrect

                let borderColor = 'border-gray-700'
                let bgColor = 'bg-gray-800 hover:bg-gray-750'
                let textColor = 'text-gray-200'

                if (isEliminated) { bgColor = 'bg-gray-900'; textColor = 'text-gray-600' }
                if (isSelected && !revealed) { borderColor = 'border-blue-500'; bgColor = 'bg-blue-950' }
                if (isCorrect) { borderColor = 'border-green-500'; bgColor = 'bg-green-950'; textColor = 'text-green-300' }
                if (isWrong) { borderColor = 'border-red-500'; bgColor = 'bg-red-950'; textColor = 'text-red-300' }

                return (
                  <button
                    key={key}
                    disabled={revealed || isEliminated}
                    onClick={() => handleAnswer(key)}
                    className={`w-full text-left px-3 py-2 border ${borderColor} ${bgColor} ${textColor} rounded-sm font-mono text-[11px] transition-colors disabled:cursor-not-allowed`}
                  >
                    <span className="text-gray-500 mr-2">{key})</span>
                    <span className={isEliminated ? 'line-through' : ''}>{question.options[key]}</span>
                    {isCorrect && <span className="ml-2 text-green-400">✓</span>}
                    {isWrong && <span className="ml-2 text-red-400">✗</span>}
                  </button>
                )
              })}

              {/* Explicação */}
              {revealed && question.explanation && (
                <div className="mt-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-sm">
                  <p className="font-mono text-[10px] text-gray-300">
                    <span className="text-yellow-400">📖 </span>{question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ABA: Rascunho */}
          {activeTab === 'scratch' && (
            <div className="h-full p-3 flex flex-col">
              <p className="font-mono text-[9px] text-gray-500 mb-2">Use este espaço para cálculos e anotações. O enunciado permanece visível acima.</p>
              <textarea
                className="flex-1 w-full bg-gray-800 border border-gray-700 rounded p-2 font-mono text-[11px] text-gray-200 resize-none focus:outline-none focus:border-blue-600 placeholder-gray-600 min-h-[180px]"
                placeholder="Rascunhe aqui seus cálculos..."
                value={scratchText}
                onChange={(e) => setScratchText(e.target.value)}
                spellCheck={false}
              />
              <button
                onClick={() => setScratchText('')}
                className="mt-2 self-end font-mono text-[9px] text-gray-600 hover:text-gray-400 transition-colors"
              >
                🗑 Limpar rascunho
              </button>
            </div>
          )}

          {/* ABA: Calculadora */}
          {activeTab === 'calc' && <Calculator />}
        </div>

        {/* Footer */}
        <div className="px-5 py-2 bg-gray-800 border-t border-gray-700 flex items-center justify-between shrink-0">
          <button
            onClick={handleHintPotion}
            disabled={revealed || eliminatedOptions.length > 0}
            className="font-mono text-[9px] text-yellow-400 hover:text-yellow-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            💡 Usar Poção da Dica
          </button>
          <span className="font-mono text-[9px] text-gray-500">
            {revealed
              ? (selected === question.answer ? '✅ Resposta correta!' : '❌ Resposta errada!')
              : activeTab === 'question' ? 'Selecione uma alternativa' : 'Volte à aba Questão para responder'}
          </span>
        </div>
      </div>
    </div>
  )
}
