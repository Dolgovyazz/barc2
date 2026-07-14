'use client'

import { useState } from 'react'

const items = [
  {
    q: 'Могу ли я предложить тему для статьи?',
    a: 'Да. Я ориентируюсь в том числе на запросы подписчиков. Пиши в личные сообщения — если тема интересная и вписывается в формат, я возьму её в работу.',
  },
  {
    q: 'Почему доступ платный, если есть открытые ресурсы?',
    a: 'Открытые источники не имеют единой структуры, содержат противоречивую информацию и требуют временных затрат на фильтрацию. Данный канал предоставляет проверенные, систематизированные данные в одном месте, что экономит время и исключает ошибки в работе.',
  },
  {
    q: 'Есть ли видео-инструкции по техникам приготовления или только текст и фото?',
    a: 'В текущей версии — текст и статичные изображения (схемы, фото, шпаргалки). Видео-контент не включён из-за большого объёма и сложности поддержки актуальности. Приоритет отдан быстрочитаемым структурированным данным.',
  },
  {
    q: 'На каких устройствах можно открывать канал?',
    a: 'Telegram доступен на всех платформах (iOS, Android, Windows, macOS, веб-версия). Информация адаптирована для чтения с мобильных экранов.',
  },
  {
    q: 'Можно ли использовать материалы канала для обучения персонала внутри моего заведения?',
    a: 'Да. Вы можете ссылаться на материалы при внутреннем обучении, цитировать их в рабочих материалах. Публичное распространение — копирование постов в открытые каналы, коммерческое тиражирование — запрещено, так как нарушает авторские права.',
  },
  {
    q: 'Что даёт вечный доступ?',
    a: 'Единый платёж — и ты в библиотеке навсегда. Все текущие материалы + все будущие обновления. Никаких автопродлений.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section style={{ padding: '48px 20px' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <h2
          className="reveal"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(24px, 4vw, 38px)',
            color: 'var(--text-primary)',
            textAlign: 'center',
            letterSpacing: '0',
            marginBottom: '52px',
          }}
        >
          Частые вопросы
        </h2>

        <div>
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="reveal"
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: '20px 0',
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      fontSize: '17px',
                      color: 'var(--text-primary)',
                      paddingRight: '16px',
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      color: 'white',
                      padding: 0,
                      lineHeight: 1,
                      boxShadow: '0 0 14px var(--accent-glow)',
                      transition: 'box-shadow 200ms ease',
                    }}
                  >
                    {isOpen ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="12" y2="12" stroke="white" strokeWidth="2" />
                        <line x1="12" y1="0" x2="0" y2="12" stroke="white" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="2" />
                        <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="2" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Та же плавная анимация, что у аккордеона в модалке тарифа:
                    grid-rows 0fr->1fr раскрывает точную высоту контента */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition:
                      'grid-template-rows 0.65s cubic-bezier(0.33, 0, 0.2, 1), opacity 0.5s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 400,
                        fontSize: '16px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.75,
                        paddingRight: '48px',
                        margin: '12px 0 0',
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
