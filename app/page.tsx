'use client'

import { useState } from 'react'
import { Decorations, Plus, CocktailGlass, Bottle } from '@/components/decorations'
import { GlossyStar } from '@/components/glossy'
import { Faq } from '@/components/faq'
import { Pricing } from '@/components/pricing'
import { Nav } from '@/components/nav'
import { ScrollReveal } from '@/components/scroll-reveal'

type IBATagProps = {
  paddingTop: string
  paddingBottom: string
  fontSize: string
  paddingLeft: string
  paddingRight: string
}

function IBATagWithTooltip({ paddingTop, paddingBottom, fontSize, paddingLeft, paddingRight }: IBATagProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="about-tag-item feature-tag"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '68px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
          color: 'var(--text-primary)',
          borderRadius: '12px',
          backdropFilter: 'blur(12px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
          fontSize: fontSize,
          fontWeight: 500,
        }}
      >
        <div style={{ fontSize: fontSize }}>Рецептуры на основе стандартов</div>
        <span style={{ color: '#1a6fff', fontWeight: 600, display: 'block', whiteSpace: 'nowrap', marginTop: '4px', fontSize: fontSize }}>IBA</span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#0a1830',
          border: '1px solid rgba(26,111,255,0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12px',
          color: 'white',
          whiteSpace: 'nowrap',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: showTooltip ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        International Bartenders Association —
        <br />
        Международная ассоциация барменов
      </div>
    </div>
  )
}

const featureTags = [
  'Проверено на практике',
  'Новый материал каждую неделю',
  <>Рецептуры на основе стандартов <span style={{ color: '#1a6fff', fontWeight: 600, display: 'inline', whiteSpace: 'nowrap' }}>IBA</span></>,
  'Найди ответ за минуту',
]

const audienceCards = [
  {
    title: 'Новичкам',
    body: 'Никогда не держали шейкер? Не страшно. Начнём с основ — инвентарь, техника, первый коктейль уже сегодня.',
    bottomGradient: 'linear-gradient(90deg, transparent 0%, #1a6fff 20%, #3a5a8a 50%, #1a6fff 80%, transparent 100%)',
    icon: 'pushpin',
  },
  {
    title: 'Барменам',
    body: 'Уже работаете за стойкой? Самое время прокачать свои знания. Внутри: авторские рецепты, история алкоголя и тесты для закрепления материала.',
    bottomGradient: 'linear-gradient(90deg, transparent 0%, #3a5a8a 20%, #a8d4ff 50%, #3a5a8a 80%, transparent 100%)',
    icon: 'diamond',
  },
  {
    title: 'Бар-менеджерам и командам',
    body: 'Устали объяснять одно и то же каждому новому сотруднику? Хотите, чтобы команда говорила на одном языке? Отправьте ссылку на BARCODE.',
    bottomGradient: 'linear-gradient(90deg, transparent 0%, #a8d4ff 20%, #1a6fff 50%, #a8d4ff 80%, transparent 100%)',
    icon: 'gear3d',
  },
  {
    title: 'Тем, кто хочет удивлять',
    body: 'Мечтаете собирать гостей у себя дома? У нас есть гид по домашнему бару — целый арсенал рецептов и приёмов для любой ситуации за вашей личной стойкой.',
    bottomGradient: 'linear-gradient(90deg, transparent 0%, #1a6fff 20%, #a8d4ff 50%, #1a6fff 80%, transparent 100%)',
    icon: 'sparkle',
  },
  {
    title: 'Желающим зарабатывать',
    body: 'Наша библиотека даёт доступ ко всем необходимым знаниям для прохождения собеседования.',
    bottomGradient: 'linear-gradient(90deg, transparent 0%, #3a5a8a 20%, #a8d4ff 50%, #3a5a8a 80%, transparent 100%)',
    icon: 'dollar3d',
  },
]

