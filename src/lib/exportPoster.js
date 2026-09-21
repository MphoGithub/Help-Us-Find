import downloadBlob from './downloadBlob.js'
import { LETTER } from '../formDefaults.js'

async function posterToPngDataUrl(node) {
  const { toPng } = await import('html-to-image')
  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    canvasWidth: LETTER.w * 2,
    canvasHeight: LETTER.h * 2,
    width: LETTER.w,
    height: LETTER.h,
    style: {
      transform: 'none',
      width: `${LETTER.w}px`,
      height: `${LETTER.h}px`,
    },
  })
}

export async function downloadPosterPng(node, filename) {
  const dataUrl = await posterToPngDataUrl(node)
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  downloadBlob(blob, filename)
}

export async function downloadPosterPdf(node, filename) {
  const dataUrl = await posterToPngDataUrl(node)
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter',
  })
  pdf.addImage(dataUrl, 'PNG', 0, 0, LETTER.inchesW, LETTER.inchesH)
  pdf.save(filename)
}
