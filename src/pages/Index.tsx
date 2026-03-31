import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KinectScene } from '@/components/kinect-scene'
import { Leva } from 'leva'
import Icon from '@/components/ui/icon'

const steps = [
  { icon: 'Upload', title: 'Загрузите модель', desc: 'Отправьте .STL, .OBJ или .3MF файл' },
  { icon: 'Settings', title: 'Выберите параметры', desc: 'Материал, цвет, точность печати' },
  { icon: 'Package', title: 'Получите заказ', desc: 'Доставим готовую деталь прямо к вам' },
]

const PHONE = '+79654500708'
const PHONE_DISPLAY = '+7 (965) 450-07-08'
const BANK = 'Т-Банк'

const MATERIALS = [
  { id: 'PLA', label: 'PLA', price: 5 },
  { id: 'ABS', label: 'ABS', price: 6 },
  { id: 'PETG', label: 'PETG', price: 7 },
]

const WORKS = [
  { img: 'https://cdn.poehali.dev/projects/c55dde27-5c68-4d96-a781-a6e4425c8c6a/files/e645ce69-0374-435e-9b10-5a59743c5d26.jpg', title: 'Механические детали', material: 'PLA' },
  { img: 'https://cdn.poehali.dev/projects/c55dde27-5c68-4d96-a781-a6e4425c8c6a/files/6ccb08e3-c39a-431b-a229-1eea88ac1515.jpg', title: 'Фигурки и статуэтки', material: 'PETG' },
  { img: 'https://cdn.poehali.dev/projects/c55dde27-5c68-4d96-a781-a6e4425c8c6a/files/3a4e479c-fd63-47d2-bd41-849ec624220c.jpg', title: 'Органайзеры и подставки', material: 'PLA' },
]


