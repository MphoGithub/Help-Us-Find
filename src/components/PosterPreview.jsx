import { forwardRef } from 'react'
import {
  A4,
  displayName,
  formatLastSeen,
  hasValue,
  vehicleLine,
  formatDate,
} from '../formDefaults.js'

function Detail({ label, value, wide = false }) {
  if (!hasValue(value)) return null
  return (
    <div style={{ gridColumn: wide ? '1 / -1' : undefined, minWidth: 0 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#444',
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.25, color: '#111', whiteSpace: 'pre-wrap' }}>
        {value}
      </div>
    </div>
  )
}

const PosterPreview = forwardRef(function PosterPreview({ form }, ref) {
  const name = displayName(form)
  const lastSeen = formatLastSeen(form)
  const vehicle = vehicleLine(form)
  const isPerson = form.type === 'person'
  const headlineSize = (form.headline || '').length > 18 ? 42 : 64

  return (
    <article
      ref={ref}
      style={{
        width: A4.w,
        height: A4.h,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        color: '#111',
        fontFamily: 'Arial, Helvetica, sans-serif',
        border: '14px solid #111',
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          background: '#F4C400',
          color: '#111',
          padding: '14px 16px 12px',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'Impact, Haettenschweiler, "Arial Black", sans-serif',
            fontSize: headlineSize,
            lineHeight: 0.95,
            letterSpacing: '0.04em',
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          {form.headline || 'MISSING'}
        </div>
      </header>

      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: '16px 18px 8px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 320,
            height: 400,
            background: '#e7e5e4',
            border: '3px solid #111',
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {form.photoDataUrl ? (
            <img
              src={form.photoDataUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: 13, color: '#78716c', padding: 16, textAlign: 'center' }}>
              Add a recent photo
            </span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <h1
            style={{
              fontFamily: 'Impact, Haettenschweiler, "Arial Black", sans-serif',
              fontSize: name.length > 22 ? 28 : 36,
              lineHeight: 1.05,
              margin: '4px 0 6px',
              textTransform: 'uppercase',
            }}
          >
            {name}
          </h1>
          {isPerson && hasValue(form.nickname) ? (
            <div style={{ fontSize: 15, marginBottom: 10, fontWeight: 700 }}>
              Also known as “{form.nickname.trim()}”
            </div>
          ) : null}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px 12px',
            }}
          >
            {isPerson ? (
              <>
                <Detail label="Gender" value={form.gender} />
                <Detail label="Age" value={form.age} />
                <Detail label="Date of birth" value={formatDate(form.dateOfBirth)} />
                <Detail label="Height" value={form.height} />
                <Detail label="Weight / build" value={form.weight} />
                <Detail label="Hair" value={form.hairColour} />
                <Detail label="Eyes" value={form.eyeColour} />
                <Detail label="Skin tone" value={form.skinTone} />
                <Detail label="Languages" value={form.languages} />
              </>
            ) : (
              <>
                <Detail label="Species" value={form.species} />
                <Detail label="Breed" value={form.breed} />
                <Detail label="Sex" value={form.sex} />
                <Detail label="Age" value={form.petAge} />
                <Detail label="Size / weight" value={form.sizeWeight} />
                <Detail label="Microchip" value={form.microchip} />
              </>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: '4px 18px 10px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px 16px',
          alignContent: 'start',
        }}
      >
        {isPerson ? (
          <>
            <Detail label="Distinguishing features" value={form.distinguishingFeatures} wide />
            <Detail label="Clothing last worn" value={form.clothing} wide />
            <Detail label="Medical notes" value={form.medicalNotes} wide />
          </>
        ) : (
          <>
            <Detail label="Colours and markings" value={form.coloursMarkings} wide />
            <Detail label="Collar / tags" value={form.collarTags} />
            <Detail label="Distinguishing features" value={form.petFeatures} />
            <Detail label="Last worn" value={form.petGear} wide />
          </>
        )}
        {lastSeen ? <Detail label="Last seen" value={lastSeen} wide /> : null}
        <Detail label="Circumstances" value={form.circumstances} wide />
        {vehicle ? <Detail label="Vehicle" value={vehicle} wide /> : null}
      </div>

      <footer
        style={{
          background: '#111',
          color: '#F4C400',
          padding: '12px 18px 10px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'Impact, Haettenschweiler, "Arial Black", sans-serif',
            fontSize: 22,
            letterSpacing: '0.06em',
            marginBottom: 6,
          }}
        >
          IF YOU HAVE INFORMATION, PLEASE CONTACT
        </div>
        <div style={{ color: '#fff', fontSize: 16, lineHeight: 1.35, fontWeight: 700 }}>
          {hasValue(form.contactName) ? <div>{form.contactName}</div> : null}
          {hasValue(form.phone) ? <div>Phone: {form.phone}</div> : null}
          {hasValue(form.email) ? <div>Email: {form.email}</div> : null}
          {hasValue(form.website) ? <div>{form.website}</div> : null}
          {!hasValue(form.contactName) &&
          !hasValue(form.phone) &&
          !hasValue(form.email) &&
          !hasValue(form.website) ? (
            <div style={{ fontWeight: 500, color: '#d6d3d1' }}>Add a phone, email, or webpage</div>
          ) : null}
        </div>
        <div style={{ marginTop: 8, fontSize: 10, color: '#a8a29e', lineHeight: 1.35 }}>
          This is a community flyer. Also report a missing person to local police, or a missing pet
          to nearby shelters and veterinarians.
        </div>
      </footer>
    </article>
  )
})

export default PosterPreview