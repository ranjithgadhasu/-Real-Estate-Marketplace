import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, UploadCloud, X } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';
import { allAmenities, propertyTypes } from '../data/properties.js';

const inputClass = 'mt-2 w-full rounded-[3px] border border-gray-200 bg-[#f8f7f3] px-4 py-3 text-[13px] text-primary-900 outline-none placeholder:text-gray-400 focus:border-primary-500';
const initial = { title: '', type: 'house', status: 'sale', price: '', address: '', city: '', bedrooms: '', bathrooms: '', area: '', yearBuilt: '', description: '', amenities: [], name: '', email: '', phone: '' };
const steps = ['The basics', 'The details', 'The features', 'Your information'];

function Field({ label, value, onChange, error, type = 'text', placeholder, min, max, step, multiline = false }) {
  return (
    <label className="block text-[12px] font-medium text-primary-900">
      {label}
      {multiline
        ? <textarea rows={5} value={value} onChange={onChange} placeholder={placeholder} className={`${inputClass} resize-none`} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} step={step} className={inputClass} />}
      {error && <span className="mt-1 block text-[11px] text-red-700">{error}</span>}
    </label>
  );
}

function validate(step, form) {
  const errors = {};
  if (step === 1) {
    if (!form.title.trim()) errors.title = 'Please add a property title.';
    if (!form.price || Number(form.price) <= 0) errors.price = 'Enter a valid price.';
    if (!form.address.trim()) errors.address = 'Enter the street address.';
    if (!form.city.trim()) errors.city = 'Enter the city and state.';
  }
  if (step === 2) {
    if (form.bedrooms === '' || Number(form.bedrooms) < 0) errors.bedrooms = 'Enter the number of bedrooms.';
    if (form.bathrooms === '' || Number(form.bathrooms) < 0) errors.bathrooms = 'Enter the number of bathrooms.';
    if (!form.area || Number(form.area) <= 0) errors.area = 'Enter the living area.';
    if (form.yearBuilt && (Number(form.yearBuilt) < 1800 || Number(form.yearBuilt) > new Date().getFullYear())) errors.yearBuilt = 'Enter a valid year.';
    if (!form.description.trim()) errors.description = 'Tell us a little about this home.';
  }
  if (step === 4) {
    if (!form.name.trim()) errors.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
    if (!form.phone.trim()) errors.phone = 'Enter your phone number.';
  }
  return errors;
}

