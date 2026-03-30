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

export default function Index() {
  const [dragOver, setDragOver] = useState(false)

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 3D Background */}
      <Canvas
        camera={{ position: [0, 0, 500], fov: 50, near: 1, far: 10000 }}
        gl={{ alpha: false }}
        scene={{ background: null }}
      >
        <KinectScene />
      </Canvas>
      <Leva collapsed={true} />

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">

        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 pointer-events-auto">
          <div className="flex items-center gap-2">
            <Icon name="Layers" size={28} className="text-blue-400" />
            <span className="text-white font-bold text-2xl tracking-tight">PrintLab</span>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium transition-all">
            <Icon name="Phone" size={16} />
            Связаться
          </button>
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
            onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input id="file-input" type="file" accept=".stl,.obj,.3mf" className="hidden" />
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

        {/* Footer */}
        <footer className="flex items-center justify-center py-4 pointer-events-none">
          <p className="text-white/30 text-xs">© 2026 PrintLab — профессиональная 3D-печать</p>
        </footer>
      </div>
    </div>
  )
}