import { useEffect, useState, useRef } from 'react'
import PosterForm from './components/PosterForm.jsx'
import PosterPreview from './components/PosterPreview.jsx'
import { emptyForm, fileSlug, LETTER } from './formDefaults.js'
import { downloadPosterPdf, downloadPosterPng } from './lib/exportPoster.js'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const [form, setForm] = useState(() => emptyForm('person')) //lazy initializer
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const posterRef = useRef(null)

  const scale = usePreviewScale()

  async function exportFile(kind) {
    if (!posterRef.current) return
    setError('')
    setBusy(kind)
    const base = fileSlug(form)
    try {
      if (kind === 'png') {
        await downloadPosterPng(posterRef.current, `${base}.png`)
      } else {
        await downloadPosterPdf(posterRef.current, `${base}.pdf`)
      }
    } catch (err) {
      console.error(err)
      setError('Could not create the file. Try a smaller photo, then download again.')
    } finally {
      setBusy('')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Missing person &amp; pet posters
          </h1>
          <p className="max-w-2xl text-sm text-stone-600">
            Fill in what you know. A print-ready poster updates as you type. Download PNG for
            sharing or PDF for printing. Nothing is uploaded — photos and details stay on this
            device, and closing the tab discards them.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,28rem)_1fr] lg:items-start">
        <PosterForm form={form} onChange={setForm} onPhoto={(url) => setForm((f) => ({ ...f, photoDataUrl: url }))} />

        <aside className="lg:sticky lg:top-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={Boolean(busy)}
              onClick={() => exportFile('png')}
              className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy === 'png' ? 'Creating PNG…' : 'Download PNG'}
            </button>
            <button
              type="button"
              disabled={Boolean(busy)}
              onClick={() => exportFile('pdf')}
              className="rounded-md bg-banner px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {busy === 'pdf' ? 'Creating PDF…' : 'Download PDF'}
            </button>
            <span className="text-xs text-stone-500">US Letter · 8.5 × 11 in</span>
          </div>
          {error ? <p className="mb-3 text-sm text-red-700">{error}</p> : null}
          <div className="overflow-auto rounded-lg border border-stone-300 bg-stone-200/80 p-3 shadow-inner">
            <div
              style={{
                width: LETTER.w * scale,
                height: LETTER.h * scale,
              }}
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <PosterPreview ref={posterRef} form={form} />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

function usePreviewScale() {
  const [scale, setScale] = useState(0.72)

  useEffect(() => {
    function update() {
      const width = window.innerWidth
      if (width < 640) setScale(Math.min(0.92, (width - 56) / LETTER.w))
      else if (width < 1024) setScale(Math.min(0.85, (width - 80) / LETTER.w))
      else setScale(0.72)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}
