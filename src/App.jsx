import { useState } from 'react'
import './App.css'

function App() {
  const products = [
    { emoji: '🍔', name: 'Burger', category: 'Fast Food', info: 'Tez va mazali', price: "25 000 som", priceNumeric: 25000 },
    { emoji: '🍕', name: 'Pizza', category: 'Fast Food', info: 'Issiq va katta', price: "50 000 som", priceNumeric: 50000 },
    { emoji: '🍹', name: 'maxita', category: 'Ichimlik', info: "Sovuq qoshimcha", price: "10 000 som", priceNumeric: 10000 },
    { emoji: '🍰', name: 'Tort', category: 'Shirinlik', info: 'Shirinlik', price: "20 000 som", priceNumeric: 20000 },
  ]

  const stickers = ['Express', 'Maxsus taklif', 'Chegirma', 'Yangi mahsulot', '24/7 Kassa']
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name)
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalSum = cart.reduce((sum, item) => sum + item.quantity * item.priceNumeric, 0)

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-label">KASSA-SAYTI</div>
        <h1>Kassir</h1>
      </header>

      <section className="cards">
        {products.map((product) => (
          <article key={product.name} className="card">
            <div className="emoji">{product.emoji}</div>
            <h2>{product.name}</h2>
            <p>{product.info}</p>
            <div className="price">{product.price}</div>
            <button type="button" onClick={() => addToCart(product)}>
              Sotib olish
            </button>
          </article>
        ))}
      </section>

      <div className="stickers">
        {stickers.map((text) => (
          <span key={text} className="sticker">{text}</span>
        ))}
      </div>

      <section className="sales-panel">
        <div className="sales-header">
          <h2>Sotilganlar royhati</h2>
          <span>{totalCount} ta mahsulot</span>
        </div>

        <div className="sales-total">Jami: {totalSum.toLocaleString()} so'm</div>

        <div className="panel-card">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.name} className="item-row">
                <span>{item.name}</span>
                <strong>{item.quantity} ta</strong>
              </div>
            ))
          ) : (
            <p>Hozircha hech narsa sotilmagan</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default App
