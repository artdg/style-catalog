import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Top } from './pages/Top'
import { Category } from './pages/Category'
import { OfferDetails } from './pages/OfferDetails'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Top />} />
        <Route path="/earn-crypto" element={<Category category="Earn Crypto" />} />
        <Route path="/claim-free" element={<Category category="Claim Free" />} />
        <Route path="/passive-income" element={<Category category="Passive Income" />} />
        <Route path="/play-and-earn" element={<Category category="Play and Earn" />} />
        <Route path="/free-spins" element={<Category category="Free Spins" />} />
        <Route path="/offer/:id" element={<OfferDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
