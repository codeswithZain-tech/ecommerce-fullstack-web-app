import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import HeroBanner from '../components/home/HeroBanner';
import CategorySidebar from '../components/home/CategorySidebar';
import UserPanel from '../components/home/UserPanel';
import DealsSection from '../components/home/DealsSection';
import ProductSection from '../components/home/ProductSection';
import InquirySection from '../components/home/InquirySection';
import RecommendedItems from '../components/home/RecommendedItems';
import ExtraServices from '../components/home/ExtraServices';
import SuppliersByRegion from '../components/home/SuppliersByRegion';
import { getProducts } from '../services/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }, [location]);

  useEffect(() => {
    getProducts({ limit: 100 })
      .then((res) => {
        const all = res.data.products;
        const home = all.filter((p) => p.category === 'Home interiors');
        const elec = all.filter((p) => p.category === 'Consumer electronics' || p.category === 'Electronics');

        const paddedHome = home.length >= 8 ? home.slice(0, 8) : [...home, ...all.filter((p) => p.category !== 'Home interiors')].slice(0, 8);
        const paddedElec = elec.length >= 8 ? elec.slice(0, 8) : [...elec, ...all.filter((p) => !['Consumer electronics', 'Electronics'].includes(p.category))].slice(0, 8);

        setHomeProducts(paddedHome);
        setElectronics(paddedElec);
        return getProducts({ featured: 'true', limit: 10 });
      })
      .then((res) => setFeatured(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full lg:px-4 lg:pt-4">
        <div className="bg-white lg:rounded-lg shadow-sm p-0 lg:p-6 lg:mb-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <CategorySidebar />
            <div className="w-full lg:flex-1">
              <HeroBanner />
            </div>
            <div className="w-full lg:w-[220px]">
              <UserPanel />
            </div>
          </div>
        </div>
      </main>

      <div className="px-4">
        <DealsSection />
      </div>

      {!loading && (
        <>
          <ProductSection title="Home and outdoor" bgImage="/images/home-interior-2.png" products={homeProducts} categoryFilter="Home interiors" />
          <ProductSection title="Consumer electronics and gadgets" bgImage="/images/products/tech-gadgets.png" products={electronics} categoryFilter="Consumer electronics" />
        </>
      )}

      <div className="px-4">
        <InquirySection />
      </div>

      {!loading && <RecommendedItems products={featured} />}
      <ExtraServices />
      <SuppliersByRegion />
      <Newsletter />
      <Footer />
    </div>
  );
}