export default function SubmitProperty() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [photos, setPhotos] = useState([]);
  const [saved, setSaved] = useState(false);
  const urls = useRef([]);

  useEffect(() => () => urls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const update = (key, value) => { setForm((previous) => ({ ...previous, [key]: value })); setErrors((previous) => ({ ...previous, [key]: '' })); };
  const field = (key, label, options = {}) => <Field label={label} value={form[key]} onChange={(event) => update(key, event.target.value)} error={errors[key]} {...options} />;

  const next = () => {
    const issues = validate(step, form);
    setErrors(issues);
    if (Object.keys(issues).length === 0) { setStep((current) => Math.min(current + 1, 4)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const addPhotos = (event) => {
    const files = [...(event.target.files || [])];
    if (photos.length + files.length > 20 || files.some((file) => !['image/png', 'image/jpeg'].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      setErrors((previous) => ({ ...previous, photos: 'Select up to 20 JPG or PNG images, each under 10 MB.' }));
      event.target.value = '';
      return;
    }
    const additions = files.map((file) => { const url = URL.createObjectURL(file); urls.current.push(url); return { name: file.name, url }; });
    setPhotos((previous) => [...previous, ...additions]);
    setErrors((previous) => ({ ...previous, photos: '' }));
    event.target.value = '';
  };

  const removePhoto = (url) => {
    URL.revokeObjectURL(url);
    urls.current = urls.current.filter((item) => item !== url);
    setPhotos((previous) => previous.filter((photo) => photo.url !== url));
  };

  const submit = (event) => {
    event.preventDefault();
    if (step !== 4) { next(); return; }
    const issues = validate(4, form);
    setErrors(issues);
    if (Object.keys(issues).length) return;
    try {
      const existing = JSON.parse(localStorage.getItem('estately_submissions') || '[]');
      localStorage.setItem('estately_submissions', JSON.stringify([...existing, { ...form, photoNames: photos.map((photo) => photo.name), savedAt: new Date().toISOString() }]));
      setSaved(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors({ submit: 'We could not save your draft on this device. Please try again.' });
    }
  };

  const summary = `Property: ${form.title}\nType: ${form.type}\nFor: ${form.status}\nPrice: $${Number(form.price).toLocaleString()}\nAddress: ${form.address}, ${form.city}\nBedrooms: ${form.bedrooms}\nBathrooms: ${form.bathrooms}\nArea: ${form.area} sqft\nDescription: ${form.description}\nFeatures: ${form.amenities.join(', ')}\n\nContact: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`;

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24">
      <PageHeader eyebrow="List your home" title="Tell us about your place." description="The details make a home memorable. Share yours with us in a few simple steps." />
      <div className="site-container site-container--narrow pt-10 sm:pt-14">
        {saved ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="border-t border-gray-300 py-14">
            <Check size={28} strokeWidth={1.5} className="text-primary-700" />
            <h2 className="mt-5 font-serif text-[clamp(2.4rem,5vw,4rem)] text-primary-900">Your property draft is saved.</h2>
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-gray-600">Your details are saved in this browser. To take the next step, email our team with the summary below. Photo attachments can be added in your email app.</p>
            <div className="mt-8 flex flex-wrap gap-6"><a href={`mailto:hello@estately.com?subject=${encodeURIComponent(`List my property: ${form.title}`)}&body=${encodeURIComponent(summary)}`} className="text-link">Email your listing <ArrowRight size={17} /></a><Link to="/properties" className="text-link">Explore homes <ArrowRight size={17} /></Link></div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 pb-7 sm:gap-7">
              {steps.map((label, index) => <div key={label} className={`border-t-2 pt-3 ${step >= index + 1 ? 'border-primary-900 text-primary-900' : 'border-gray-200 text-gray-400'}`}><p className="text-[10px] font-semibold tracking-[.12em]">0{index + 1}</p><p className="mt-1 hidden text-[12px] sm:block">{label}</p></div>)}
            </div>

            <form onSubmit={submit} noValidate className="mt-10 border border-gray-200 bg-white p-5 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }}>
                  <p className="eyebrow mb-3">Step 0{step} of 04</p>
                  <h2 className="mb-8 font-serif text-[32px] leading-tight text-primary-900">{steps[step - 1]}.</h2>
                  {step === 1 && <div className="space-y-6">
                    {field('title', 'Property title', { placeholder: 'A name for your home' })}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="text-[12px] font-medium text-primary-900">Property type<select value={form.type} onChange={(event) => update('type', event.target.value)} className={inputClass}>{propertyTypes.filter((type) => type.value !== 'all').map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label>
                      <label className="text-[12px] font-medium text-primary-900">Listing type<select value={form.status} onChange={(event) => update('status', event.target.value)} className={inputClass}><option value="sale">For sale</option><option value="rent">For rent</option></select></label>
                    </div>
                    {field('price', form.status === 'rent' ? 'Monthly rent ($)' : 'Asking price ($)', { type: 'number', min: 1, placeholder: 'e.g. 750000' })}
                    <div className="grid gap-6 sm:grid-cols-2">{field('address', 'Street address', { placeholder: 'Street address' })}{field('city', 'City and state', { placeholder: 'e.g. Miami Beach, FL' })}</div>
                  </div>}
                  {step === 2 && <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-3">{field('bedrooms', 'Bedrooms', { type: 'number', min: 0, step: 1, placeholder: '3' })}{field('bathrooms', 'Bathrooms', { type: 'number', min: 0, step: 0.5, placeholder: '2' })}{field('area', 'Living area (sqft)', { type: 'number', min: 1, placeholder: '2000' })}</div>
                    {field('yearBuilt', 'Year built (optional)', { type: 'number', min: 1800, max: new Date().getFullYear(), placeholder: '2020' })}
                    {field('description', 'Description', { multiline: true, placeholder: 'What makes this home special?' })}
                    <div><span className="text-[12px] font-medium text-primary-900">Property photos (optional)</span><label className="mt-2 flex cursor-pointer flex-col items-center border border-dashed border-gray-300 px-5 py-8 text-center transition-colors hover:border-primary-600"><UploadCloud size={27} strokeWidth={1.4} className="text-primary-700" /><span className="mt-3 text-[13px] text-primary-900">Choose photos</span><span className="mt-1 text-[11px] text-gray-500">JPG or PNG, up to 10 MB each, 20 photos max</span><input type="file" accept="image/jpeg,image/png" multiple onChange={addPhotos} className="sr-only" /></label>{errors.photos && <p className="mt-2 text-[11px] text-red-700">{errors.photos}</p>}{photos.length > 0 && <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">{photos.map((photo) => <div key={photo.url} className="relative"><img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" /><button type="button" aria-label={`Remove ${photo.name}`} onClick={() => removePhoto(photo.url)} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-primary-900 text-white"><X size={13} /></button></div>)}</div>}</div>
                  </div>}
                  {step === 3 && <div><p className="mb-6 text-[13px] leading-6 text-gray-600">Choose the features that make this home yours.</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{allAmenities.map((amenity) => <label key={amenity} className="flex cursor-pointer items-center gap-3 border-b border-gray-200 py-2.5 text-[12px] text-gray-700"><input type="checkbox" checked={form.amenities.includes(amenity)} onChange={() => update('amenities', form.amenities.includes(amenity) ? form.amenities.filter((item) => item !== amenity) : [...form.amenities, amenity])} className="accent-primary-800" />{amenity}</label>)}</div></div>}
                  {step === 4 && <div className="space-y-6">{field('name', 'Full name', { placeholder: 'Your name' })}<div className="grid gap-6 sm:grid-cols-2">{field('email', 'Email address', { type: 'email', placeholder: 'you@example.com' })}{field('phone', 'Phone number', { type: 'tel', placeholder: '(555) 123-4567' })}</div><p className="border-t border-gray-200 pt-5 text-[12px] leading-6 text-gray-600">Your information will be saved on this device. Publishing and sending your listing to our team requires the next step by email.</p></div>}
                </motion.div>
              </AnimatePresence>
              {errors.submit && <p role="alert" className="mt-5 text-[12px] text-red-700">{errors.submit}</p>}
              <div className="mt-10 flex items-center justify-between gap-3 border-t border-gray-200 pt-6">
                <button type="button" onClick={() => { setStep((current) => Math.max(1, current - 1)); setErrors({}); }} disabled={step === 1} className="text-[12px] font-medium text-gray-600 hover:text-primary-900 disabled:opacity-30">Previous</button>
                {step === 4 ? <button type="submit" className="inline-flex items-center gap-2 bg-primary-900 px-5 py-3.5 text-[12px] font-semibold text-white hover:bg-primary-700">Save property details <ArrowRight size={16} /></button> : <button type="button" onClick={next} className="inline-flex items-center gap-2 bg-primary-900 px-5 py-3.5 text-[12px] font-semibold text-white hover:bg-primary-700">Next step <ArrowRight size={16} /></button>}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}