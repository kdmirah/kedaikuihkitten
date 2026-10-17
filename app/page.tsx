'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, CalendarDays, Check, ChevronDown, Leaf, Minus, Plus, Send, Sparkles } from 'lucide-react'

const WHATSAPP_NUMBER = '601155555555'

const menu = [
  { id: 'talam', name: 'Kuih Talam Pandan', malay: 'Kuih Talam Pandan', price: 1.5, description: 'Soft pandan and coconut layers with a delicate, fragrant taste.', detail: 'Lembut dengan lapisan pandan dan santan yang harum.', color: 'pandan' },
  { id: 'seri', name: 'Kuih Seri Muka', malay: 'Kuih Seri Muka', price: 1.8, description: 'Fragrant glutinous rice topped with smooth pandan custard.', detail: 'Pulut berlemak dengan lapisan kastard pandan yang lembut.', color: 'cream' },
  { id: 'onde', name: 'Onde-Onde', malay: 'Onde-Onde', price: 1.2, description: 'Pandan rice balls filled with melted palm sugar and coconut.', detail: 'Bebola pandan berinti gula Melaka cair dan bersalut kelapa.', color: 'green' },
  { id: 'lapis', name: 'Kuih Lapis', malay: 'Kuih Lapis', price: 1.2, description: 'Colourful, soft, layered kuih with a pleasantly chewy texture.', detail: 'Kuih berlapis yang berwarna-warni, lembut dan kenyal.', color: 'pink' },
  { id: 'ketayap', name: 'Kuih Ketayap', malay: 'Kuih Ketayap', price: 1.8, description: 'Pandan crepes filled with sweet grated coconut and palm sugar.', detail: 'Lempeng pandan berinti kelapa manis dan gula Melaka.', color: 'brown' },
]

const money = (value: number) => `RM${value.toFixed(2)}`
const today = new Date().toISOString().split('T')[0]

