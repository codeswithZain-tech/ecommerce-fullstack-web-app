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
import {
  CONSUMER_ELECTRONICS_ORDER,
  HOME_INTERIOR_ORDER,
  RECOMMENDED_ORDER,
  sortProductsByNames,
} from '../data/designSections';

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
        const home = sortProductsByNames(
          all.filter((p) => p.category === 'Home interiors'),
          HOME_INTERIOR_ORDER,
        );
        const elec = sortProductsByNames(
          all.filter((p) => ['Consumer electronics', 'Electronics'].includes(p.category)),
          CONSUMER_ELECTRONICS_ORDER,
        );

        setHomeProducts(home);
        setElectronics(elec);
        return getProducts({ limit: 100 });
      })
      .then((res) => {
        const recommended = sortProductsByNames(res.data.products, RECOMMENDED_ORDER);
        setFeatured(recommended);
      })
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
          <ProductSection title="Home and outdoor" bgImage="/images/products/soft-chair.jpg" products={homeProducts} categoryFilter="Home interiors" />
          <ProductSection title="Consumer electronics and gadgets" bgImage="/images/products/tablet.jpg" products={electronics} categoryFilter="Consumer electronics" />
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
