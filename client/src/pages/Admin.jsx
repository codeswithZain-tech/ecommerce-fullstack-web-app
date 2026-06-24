import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ShoppingBag } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

const emptyForm = { name: '', price: '', image: '/images/products/smartphone.png', description: '', category: 'Electronics', stock: 100 };

export default function Admin() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    getProducts({ limit: 100 })
      .then((res) => setProducts(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editing) {
        await updateProduct(editing, data);
      } else {
        await createProduct(data);
      }
      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, image: product.image, description: product.description, category: product.category, stock: product.stock });
    setEditing(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6 text-brand-600" />
          <span className="font-semibold text-lg">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <Link to="/" className="text-brand-600 hover:underline">View Store</Link>
          <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}
            className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded text-sm hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold mb-4">{editing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'price', label: 'Price', type: 'number' },
                { key: 'image', label: 'Image URL', type: 'text' },
                { key: 'category', label: 'Category', type: 'text' },
                { key: 'stock', label: 'Stock', type: 'number' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required={key !== 'image'}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded text-sm hover:bg-brand-700">
                  {editing ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="border border-gray-300 px-6 py-2 rounded text-sm hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Product</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Price</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Stock</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                        <span className="line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{product.category}</td>
                    <td className="px-4 py-3 font-medium">${product.price}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500">{product.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(product)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
