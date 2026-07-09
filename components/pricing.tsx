'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, CocktailGlass, Bottle } from '@/components/decorations'

type Plan = {
  id: 'enthusiast' | 'bartender'
  title: string
  features: string[]
  subscriptions: { label: string; price: string; oldPrice?: string }[]
}

const enthusiast: Plan = {
  id: 'enthusiast',
  title: 'Энтузиаст',
  features: [
    '25 рецептов коктейлей',
    '5 основных видов алкоголя',
    'Гайд по базовому инвентарю',
    'Техники приготовления',
  ],
  subscriptions: [{ label: 'Навсегда', price: '1000 ₽' }],
}

const bartender: Plan = {
  id: 'bartender',
  title: 'Бармен',
  features: [
    '100+ классических коктейлей и история',
    'Тесты и шпаргалки',
    'Полный гид по алкоголю',
    'Живые обновления',
    'Авторские коктейли',
  ],
  subscriptions: [
    { label: '1 месяц', price: '599 ₽', oldPrice: '699 ₽' },
    { label: '3 месяца', price: '1499 ₽', oldPrice: '1599 ₽' },
    { label: 'Навсегда', price: '4999 ₽', oldPrice: '5999 ₽' },
  ],
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span style={{ color: 'var(--accent-primary)' }}>•</span>
      <span>{children}</span>
    </li>
  )
}