export default function Page() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [name, setName] = useState('')
  const [pickup, setPickup] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const selected = useMemo(() => menu.filter((item) => (quantities[item.id] || 0) > 0), [quantities])
  const total = selected.reduce((sum, item) => sum + item.price * quantities[item.id], 0)

  function updateQuantity(id: string, amount: number) {
    setSent(false)
    setQuantities((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + amount) }))
  }

  function sendOrder(event: React.FormEvent) {
    event.preventDefault()
    if (!name.trim() || !pickup || selected.length === 0) {
      setError('Please add your name, a pickup date and at least one kuih. / Sila isi nama, tarikh pengambilan dan sekurang-kurangnya satu kuih.')
      return
    }
    setError('')
    const lines = selected.map((item) => `${item.name} / ${item.malay} — ${quantities[item.id]} × ${money(item.price)} = ${money(item.price * quantities[item.id])}`).join('\n')
    const message = `Hello Kuih Kasih Sayang Kitten! I would like to place a kuih order.\n\nName / Nama: ${name.trim()}\n\nOrder / Pesanan:\n${lines}\n\nEstimated total / Anggaran jumlah: ${money(total)}\n\nPreferred pickup date / Tarikh pengambilan pilihan: ${pickup}\n\nNotes / Nota tambahan: ${notes.trim() || 'None / Tiada'}\n\nPlease confirm availability, final pricing and pickup details. Thank you!\n\nSila sahkan ketersediaan, harga akhir dan butiran pengambilan. Terima kasih!`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand"><span className="brand-mark"><Leaf size={17} /></span><span>Kuih Kasih Sayang <em>Kitten</em></span></a>
        <a href="#order" className="header-link">Order / Tempah <ArrowRight size={15} /></a>
      </header>

      <section id="top" className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={14} /> Homemade Malaysian kuih</p>
          <h1>Sweet Moments,<br /><i>Made with</i><br />Kasih Sayang</h1>
          <p className="hero-malay">Manisnya Kenangan, Dihasilkan dengan Penuh Kasih Sayang</p>
          <p className="hero-description">Delicious homemade kuih for your family, friends and special gatherings. Choose your favourites and send your order through WhatsApp in just a few taps.</p>
          <p className="hero-description malay">Kuih tradisional buatan sendiri yang enak untuk keluarga, sahabat dan majlis istimewa.</p>
          <a className="primary-button" href="#order">Order Now / Tempah Sekarang <ArrowDown size={17} /></a>
        </div>
        <div className="hero-image-wrap"><img src="/kuih-hero.png" alt="Colourful Malaysian kuih arranged on a banana leaf" /><div className="hero-stamp">made<br /><strong>with</strong><br />kasih sayang</div></div>
      </section>

      <section className="menu-section section-wrap" id="menu">
        <div className="section-heading"><div><p className="eyebrow">02 / The menu</p><h2>Our Kuih Menu <span>/ Menu Kuih Kami</span></h2></div><p>Discover our colourful traditional kuih, lovingly prepared for sharing.<br /><em>Terokai aneka kuih tradisional yang berwarna-warni.</em></p></div>
        <div className="menu-grid">{menu.map((item, index) => <article className={`kuih-card card-${item.color}`} key={item.id}><div className="kuih-photo"><img src="/kuih-menu.png" alt="Malaysian traditional kuih" /><span className="card-number">0{index + 1}</span></div><div className="card-body"><div className="card-title"><h3>{item.name}</h3><strong>{money(item.price)}<small>/piece</small></strong></div><p>{item.description}</p><p className="malay">{item.detail}</p><button className="add-button" onClick={() => updateQuantity(item.id, 1)}><Plus size={15} /> Add / Tambah</button></div></article>)}</div>
        <p className="sample-note">* Sample prices only — final prices and availability are confirmed through WhatsApp.<br />* Harga contoh sahaja — harga akhir dan ketersediaan akan disahkan melalui WhatsApp.</p>
      </section>

      <section className="order-section section-wrap" id="order">
        <div className="section-heading order-heading"><div><p className="eyebrow">03 / Your order</p><h2>Build Your Order <span>/ Sediakan Pesanan Anda</span></h2></div><p>Choose your kuih, select the quantity and pick your preferred collection date.<br /><em>Pilih kuih, tentukan kuantiti dan pilih tarikh pengambilan.</em></p></div>
        <form className="order-layout" onSubmit={sendOrder}><div className="form-panel"><label>Customer name <span>/ Nama pelanggan</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Nur Aisyah" /></label><fieldset><legend>Choose your kuih <span>/ Pilihan kuih</span></legend>{menu.map((item) => <div className="order-item" key={item.id}><div><strong>{item.name}</strong><small>{money(item.price)} / piece</small></div><div className="stepper"><button type="button" aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button><b>{quantities[item.id] || 0}</b><button type="button" aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button></div></div>)}</fieldset><label><span className="label-with-icon"><CalendarDays size={15} /> Preferred pickup date <span>/ Tarikh pengambilan pilihan</span></span><input type="date" min={today} value={pickup} onChange={(e) => setPickup(e.target.value)} /></label><label>Optional notes <span>/ Nota tambahan</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any little details for us? / Ada nota untuk kami?" rows={3} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="whatsapp-button" type="submit"><Send size={17} /> Send Order via WhatsApp / Hantar Pesanan <ArrowRight size={17} /></button>{sent && <p className="success-message"><Check size={16} /> WhatsApp opened with your request. Please press Send to submit it.</p>}<p className="disclaimer">Your date is a request, not a confirmed booking. Final prices, availability and pickup details will be confirmed through WhatsApp.<br /><em>Tarikh anda ialah permintaan, bukan tempahan disahkan.</em></p></div><aside className="summary-panel"><p className="eyebrow">Order summary / Ringkasan</p>{selected.length === 0 ? <div className="empty-summary"><span>+</span><p>Your kuih will appear here.<br /><em>Kuih pilihan anda akan muncul di sini.</em></p></div> : <>{selected.map((item) => <div className="summary-line" key={item.id}><span>{item.name}<small>{quantities[item.id]} × {money(item.price)}</small></span><strong>{money(item.price * quantities[item.id])}</strong></div>)}<div className="summary-total"><span>Estimated total<br /><em>Anggaran jumlah</em></span><strong>{money(total)}</strong></div></>}</aside></form>
      </section>

      <section className="steps-section section-wrap"><div className="section-heading"><div><p className="eyebrow">04 / Simple steps</p><h2>How Ordering Works <span>/ Cara Membuat Pesanan</span></h2></div><p>From our kitchen to your gathering, just three easy steps.</p></div><div className="steps-grid">{[['01', 'Choose Your Kuih', 'Pilih Kuih', 'Browse the menu and choose your favourite kuih and quantities.'], ['02', 'Send Your Order', 'Hantar Pesanan', 'Review your order and open WhatsApp to send your request.'], ['03', 'Wait for Confirmation', 'Tunggu Pengesahan', 'We will confirm availability, final pricing, and pickup arrangements through WhatsApp.']].map(([number, title, malay, copy]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p className="malay">{malay}</p><p>{copy}</p></div>)}</div></section>

      <section className="cta-section section-wrap"><div><p className="eyebrow">05 / A little sweetness</p><h2>Ready to Order?</h2><p>Something sweet is just a message away. Let&apos;s prepare your next favourite treat!</p><p className="malay">Nikmati kemanisan hanya dengan satu pesanan. Mari pilih kuih kegemaran anda.</p></div><a className="primary-button light" href="#order">Order Your Kuih Now / Tempah Kuih Anda <ArrowRight size={17} /></a></section>
      <footer><div className="brand"><span className="brand-mark"><Leaf size={17} /></span><span>Kuih Kasih Sayang <em>Kitten</em></span></div><p>Made with love and kasih sayang.<br />Dihasilkan dengan penuh kasih sayang.</p><small>Preview number only: +60 11-5555 5555 · Replace before launch</small></footer>
    </main>
  )
}