export default function Page() {
  return (
    // overflow-x-clip contains the decorations that intentionally peek past the
    // content (hero corner stars, about planes). On phones there is no gutter, so
    // those peeks would otherwise overflow the viewport and let the page pan
    // sideways into empty space. `clip` (unlike `hidden`) clips WITHOUT creating a
    // scroll container, so the sticky nav keeps working — which is why this can't
    // just live on a wrapper as plain overflow:hidden.
    <div className="relative w-full overflow-x-clip">
      <Decorations />
      <ScrollReveal />

      <div className="relative z-10">
        <Nav />

        {/* HERO */}
        <header id="hero" className="relative -mt-[60px] flex min-h-[100svh] flex-col items-center justify-center px-5 py-10 text-center md:-mt-[90px]">
          {/* Floating glossy 3D stars — balanced diagonal so the hero doesn't
              lean to one side (bigger star left, smaller star right) */}
          {/* Hidden on phones: at calc(50% - 512px) they fly far off a narrow
              viewport (invisible there anyway) and would only add overflow. */}
          <GlossyStar
            size={88}
            className="glossy-float pointer-events-none absolute hidden md:block"
            style={{ top: '16%', left: 'calc(50% - 512px)' }}
          />
          <GlossyStar
            size={66}
            className="glossy-float-2 pointer-events-none absolute hidden md:block"
            style={{ bottom: '18%', right: 'calc(50% - 512px)' }}
          />
          {/* Mirror of the bottom-right star, balancing the empty bottom-left band */}
          <GlossyStar
            size={66}
            className="glossy-float pointer-events-none absolute hidden md:block"
            style={{ bottom: '18%', left: 'calc(50% - 512px)' }}
          />

          {/* Scattered bar decor filling the hero's empty bands — same shapes as
              the background scatter, at the client-marked spots. Desktop only
              (mobile keeps its own .bar-mobile set); behind content, non-interactive. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block" style={{ zIndex: 0 }}>
            <Plus style={{ top: '26%', left: '14%', opacity: 0.2, fontSize: 18, color: '#a8d4ff' }} />
            <Plus style={{ top: '53%', left: '8%', opacity: 0.18, fontSize: 16, color: '#1a6fff', transform: 'rotate(45deg)' }} />
            <Plus style={{ top: '75%', left: '13%', opacity: 0.2, fontSize: 17, color: '#a8d4ff' }} />
            <Plus style={{ top: '80%', right: '24%', opacity: 0.18, fontSize: 16, color: '#1a6fff', transform: 'rotate(45deg)' }} />
            <Plus style={{ top: '81%', right: '14%', opacity: 0.2, fontSize: 18, color: '#a8d4ff' }} />
            <Bottle style={{ top: '16%', right: '33%', opacity: 0.14, transform: 'rotate(-6deg)' }} w={28} h={56} />
            <CocktailGlass style={{ top: '65%', right: '10%', opacity: 0.15, transform: 'rotate(6deg)' }} w={36} h={44} />
            <CocktailGlass style={{ top: '10%', left: '4%', opacity: 0.15, transform: 'rotate(-6deg)' }} w={36} h={44} />
          </div>

          {/* Badge */}
          <span className="hero-badge mb-6">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 1 C9 1 10 7.5 17 9 C10 10.5 9 17 9 17 C9 17 8 10.5 1 9 C8 7.5 9 1 9 1Z" fill="#8fc0ff" />
            </svg>
            Онлайн-библиотека барного дела
          </span>

          {/* BARCODE wordmark with the faint 4-pointed star centred behind it */}
          <div className="relative flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="hero-bg-star pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: 'min(920px,98vw)', height: 'auto', opacity: 0.055, zIndex: 0 }}
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3Z"
                fill="#a8d4ff"
              />
            </svg>
            <h1
              className="relative font-extrabold uppercase"
              style={{ fontSize: 'clamp(52px,8vw,88px)', letterSpacing: '-2px', color: 'var(--text-primary)', zIndex: 1 }}
            >
              barcode
            </h1>
          </div>
          <p
            className="mt-4 max-w-[380px] text-[16px]"
            style={{ color: 'var(--text-muted)' }}
          >
            Вся барная библиотека теперь в одном Telegram-канале.
          </p>
          <button 
           type="button" 
           className="btn-cta mt-8 px-12 py-4 text-[15px]"
           onClick={() => {
             const pricing = document.getElementById('pricing')
             if (pricing) {
             pricing.scrollIntoView({ behavior: 'smooth' })
             }
            }}
           >
            Перейти к обучению
           </button>

          {/* Scroll-down cue — hints there's more below */}
          <a
            href="#about"
            aria-label="Листать вниз"
            className="scroll-cue absolute inset-x-0 bottom-7 mx-auto w-[30px] transition-opacity hover:opacity-100"
            style={{ color: 'var(--text-muted)', opacity: 0.7 }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </header>

        {/* VALUE PROPOSITION — about / library intro */}
        <section id="about" className="relative mx-auto max-w-[1100px] px-5 py-12">
          <div className="relative" style={{ zIndex: 1 }}>
            <p
              className="reveal mb-4 text-center text-[14px]"
              style={{ color: 'var(--text-label)', textTransform: 'lowercase' }}
            >
              библиотека барного дела › barcode
            </p>
            <h2
              className="reveal mx-auto mb-10 max-w-[700px] text-center text-balance font-bold"
              style={{ fontSize: 'clamp(26px,3.5vw,38px)', color: 'var(--text-primary)' }}
            >
              Знания, которые обычно живут только за стойкой
            </h2>

            <div className="about-row reveal" style={{ position: 'relative', display: 'flex', gap: '39px', alignItems: 'stretch' }}>
            {/* Decorative glossy 3D planes — all on the BACK layer (z-index:0,
                behind the cards), peeking from the card edges / centre gutter.
                Positions follow the client's screenshot arrows: left card edge,
                centre gutter (aimed at the IBA tag) and the right edge. */}
            <div aria-hidden="true" className="decor decor-float about-plane about-plane--left" style={{ zIndex: 0 }}>
              <img src="/logos/plane.webp" alt="" style={{ display: 'block', width: '100%', opacity: 0.92, transform: 'rotate(-10deg)' }} />
            </div>
            <div aria-hidden="true" className="decor decor-float-slow about-plane about-plane--center" style={{ zIndex: 0 }}>
              <img src="/logos/plane.webp" alt="" style={{ display: 'block', width: '100%', opacity: 0.92, transform: 'rotate(80deg)' }} />
            </div>
            <div aria-hidden="true" className="decor decor-float about-plane about-plane--right" style={{ zIndex: 0 }}>
              <img src="/logos/plane.webp" alt="" style={{ display: 'block', width: '100%', opacity: 0.92, transform: 'rotate(170deg)' }} />
            </div>
            {/* LEFT card */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                flex: 1,
                borderRadius: '16px',
                padding: '28px',
                fontSize: '14px',
                lineHeight: '1.75',
                background: 'radial-gradient(125% 90% at 6% 100%, rgba(42, 104, 214, 0.16) 0%, rgba(10, 22, 46, 0) 55%), rgba(10, 22, 46, 0.62)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(26, 111, 255, 0.16)',
                color: 'var(--text-muted)',
                boxShadow: '0 0 24px 1px rgba(26, 111, 255, 0.15)',
              }}
            >
              <p>
                Меня зовут{' '}
                <span style={{ color: '#1a6fff', fontWeight: 600 }}>
                  Лина
                </span>
                . Я собрала{' '}
                <span style={{ color: '#1a6fff', fontWeight: 600 }}>
                  BARCODE
                </span>
                {' '}— удобную Telegram-библиотеку для барменов и любителей, где знания собраны в систему.
              </p>
              <p style={{ marginTop: '16px' }}>
                Это не курсы за десятки тысяч. Не хаотичные видео на YouTube. Не справочники с сухими терминами. Всё, что нужно, уже есть в одном месте на русском языке, без воды и с доступом 24/7: от истории алкоголя до проверенных рецептов.
              </p>
              <p style={{ marginTop: '16px' }}>
                У меня нет двадцатилетнего стажа, но есть живой опыт за стойкой, жадное любопытство и уважение к тем, кто учил меня. Я собрала знания из разных источников, дополнила их тем, что проверила на практике, и сложила так, как хотела бы найти сама: полезно, понятно и доступно
              </p>
              <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
                <span style={{ color: '#1a6fff', fontWeight: 600 }}>
                  BARCODE
                </span>
                {' '}— это основа, на которую можно положиться. Она всегда под рукой, когда нужен быстрый ответ или свежая идея. Подписывайтесь, изучайте, применяйте. <span style={{ color: 'rgb(26, 111, 255)', fontWeight: 600 }}>Я сделала это для вас.</span>
              </p>
            </div>

            {/* RIGHT column with tags grid and button */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '0px' }}>
              {/* Feature list — 2x2 grid on desktop, 1 column on mobile */}
              <div className="about-tags-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', flex: '0 0 auto' }}>
                {featureTags.map((tag, index) => {
                  let paddingTop = '14px'
                  let paddingBottom = '14px'
                  let fontSize = '15px'
                  let paddingLeft = '16px'
                  let paddingRight = '16px'

                  if (index === 0) {
                    paddingTop = '67px'
                    paddingBottom = '55px'
                    fontSize = '20px'
                    paddingLeft = '21px'
                    paddingRight = '18px'
                  } else if (index === 1) {
                    fontSize = '20px'
                    paddingLeft = '12px'
                    paddingRight = '11px'
                  } else if (index === 2) {
                    paddingTop = '46px'
                    paddingBottom = '39px'
                    fontSize = '20px'
                    paddingLeft = '16px'
                    paddingRight = '14px'
                  } else if (index === 3) {
                    paddingBottom = '12px'
                    fontSize = '20px'
                    paddingLeft = '6px'
                    paddingRight = '12px'
                  }

                  return index === 2 ? (
                    <IBATagWithTooltip key={index} paddingTop={paddingTop} paddingBottom={paddingBottom} fontSize={fontSize} paddingLeft={paddingLeft} paddingRight={paddingRight} />
                  ) : (
                    <div
                      key={index}
                      className="about-tag-item feature-tag"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '68px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
                        color: 'var(--text-primary)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(12px) saturate(1.2)',
                        WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
                        fontSize: fontSize,
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </div>
                  )
                })}
              </div>

              {/* Transparent spacer */}
              <div style={{ height: '24px', background: 'transparent' }} />

              <button
                type="button"
                className="btn-cta"
                style={{
                  fontSize: '22px',
                  width: '100%',
                  padding: '20px 20px 18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  gap: '16px',
                  flex: '0 0 auto',
                  marginTop: 'auto',
                }}
              >
                {/* Two glossy Telegram planes (split from one PNG): the big one on
                    the left, the small one on the right. Black drops out via `screen` */}
                <img
                  src="/logos/plane-big.webp"
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    width: '150px',
                    height: 'auto',
                    transform: 'translateY(-50%)',
                    opacity: 0.3,
                    mixBlendMode: 'screen',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                />
                <img
                  src="/logos/plane-small.webp"
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    width: '104px',
                    height: 'auto',
                    transform: 'translateY(-50%)',
                    opacity: 0.3,
                    mixBlendMode: 'screen',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                />
                Связаться со мной
              </button>
            </div>
            </div>
          </div>
        </section>

        {/* FOR WHOM */}
        <section id="for-whom" className="mx-auto max-w-[1100px] px-5 py-12">
          <p
            className="reveal mb-3 text-center text-[15px] lowercase tracking-[2px]"
            style={{ color: 'var(--text-label)' }}
          >
            для кого
          </p>
          <h2
            className="reveal mb-12 text-center font-bold"
            style={{ fontSize: 'clamp(32px,4.5vw,44px)', color: 'var(--text-primary)' }}
          >
            BARCODE подойдёт:
          </h2>

          {/* .reveal на каждой карточке (не на контейнерах), чтобы они
              появлялись по очереди: каскад задержек на десктопе, а на мобиле
              каждая срабатывает от собственного входа во вьюпорт */}
          <div className="for-whom-grid-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px', alignItems: 'stretch' }}>
            {audienceCards.slice(0, 3).map((card, index) => (
              <div key={card.title} className="reveal" style={{ display: 'flex', transitionDelay: `${index * 100}ms` }}>
                <AudienceCard {...card} />
              </div>
            ))}
          </div>
          <div className="for-whom-grid-bottom" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
            {audienceCards.slice(3).map((card, index) => (
              <div key={card.title} className="for-whom-grid-bottom-item reveal" style={{ width: 'calc((100% - 48px) / 3)', transitionDelay: `${(index + 3) * 100}ms` }}>
                <AudienceCard {...card} paddingBottom={index === 0 ? '42px' : index === 1 ? '63px' : undefined} />
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <div id="pricing">
          <Pricing />
        </div>

        {/* FAQ */}
        <div id="faq">
          <Faq />
        </div>

        {/* legal footer */}
        <footer
          className="px-5 pb-10 text-center text-[11px] leading-relaxed"
          style={{ color: 'var(--text-label)' }}
        >
          <p className="mx-auto max-w-[820px]">
            «Проект не является официальным представителем International Bartenders
            Association. Все рецепты воспроизводятся в ознакомительных/образовательных целях
            на основе общедоступных стандартов IBA. Товарный знак IBA принадлежит
            правообладателю»
          </p>
          <p className="mt-3">© BARCODE 2026 . Все права защищены.</p>
        </footer>
      </div>
    </div>
  )
}

function renderIconSVG(iconKey: string) {
  const iconMap: { [key: string]: string } = {
    pushpin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B01%20%282%29-CKy1ApkOP1ifrfjbFquwAnXRPesETN.png', // Heart - Новичкам
    diamond: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B01%20%285%29-iRLBjOzxxDA6d8jqjtWCFc3fUwH1UI.png', // Shaker - Барменам
    gear3d: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B01%20%283%29-svAEFfb5WhhmfpzSFToCpSfXiXZgD0.png', // People - Бар-менеджерам и командам
    sparkle: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B01%20%281%29-yCbUi4CeYbI8JMqshljWa3oajlIdUG.png', // Hand - Тем кто хочет удивлять
    dollar3d: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B01%20%284%29-aQxBC3YJbACG9UwXFQtQQ4QG69VEGw.png', // Dollar - Желающим зарабатывать
  }

  const iconUrl = iconMap[iconKey]
  if (!iconUrl) return null

  // The source PNGs draw their glyph at slightly different scales inside the same
  // canvas, so at a fixed 135px box they render visually uneven (measured glyph
  // heights: heart 55, shaker 60, others ~59). These per-icon factors normalise
  // every glyph so the row reads as one consistent set.
  const iconScale: { [key: string]: number } = {
    pushpin: 1.07, // Новичкам (heart) — smallest, scale up
    diamond: 0.97, // Барменам (shaker) — largest, scale down
    gear3d: 0.99, // Бар-менеджерам (people)
    sparkle: 1.01, // Тем, кто хочет удивлять (hand)
    dollar3d: 1.0, // Желающим зарабатывать (dollar)
  }

  return (
    <img
      src={iconUrl}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={135}
      height={135}
      style={{
        width: '135px',
        height: '135px',
        objectFit: 'contain',
        transform: `scale(${iconScale[iconKey] ?? 1})`,
        filter: 'drop-shadow(0 0 20px rgba(65, 128, 240, 0.6)) drop-shadow(0 0 40px rgba(65, 128, 240, 0.3))',
      }}
    />
  )
}

function AudienceCard({
  title,
  body,
  bottomGradient,
  icon,
  paddingBottom,
}: {
  title: string
  body: string
  bottomGradient: string
  icon: string
  paddingBottom?: string
}) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '280px',
        width: '100%',
        padding: paddingBottom ? `32px 24px ${paddingBottom} 24px` : '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        boxSizing: 'border-box',
        background: 'rgba(26, 111, 255, 0.10)',
        border: '1px solid rgba(26, 111, 255, 0.25)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease',
      }}
      className="audience-card hover:-translate-y-1"
    >
      {/* Icon container — fixed size */}
      <div
        style={{
          width: '135px',
          height: '135px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 8px auto',
          flexShrink: 0,
          background: 'transparent',
          fontSize: '32px',
          lineHeight: '1',
        }}
      >
        {renderIconSVG(icon)}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '16px',
          color: 'white',
          margin: '0 0 12px 0',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}
      </h3>

      {/* Body text */}
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: '1.6',
          margin: '0',
        }}
      >
        {body}
      </p>

      {/* Bottom gradient strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, transparent 0%, #1a6fff 20%, #a8d4ff 50%, #1a6fff 80%, transparent 100%)',
          borderRadius: '0 0 16px 16px',
        }}
      />
    </div>
  )
}