function OrderForm({ fileName, onClose }: { fileName: string; onClose: () => void }) {
  const [material, setMaterial] = useState(MATERIALS[0])
  const [grams, setGrams] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [copied, setCopied] = useState(false)

  const total = material.price * (parseFloat(grams) || 0)
  const canProceed = name.trim().length > 0 && phone.trim().length > 0

  function copyPhone() {
    navigator.clipboard.writeText(PHONE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl p-6 z-10">

        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors">
          <Icon name="X" size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
            <Icon name="FileCheck" size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Файл принят!</p>
            <p className="text-white/40 text-xs truncate max-w-[180px]">{fileName}</p>
          </div>
        </div>

        {!showPayment ? (
          <>
            <div className="space-y-4 mb-5">
              <div>
                <label className="text-white/60 text-xs mb-2 block">Материал</label>
                <div className="flex gap-2">
                  {MATERIALS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMaterial(m)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                        material.id === m.id
                          ? 'bg-blue-500 border-blue-400 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <p className="text-white/30 text-xs mt-1.5">{material.price} ₽ / грамм</p>
              </div>

              <div>
                <label className="text-white/60 text-xs mb-2 block">Вес модели (граммы)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={grams}
                  onChange={e => setGrams(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-400/60 transition-colors"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-400/60 transition-colors"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs mb-2 block">Телефон для связи</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-400/60 transition-colors"
                />
              </div>

              {total > 0 && (
                <div className="flex items-center justify-between bg-blue-500/10 border border-blue-400/20 rounded-xl px-4 py-3">
                  <span className="text-white/60 text-sm">Стоимость</span>
                  <span className="text-white font-bold text-lg">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowPayment(true)}
              disabled={!canProceed}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30"
            >
              Перейти к оплате
            </button>
          </>
        ) : (
          <>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 space-y-1">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Icon name="User" size={14} className="text-white/40" />
                <span>{name}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Icon name="Phone" size={14} className="text-white/40" />
                <span>{phone}</span>
              </div>
              {total > 0 && (
                <div className="flex items-center justify-between pt-1 border-t border-white/10 mt-2">
                  <span className="text-white/60 text-sm">{material.label} · {grams} г</span>
                  <span className="text-white font-bold">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
            </div>

            <p className="text-white/60 text-sm mb-4">
              Мы свяжемся с вами для уточнения деталей. Для ускорения обработки — оплатите заказ заранее:
            </p>

            <div className="space-y-3">
              <a
                href="https://www.tinkoff.ru/rm/sinitsyn.ilia5/Fif5S66498"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 rounded-xl px-4 py-3.5 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" size={18} className="text-yellow-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-semibold text-sm">Оплатить через СБП</p>
                  <p className="text-white/40 text-xs">{BANK} · быстро и без комиссии</p>
                </div>
                <Icon name="ExternalLink" size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </a>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Smartphone" size={18} className="text-white/60" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">Перевод по номеру</p>
                  <p className="text-white/60 text-sm font-mono mt-0.5">{PHONE_DISPLAY}</p>
                  <p className="text-white/30 text-xs">{BANK}</p>
                </div>
                <button onClick={copyPhone} className="text-white/40 hover:text-blue-400 transition-colors flex-shrink-0">
                  {copied ? <Icon name="Check" size={16} className="text-green-400" /> : <Icon name="Copy" size={16} />}
                </button>
              </div>
            </div>

            <p className="text-white/30 text-xs text-center mt-4">
              После оплаты укажите в комментарии название файла
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function Index() {
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    setUploadedFile(file.name)
  }

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      {/* 3D Background — фиксированный только для первого экрана */}
      <div className="fixed inset-0 -z-10 h-screen">
        <Canvas
          camera={{ position: [0, 0, 500], fov: 50, near: 1, far: 10000 }}
          gl={{ alpha: false }}
          scene={{ background: null }}
        >
          <KinectScene />
        </Canvas>
        <Leva collapsed={true} />
      </div>

      {/* Overlay UI */}
      <div className="flex flex-col pointer-events-none h-screen">

        {/* Header */}
        <header className="flex items-center px-8 py-5 pointer-events-auto">
          <div className="flex items-center gap-2">
            <Icon name="Layers" size={28} className="text-blue-400" />
            <span className="text-white font-bold text-2xl tracking-tight">PrintLab</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">

          {/* Hero */}
          <div className="text-center pointer-events-none">
            <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              3D-печать
              <span className="text-blue-400"> под заказ</span>
            </h1>
            <p className="mt-3 text-white/70 text-lg max-w-md mx-auto">
              Загружайте модели — мы печатаем и доставляем
            </p>
          </div>

          {/* Upload Zone */}
          <div
            className={`pointer-events-auto w-full max-w-md rounded-2xl border-2 border-dashed transition-all backdrop-blur-md p-8 text-center cursor-pointer
              ${dragOver
                ? 'border-blue-400 bg-blue-500/20 scale-105'
                : 'border-white/30 bg-white/10 hover:bg-white/15 hover:border-blue-400/60'
              }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFile(e.dataTransfer.files[0])
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".stl,.obj,.3mf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                <Icon name="Upload" size={28} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Перетащите файл сюда</p>
                <p className="text-white/50 text-sm mt-1">STL, OBJ, 3MF — до 100 МБ</p>
              </div>
              <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-500/30">
                Выбрать файл
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="pointer-events-none flex gap-4 flex-wrap justify-center">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} fallback="Circle" size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{s.title}</p>
                  <p className="text-white/50 text-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Примеры работ */}
      <section className="relative bg-[#080c12] pointer-events-auto">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-white text-3xl font-bold text-center mb-8">Примеры работ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WORKS.map((w, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold">{w.title}</p>
                  <span className="inline-block mt-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-400/20 rounded-full px-2.5 py-0.5">{w.material}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#080c12] border-t border-white/5 pointer-events-auto">
        <p className="text-white/30 text-xs text-center py-5">© 2026 PrintLab — профессиональная 3D-печать</p>
      </footer>

      {/* Кнопки связи */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
        <a
          href={`https://wa.me/${PHONE.replace('+', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20c05c] text-white px-4 py-3 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-sm font-semibold">WhatsApp</span>
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          <Icon name="Phone" size={18} />
          <span className="text-sm font-semibold">Позвонить</span>
        </a>
      </div>

      {uploadedFile && (
        <OrderForm
          fileName={uploadedFile}
          onClose={() => setUploadedFile(null)}
        />
      )}
    </div>
  )
}