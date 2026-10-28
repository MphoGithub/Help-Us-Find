// A4 = 210 × 297 mm. Pixel size is at 96 dpi (used for the on-screen poster and PNG).
export const A4 = {
  w: 794,
  h: 1123,
  mmW: 210,
  mmH: 297,
}

export const HEADLINES = {
  person: [
    'MISSING',
    'HAVE YOU SEEN THIS PERSON?',
    'HELP US FIND',
    'MISSING PERSON',
    'PLEASE HELP US FIND',
  ],
  pet: [
    'MISSING',
    'HAVE YOU SEEN THIS PET?',
    'HELP US FIND',
    'MISSING PET',
    'LOST PET',
  ],
}

export function emptyForm(type = 'person') {
  return {
    type,
    headline: 'MISSING',
    photoDataUrl: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    gender: '',
    age: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    hairColor: '',
    eyeColor: '',
    skinTone: '',
    distinguishingFeatures: '',
    clothing: '',
    medicalNotes: '',
    languages: '',
    petName: '',
    species: '',
    breed: '',
    sex: '',
    petAge: '',
    sizeWeight: '',
    colorsMarkings: '',
    collarTags: '',
    microchip: '',
    petFeatures: '',
    petGear: '',
    lastSeenDate: '',
    lastSeenTime: '',
    lastSeenLocation: '',
    circumstances: '',
    contactName: '',
    phone: '',
    email: '',
    website: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColor: '',
    vehiclePlate: '',
  }
}

export function displayName(form) {
  if (form.type === 'pet') {
    return (form.petName || '').trim() || 'Unknown'
  }
  const parts = [form.firstName, form.middleName, form.lastName]
    .map((p) => (p || '').trim())
    .filter(Boolean)
  return parts.join(' ') || 'Unknown'
}

export function fileSlug(form) {
  const name = displayName(form)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return name && name !== 'unknown' ? `missing-${name}` : 'missing-poster'
}

export function formatLastSeen(form) {
  const date = (form.lastSeenDate || '').trim()
  const time = (form.lastSeenTime || '').trim()
  const location = (form.lastSeenLocation || '').trim()
  const bits = []
  if (date && time) bits.push(`${formatDate(date)} at ${formatTime(time)}`)
  else if (date) bits.push(formatDate(date))
  else if (time) bits.push(`Around ${formatTime(time)}`)
  if (location) bits.push(location)
  return bits.join(' — ')
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  try {
    return new Date(y, m - 1, d).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function formatTime(value) {
  const [h, min] = value.split(':').map(Number)
  if (Number.isNaN(h)) return value
  const date = new Date()
  date.setHours(h, min || 0, 0, 0)
  return date.toLocaleTimeString('en-ZA', { hour: 'numeric', minute: '2-digit' })
}

export function vehicleLine(form) {
  const parts = [form.vehicleColor, form.vehicleMake, form.vehicleModel]
    .map((p) => (p || '').trim())
    .filter(Boolean)
  const plate = (form.vehiclePlate || '').trim()
  if (!parts.length && !plate) return ''
  let line = parts.join(' ')
  if (plate) line = line ? `${line}, plate ${plate}` : `Plate ${plate}`
  return line
}

export function hasValue(value) {
  return Boolean((value || '').toString().trim())
}