export function Pricing() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null)

  return (
    <section className="relative z-10 mx-auto max-w-[900px] px-5 py-12">
      {/* Glowing ring halo behind the heading (slow spin) */}
      <div
        aria-hidden="true"
        className="decor"
        style={{ top: '4px', left: '50%', transform: 'translateX(-50%)', width: 'min(360px,64vw)', opacity: 0.38 }}
      >
        <img src="/logos/ring.webp" alt="" className="decor-spin" style={{ display: 'block', width: '100%' }} />
      </div>

      {/* Energy bolts flanking the card: two on the left (by the price and by the
          button) and a single one centred vertically on the right */}
      <img
        src="/logos/bolt.webp"
        alt=""
        aria-hidden="true"
        className="decor decor-float decor--desktop pricing-bolt pricing-bolt--tl"
        style={{ width: '86px', top: '27%', left: '1%', opacity: 0.9 }}
      />
      <div
        aria-hidden="true"
        className="decor decor-float-slow decor--desktop pricing-bolt pricing-bolt--bl"
        style={{ width: '78px', top: '77%', left: '2%' }}
      >
        <img src="/logos/bolt.webp" alt="" style={{ display: 'block', width: '100%', opacity: 0.85, transform: 'scaleY(-1)' }} />
      </div>
      <div
        aria-hidden="true"
        className="decor decor-float-slow decor--desktop pricing-bolt pricing-bolt--rc"
        style={{ width: '86px', top: '48%', right: '1%' }}
      >
        <img src="/logos/bolt.webp" alt="" style={{ display: 'block', width: '100%', opacity: 0.9, transform: 'scaleX(-1)' }} />
      </div>

      {/* Bar decor scattered around the card (desktop only) — client-marked spots:
          plus/cross marks at the dots, cocktail glasses and a bottle, reusing the
          same line-icon shapes as the hero/background scatter. */}
      <div aria-hidden="true" className="decor--desktop pointer-events-none" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 'min(1340px, 96vw)', transform: 'translateX(-50%)', zIndex: 0 }}>
        <Plus style={{ top: '16%', left: '15%', opacity: 0.22, fontSize: 18, color: '#a8d4ff' }} />
        <Plus style={{ top: '62%', left: '24%', opacity: 0.2, fontSize: 16, color: '#1a6fff', transform: 'rotate(45deg)' }} />
        <Plus style={{ top: '35%', right: '22%', opacity: 0.22, fontSize: 17, color: '#a8d4ff', transform: 'rotate(45deg)' }} />
        <Plus style={{ top: '74%', right: '25%', opacity: 0.2, fontSize: 16, color: '#1a6fff' }} />
        <CocktailGlass style={{ top: '50%', left: '4%', opacity: 0.2, transform: 'rotate(-6deg)' }} w={36} h={44} />
        <CocktailGlass style={{ top: '22%', right: '5%', opacity: 0.2, transform: 'rotate(8deg)' }} w={36} h={44} />
        <Bottle style={{ top: '84%', right: '8%', opacity: 0.17, transform: 'rotate(-5deg)' }} w={28} h={56} />
      </div>

      <h2
        className="reveal relative mb-12 text-balance text-center font-bold"
        style={{ fontSize: 'clamp(26px,3.5vw,36px)', color: 'var(--text-primary)', zIndex: 1 }}
      >
        Выберите свой тариф
      </h2>

      <div className="reveal relative mx-auto grid max-w-[640px] grid-cols-1 gap-6" style={{ zIndex: 1 }}>
        {/* CARD — Бармен */}
        <div
          className="flex flex-col rounded-2xl p-7"
          style={{
            background: 'radial-gradient(120% 85% at 88% 2%, rgba(56, 138, 255, 0.42) 0%, rgba(26, 111, 255, 0.12) 34%, rgba(26, 111, 255, 0) 62%), linear-gradient(160deg, rgba(26, 111, 255, 0.14) 0%, rgba(10, 24, 48, 0.5) 100%)',
            backdropFilter: 'blur(14px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
            border: '1px solid rgba(120,170,255,0.26)',
            boxShadow: '0 12px 40px rgba(26,111,255,0.22), 0 0 55px rgba(26,111,255,0.13), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-[1.5px] uppercase"
              style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)' }}
            >
              Все включено
            </span>
            <span style={{ fontSize: '16px' }}>🔥</span>
          </div>
          <h3 className="mt-3 text-[26px] font-bold" style={{ color: 'var(--text-primary)' }}>
            Бармен
          </h3>
          <p className="mt-1 text-[28px] font-extrabold" style={{ color: 'var(--text-primary)' }}>
            от 599 ₽
          </p>
          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            / месяц
          </p>

          <div className="my-5 h-px w-full" style={{ background: 'var(--border-subtle)' }} />

          <ul
            className="mb-6 flex-1 space-y-1 text-[14px] leading-loose"
            style={{ color: 'var(--text-muted)' }}
          >
            {bartender.features.map((f) => (
              <Bullet key={f}>
                {f}
                {f === 'Авторские коктейли' && (
                  <span
                    style={{
                      marginLeft: '8px',
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      borderRadius: '6px',
                      background: 'linear-gradient(90deg, #c9a24a, #f3dd97)',
                      color: '#2a1c02',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      boxShadow: '0 0 12px rgba(201,162,74,0.45)',
                    }}
                  >
                    Эксклюзив
                  </span>
                )}
              </Bullet>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setActivePlan(bartender)}
            className="btn-cta w-full px-6 py-3.5 text-[13px]"
          >
            Подробнее
          </button>
        </div>
      </div>

      {activePlan && <PlanModal plan={activePlan} onClose={() => setActivePlan(null)} />}
    </section>
  )
}

const accordionSections = [
  {
    title: 'Классические коктейли',
    content: '100+ классических коктейлей и их история. Рецепты из актуального списка IBA с пропорциями, техникой приготовления и легендой создания каждого коктейля — откуда он взялся и почему вошёл в классику.',
  },
  {
    title: 'Гид по алкоголю',
    content: 'Классификация по 12 видам алкоголя: происхождение, этапы производства, региональные особенности, виды, популярные дома.',
  },
  {
    title: 'Живые обновления',
    content: 'База не статична — контент пополняется каждую неделю новыми материалами, рецептами и темами. Вы так же можете участвовать в развитии библиотеки и предлагать свои идеи.',
  },
  {
    title: 'Тесты и шпаргалки',
    content: 'Короткие проверочные вопросы с вариантами ответа и опорные карточки по пройденным темам — для самопроверки и быстрого повторения перед сменой или собеседованием.',
  },
  {
    title: 'Авторские коктейли',
    content: 'Подборка авторских рецептов и разбор того, как разрабатывать собственные коктейли — от чего отталкиваться при составлении коктейльной карты или меню заведения.',
  },
  {
    title: 'Домашний бар',
    content: 'Гид по сборке бара для дома: минимальный набор ингредиентов, базовые технологии изготовления домашних настоек и рекомендации по хранению алкоголя.',
  },
  {
    title: 'Техники приготовления',
    content: 'Разбор техник — шейк, стир, билд, бленд, милк панч, копчение, су-вид и другие: что это, чем отличаются и для каких коктейлей какая подходит.',
  },
  {
    title: 'Инвентарь бармена',
    content: 'Перечень барных инструментов с описанием назначения, критериев выбора и правилами ухода.',
  },
]

function AccordionItem({ title, content, isOpen, onToggle }: { title: string; content: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="acc-btn"
        style={{ color: isOpen ? 'var(--accent-bright)' : 'white' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <span
            aria-hidden="true"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              flexShrink: 0,
              background: isOpen ? 'var(--accent-primary)' : 'rgba(120, 170, 255, 0.45)',
              boxShadow: isOpen ? '0 0 10px var(--accent-glow)' : 'none',
              transition: 'background 0.2s ease, box-shadow 0.2s ease',
            }}
          />
          {title}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            lineHeight: 1,
            flexShrink: 0,
            marginLeft: '16px',
          }}
        >
          {isOpen ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="0" y1="0" x2="10" y2="10" stroke="var(--accent-bright)" strokeWidth="1.5"/>
              <line x1="10" y1="0" x2="0" y2="10" stroke="var(--accent-bright)" strokeWidth="1.5"/>
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
        </div>
      </button>
      {/* grid-rows 0fr->1fr анимирует точную высоту контента (без запаса
          max-height), поэтому раскрытие идёт всю длительность равномерно */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transition:
            'grid-template-rows 0.65s cubic-bezier(0.33, 0, 0.2, 1), opacity 0.5s ease',
          borderBottom: `1px solid ${isOpen ? 'rgba(26, 111, 255, 0.1)' : 'rgba(26, 111, 255, 0)'}`,
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <p
            style={{
              padding: '14px 8px 20px',
              color: 'var(--text-muted)',
              fontSize: '13px',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}

function PlanModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({})
  const modalPanelRef = useRef<HTMLDivElement | null>(null)

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      // If the clicked section is already open, close it
      if (prev[index]) {
        return { [index]: false }
      }
      // Otherwise, close all and open only the clicked one
      return { [index]: true }
    })
  }

  // Lock background scroll while the modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

 useEffect(() => {
  const el = modalPanelRef.current
  if (!el) return

  let startY = 0
  let startScroll = 0

  const onTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].clientY
    startScroll = el.scrollTop
  }

  const onTouchMove = (e: TouchEvent) => {
    const delta = e.touches[0].clientY - startY
    // только если в самом верху и тянем вниз
    if (startScroll <= 0 && delta > 0) {
      // останавливаем скролл страницы и двигаем модал
      e.stopPropagation()
      el.style.transform = `translateY(${delta}px)`
      el.style.transition = 'none'
    }
  }

  const onTouchEnd = (e: TouchEvent) => {
    const delta = e.changedTouches[0].clientY - startY
    if (startScroll <= 0 && delta > 80) {
      el.style.transition = 'transform 0.3s ease'
      el.style.transform = `translateY(${window.innerHeight}px)`
      setTimeout(() => onClose(), 300)
    } else {
      el.style.transition = 'transform 0.2s ease'
      el.style.transform = 'translateY(0)'
    }
  }

  el.addEventListener('touchstart', onTouchStart, { passive: true })
  el.addEventListener('touchmove', onTouchMove, { passive: true })
  el.addEventListener('touchend', onTouchEnd, { passive: true })

  return () => {
    el.removeEventListener('touchstart', onTouchStart)
    el.removeEventListener('touchmove', onTouchMove)
    el.removeEventListener('touchend', onTouchEnd)
  }
}, [onClose])
  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', touchAction: 'none' }}
      onClick={onClose}
      suppressHydrationWarning
    >
      <div
        ref={modalPanelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Тариф ${plan.title}`}
        className="modal-panel relative w-full max-w-[680px] px-5 pb-10 pt-4 [&::-webkit-scrollbar]:hidden"
        style={{
          background: 'var(--bg-card)',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none' as const,
          msOverflowStyle: 'none' as const,
          touchAction: 'pan-y',
        }}
        onClick={(e) => e.stopPropagation()}
        suppressHydrationWarning
      >
        {/* Ambient brand-blue glow bleeding from the top */}
        <div className="modal-glow" aria-hidden="true" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 2 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative" style={{ zIndex: 1 }}>
          {/* Swipe handle indicator */}
          <div
            className="mx-auto mb-5 h-1 w-10 rounded-full"
            style={{ background: 'var(--border-subtle)' }}
          />

          {/* Header — eyebrow pill, title, badge + tagline */}
          <div className="flex flex-col items-center text-center">
            <span className="tariff-pill">тариф</span>
            <h2 className="mt-3 font-black" style={{ fontSize: '40px', color: 'var(--text-primary)', fontWeight: 800, lineHeight: 1.1 }}>
              {plan.title}
            </h2>
            {plan.id === 'bartender' && (
              <p className="mt-3 max-w-[430px] text-[13px]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Полный доступ ко всей библиотеке.
              </p>
            )}
          </div>

          {/* Divider — short gradient hairline */}
          <div
            className="mx-auto my-6 h-px w-full max-w-[130px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(26,111,255,0.65), transparent)' }}
          />

          {plan.id === 'bartender' ? (
            <div className="plan-includes" style={{ padding: '22px 24px' }}>
              <h3
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 4px',
                  textAlign: 'center',
                }}
              >
                Что входит в тариф
              </h3>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 14px' }}>
                Нажмите на раздел, чтобы узнать подробнее
              </p>
              {accordionSections.map((section, index) => (
                <AccordionItem
                  key={index}
                  title={section.title}
                  content={section.content}
                  isOpen={expandedSections[index] || false}
                  onToggle={() => toggleSection(index)}
                />
              ))}
            </div>
          ) : (
            <>
              <p className="mb-3 text-[14px] font-medium" style={{ color: 'var(--text-muted)' }}>
                Что входит:
              </p>
              <ul className="space-y-1 text-[15px] leading-loose" style={{ color: 'var(--text-primary)' }}>
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span style={{ color: 'var(--accent-primary)' }}>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Subscription */}
          <p className="mb-3 mt-7 text-center text-[16px] font-semibold" style={{ color: 'var(--text-primary)' }}>
            Выберите подписку
          </p>
          <div className="space-y-3">
            {plan.subscriptions.map((s) => {
              const isBest = s.label === 'Навсегда'
              return (
                <div
                  key={s.label}
                  className={`sub-row flex items-center justify-between${isBest ? ' sub-row--best' : ''}`}
                  style={{ background: 'var(--bg-card-alt)', padding: '18px 20px', borderRadius: '14px' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="text-[16px] font-medium" style={{ color: 'var(--text-primary)' }}>
                      {s.label}
                    </span>
                    {isBest && <span className="sub-badge">Выгодно</span>}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {s.oldPrice && (
                      <span style={{ fontSize: '15px', color: '#5a6a8a', textDecoration: 'line-through' }}>
                        {s.oldPrice}
                      </span>
                    )}
                    <span className="text-[17px] font-bold" style={{ color: 'var(--text-primary)' }}>
                      {s.price}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="btn-cta mt-6 flex w-full items-center justify-center gap-2 px-6 py-[16px] text-[13px]"
          >
            Перейти к оплате
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px', flexShrink: 0, color: '#fff' }} aria-hidden="true">
              <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634L21.044 2.32c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
