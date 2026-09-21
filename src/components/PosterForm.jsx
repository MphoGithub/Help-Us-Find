import { HEADLINES } from '../formDefaults.js'

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {hint ? <span className="field-hint">{hint}</span> : null}
      {children}
    </label>
  )
}

function Section({ title, children }) {
  return (
    <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">{title}</h2>
      {children}
    </section>
  )
}

export default function PosterForm({ form, onChange, onPhoto }) {
  const set = (key) => (event) => {
    onChange({ ...form, [key]: event.target.value })
  }

  const isPerson = form.type === 'person'
  const headlines = HEADLINES[form.type]

  return (
    <div className="space-y-4">
      <Section title="Poster type">
        <div className="flex gap-2">
          {['person', 'pet'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                const nextHeadlines = HEADLINES[type]
                const headline = nextHeadlines.includes(form.headline)
                  ? form.headline
                  : nextHeadlines[0]
                onChange({ ...form, type, headline })
              }}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold capitalize ${
                form.type === type
                  ? 'bg-ink text-banner'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Missing {type}
            </button>
          ))}
        </div>
        <Field label="Headline">
          <select className="field-input" value={form.headline} onChange={set('headline')}>
            {headlines.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </Field>
      </Section>

      <Section title="Photo">
        <p className="text-xs text-stone-500">
          Use a recent, high-quality head-and-shoulders photo (or full body if that helps
          identification). Neutral expression, good lighting, no heavy filters.
        </p>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-banner file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ink hover:file:bg-yellow-400"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = () => onPhoto(String(reader.result || ''))
            reader.readAsDataURL(file)
          }}
        />
        {form.photoDataUrl ? (
          <button
            type="button"
            className="text-xs font-medium text-stone-600 underline"
            onClick={() => onPhoto('')}
          >
            Remove photo
          </button>
        ) : null}
      </Section>

      {isPerson ? (
        <Section title="Identity">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="First name">
              <input className="field-input" value={form.firstName} onChange={set('firstName')} />
            </Field>
            <Field label="Middle name" hint="If used">
              <input className="field-input" value={form.middleName} onChange={set('middleName')} />
            </Field>
            <Field label="Last name">
              <input className="field-input" value={form.lastName} onChange={set('lastName')} />
            </Field>
          </div>
          <Field label="Nickname" hint="Only if commonly known">
            <input className="field-input" value={form.nickname} onChange={set('nickname')} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Gender">
              <input className="field-input" value={form.gender} onChange={set('gender')} />
            </Field>
            <Field label="Age">
              <input className="field-input" value={form.age} onChange={set('age')} />
            </Field>
            <Field label="Date of birth">
              <input
                type="date"
                className="field-input"
                value={form.dateOfBirth}
                onChange={set('dateOfBirth')}
              />
            </Field>
          </div>
        </Section>
      ) : (
        <Section title="Pet identity">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <input className="field-input" value={form.petName} onChange={set('petName')} />
            </Field>
            <Field label="Species">
              <input
                className="field-input"
                placeholder="Dog, cat, bird…"
                value={form.species}
                onChange={set('species')}
              />
            </Field>
            <Field label="Breed">
              <input className="field-input" value={form.breed} onChange={set('breed')} />
            </Field>
            <Field label="Sex">
              <input className="field-input" value={form.sex} onChange={set('sex')} />
            </Field>
            <Field label="Age">
              <input className="field-input" value={form.petAge} onChange={set('petAge')} />
            </Field>
            <Field label="Size / weight">
              <input className="field-input" value={form.sizeWeight} onChange={set('sizeWeight')} />
            </Field>
          </div>
        </Section>
      )}

      {isPerson ? (
        <Section title="Description">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Height">
              <input className="field-input" value={form.height} onChange={set('height')} />
            </Field>
            <Field label="Weight / build">
              <input className="field-input" value={form.weight} onChange={set('weight')} />
            </Field>
            <Field label="Hair color">
              <input className="field-input" value={form.hairColor} onChange={set('hairColor')} />
            </Field>
            <Field label="Eye color">
              <input className="field-input" value={form.eyeColor} onChange={set('eyeColor')} />
            </Field>
            <Field label="Skin tone">
              <input className="field-input" value={form.skinTone} onChange={set('skinTone')} />
            </Field>
            <Field label="Languages spoken">
              <input className="field-input" value={form.languages} onChange={set('languages')} />
            </Field>
          </div>
          <Field
            label="Distinguishing features"
            hint="Tattoos, scars, piercings, birthmarks, glasses, wheelchair, etc."
          >
            <textarea
              className="field-input min-h-[72px]"
              value={form.distinguishingFeatures}
              onChange={set('distinguishingFeatures')}
            />
          </Field>
          <Field
            label="Clothing last worn"
            hint="Colors, style, shoes — this is often the most useful detail."
          >
            <textarea
              className="field-input min-h-[72px]"
              value={form.clothing}
              onChange={set('clothing')}
            />
          </Field>
          <Field
            label="Medical or mental health notes"
            hint='Optional. Example: "may be confused" or "diabetic — needs medication".'
          >
            <textarea
              className="field-input min-h-[72px]"
              value={form.medicalNotes}
              onChange={set('medicalNotes')}
            />
          </Field>
        </Section>
      ) : (
        <Section title="Description">
          <Field label="Colors and markings">
            <textarea
              className="field-input min-h-[72px]"
              value={form.colorsMarkings}
              onChange={set('colorsMarkings')}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Collar / tags">
              <input className="field-input" value={form.collarTags} onChange={set('collarTags')} />
            </Field>
            <Field label="Microchip" hint="If known">
              <input className="field-input" value={form.microchip} onChange={set('microchip')} />
            </Field>
          </div>
          <Field label="Distinguishing features">
            <textarea
              className="field-input min-h-[72px]"
              value={form.petFeatures}
              onChange={set('petFeatures')}
            />
          </Field>
          <Field label="Harness, leash, or clothing last worn">
            <textarea
              className="field-input min-h-[72px]"
              value={form.petGear}
              onChange={set('petGear')}
            />
          </Field>
        </Section>
      )}

      <Section title="Last seen">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Date">
            <input
              type="date"
              className="field-input"
              value={form.lastSeenDate}
              onChange={set('lastSeenDate')}
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              className="field-input"
              value={form.lastSeenTime}
              onChange={set('lastSeenTime')}
            />
          </Field>
        </div>
        <Field
          label="Location"
          hint='Exact area if you can. Example: "near Main Street Market, City Center".'
        >
          <input
            className="field-input"
            value={form.lastSeenLocation}
            onChange={set('lastSeenLocation')}
          />
        </Field>
        <Field
          label="Circumstances"
          hint='Brief. Example: "Was wearing a blue jacket and heading toward the park."'
        >
          <textarea
            className="field-input min-h-[72px]"
            value={form.circumstances}
            onChange={set('circumstances')}
          />
        </Field>
      </Section>

      <Section title="Contact">
        <Field label="Contact name" hint="Family or finder contact, if appropriate">
          <input className="field-input" value={form.contactName} onChange={set('contactName')} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Phone">
            <input className="field-input" value={form.phone} onChange={set('phone')} />
          </Field>
          <Field label="Email">
            <input
              type="email"
              className="field-input"
              value={form.email}
              onChange={set('email')}
            />
          </Field>
        </div>
        <Field label="Website or social page" hint="A page for updates, if you have one">
          <input className="field-input" value={form.website} onChange={set('website')} />
        </Field>
      </Section>

      <Section title="Vehicle (optional)">
        <p className="text-xs text-stone-500">Include only if a vehicle is relevant.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Make">
            <input className="field-input" value={form.vehicleMake} onChange={set('vehicleMake')} />
          </Field>
          <Field label="Model">
            <input
              className="field-input"
              value={form.vehicleModel}
              onChange={set('vehicleModel')}
            />
          </Field>
          <Field label="Color">
            <input
              className="field-input"
              value={form.vehicleColor}
              onChange={set('vehicleColor')}
            />
          </Field>
          <Field label="Plate number">
            <input
              className="field-input"
              value={form.vehiclePlate}
              onChange={set('vehiclePlate')}
            />
          </Field>
        </div>
      </Section>
    </div>
  )
}
