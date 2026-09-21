import downloadBlob from './downloadBlob.js'
import { A4 } from '../formDefaults.js'

async function posterToPngDataUrl(node) {
  const { toPng } = await import('html-to-image')
  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    canvasWidth: A4.w * 2,
    canvasHeight: A4.h * 2,
    width: A4.w,
    height: A4.h,
    style: {
      transform: 'none',
      width: `${A4.w}px`,
      height: `${A4.h}px`,
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
    unit: 'mm',
    format: 'a4',
  })
  pdf.addImage(dataUrl, 'PNG', 0, 0, A4.mmW, A4.mmH)
  pdf.save(filename)
}