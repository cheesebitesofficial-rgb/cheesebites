import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, RotateCcw, Tag, Utensils } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import type { MenuItem, Category, DealItem, DealCategory, SizeOption } from '../../types';

export const AdminProducts: React.FC = () => {
  const {
    menuItems,
    deals,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addDealItem,
    updateDealItem,
    deleteDealItem,
    resetToDefaultMenu
  } = useMenu();

  const [activeTab, setActiveTab] = useState<'dishes' | 'deals'>('dishes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Edit Product Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<Category>('Pizza');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editSizes, setEditSizes] = useState<SizeOption[]>([]);

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('Pizza');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState<number>(500);
  const [newImage, setNewImage] = useState('');
  const [newSizes, setNewSizes] = useState<SizeOption[]>([
    { name: 'Small', price: 430 },
    { name: 'Medium', price: 930 },
    { name: 'Large', price: 1630 },
    { name: 'X-Large', price: 1630 },
  ]);

  // Edit Deal Modal State
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);
  const [editDealNumber, setEditDealNumber] = useState<number>(1);
  const [editDealName, setEditDealName] = useState('');
  const [editDealPrice, setEditDealPrice] = useState<number>(0);
  const [editDealCategory, setEditDealCategory] = useState<DealCategory>('Solo Era');
  const [editDealContentsStr, setEditDealContentsStr] = useState('');
  const [editDealImage, setEditDealImage] = useState('');

  // Add Deal Modal State
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [newDealNumber, setNewDealNumber] = useState<number>(21);
  const [newDealName, setNewDealName] = useState('');
  const [newDealPrice, setNewDealPrice] = useState<number>(1000);
  const [newDealCategory, setNewDealCategory] = useState<DealCategory>('Solo Era');
  const [newDealContentsStr, setNewDealContentsStr] = useState('');
  const [newDealImage, setNewDealImage] = useState('');

  // Filter products
  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = searchQuery === '' ||
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `deal ${deal.dealNumber}`.includes(searchQuery.toLowerCase()) ||
      deal.contents.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Product Edit Handlers
  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditPrice(item.basePrice);
    setEditCategory(item.category);
    setEditDescription(item.description);
    setEditImage(item.image);
    setEditSizes(item.sizes ? [...item.sizes] : []);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name: editName.trim(),
        basePrice: editPrice,
        category: editCategory,
        description: editDescription.trim(),
        image: editImage.trim() || editingItem.image,
        sizes: editSizes.length > 0 ? editSizes : undefined,
      });
      setEditingItem(null);
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      description: newDescription.trim() || 'Freshly prepared Cheese Bites specialty.',
      basePrice: Number(newPrice),
      image: newImage.trim() || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      sizes: newCategory === 'Pizza' ? newSizes : undefined,
      supportsExtraToppings: newCategory === 'Pizza',
    };

    addMenuItem(newItem);
    setIsAddModalOpen(false);
    setNewName('');
    setNewDescription('');
    setNewPrice(500);
    setNewImage('');
  };

  // Deal Edit Handlers
  const handleOpenEditDeal = (deal: DealItem) => {
    setEditingDeal(deal);
    setEditDealNumber(deal.dealNumber);
    setEditDealName(deal.name);
    setEditDealPrice(deal.price);
    setEditDealCategory(deal.category);
    setEditDealContentsStr(deal.contents.join(', '));
    setEditDealImage(deal.image);
  };

  const handleSaveDealEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeal) {
      const contentsArray = editDealContentsStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      updateDealItem({
        ...editingDeal,
        dealNumber: editDealNumber,
        name: editDealName.trim(),
        price: editDealPrice,
        category: editDealCategory,
        contents: contentsArray.length > 0 ? contentsArray : editingDeal.contents,
        image: editDealImage.trim() || editingDeal.image,
      });
      setEditingDeal(null);
    }
  };

  const handleAddDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealName.trim()) return;

    const contentsArray = newDealContentsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newDeal: DealItem = {
      id: `deal-custom-${Date.now()}`,
      dealNumber: newDealNumber,
      name: newDealName.trim(),
      category: newDealCategory,
      price: Number(newDealPrice),
      contents: contentsArray,
      image: newDealImage.trim() || 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=800&q=80',
    };

    addDealItem(newDeal);
    setIsAddDealModalOpen(false);
    setNewDealName('');
    setNewDealPrice(1000);
    setNewDealContentsStr('');
    setNewDealImage('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase">POS Website Menu Management</h1>
          <p className="text-xs text-gray-500 font-bold mt-1">Manage online menu items, deals, prices, and availability live on the website</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset menu items & deals back to original catalog defaults?')) {
                resetToDefaultMenu();
              }
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-gray-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          {activeTab === 'dishes' ? (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddDealModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Deal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab('dishes')}
          className={`pb-3 text-sm font-black uppercase flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'dishes'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-400 hover:text-gray-700'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Dishes & Pizzas ({menuItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`pb-3 text-sm font-black uppercase flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'deals'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-400 hover:text-gray-700'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Special Deals & Combos ({deals.length})</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'dishes' ? "Search dish or category..." : "Search deal name or item..."}
            className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {activeTab === 'dishes' && (
          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Pizza', 'Burgers', 'Sandwiches', 'Roll Paratha', 'Pasta', 'Fried Chicken', 'Fries'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-gray-950 shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dishes Table View */}
      {activeTab === 'dishes' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 px-3">Item</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">Price / Sizes</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                        <div>
                          <span className="font-extrabold text-gray-900 block">{item.name}</span>
                          <span className="text-[10px] text-gray-400 line-clamp-1">{item.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-gray-100 text-gray-800 font-bold px-2.5 py-1 rounded-lg text-[10px] uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-black text-gray-900">
                      {item.sizes && item.sizes.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.map(s => (
                            <span key={s.name} className="text-[10px] bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded font-bold border border-amber-200/50">
                              {s.name[0]}:{s.price}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span>Rs. {item.basePrice}</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase">
                        Active on Web
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 rounded-xl transition-colors"
                          title="Edit Details & Pricing"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${item.name}" from website menu?`)) {
                              deleteMenuItem(item.id);
                            }
                          }}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deals Table View */}
      {activeTab === 'deals' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 px-3">Deal</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">Includes</th>
                  <th className="pb-3 px-3">Price</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {filteredDeals.map(deal => (
                  <tr key={deal.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img src={deal.image} alt={deal.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                        <div>
                          <span className="font-extrabold text-gray-900 block">Deal #{deal.dealNumber}: {deal.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg text-[10px] uppercase">
                        {deal.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <p className="text-[11px] text-gray-600 font-medium truncate">
                        {deal.contents.join(' + ')}
                      </p>
                    </td>
                    <td className="py-3 px-3 font-black text-amber-600 text-sm">
                      Rs. {deal.price}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditDeal(deal)}
                          className="p-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 rounded-xl transition-colors"
                          title="Edit Deal"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${deal.name}" from website deals?`)) {
                              deleteDealItem(deal.id);
                            }
                          }}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                          title="Delete Deal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900 uppercase">Edit Product Details</h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value as Category)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Sandwiches">Sandwiches</option>
                    <option value="Roll Paratha">Roll Paratha</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Fried Chicken">Fried Chicken</option>
                    <option value="Fries">Fries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Base Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-black text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Pizza Sizes adjustment if available */}
              {editSizes && editSizes.length > 0 && (
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-2">
                  <label className="text-xs font-black text-amber-900 uppercase block">Size Specific Prices (Rs.)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {editSizes.map((sizeOpt, idx) => (
                      <div key={sizeOpt.name} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-amber-200">
                        <span className="text-xs font-extrabold w-16 text-gray-700">{sizeOpt.name}:</span>
                        <input
                          type="number"
                          value={sizeOpt.price}
                          onChange={e => {
                            const updated = [...editSizes];
                            updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                            setEditSizes(updated);
                          }}
                          className="w-full bg-gray-50 border border-gray-200 px-2 py-1 rounded text-xs font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={editImage}
                  onChange={e => setEditImage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black py-2.5 rounded-xl text-xs uppercase shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900 uppercase">Add New Menu Dish</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Malai Tikka Supreme Pizza"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as Category)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Sandwiches">Sandwiches</option>
                    <option value="Roll Paratha">Roll Paratha</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Fried Chicken">Fried Chicken</option>
                    <option value="Fries">Fries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Base Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-black text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {newCategory === 'Pizza' && (
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-2">
                  <label className="text-xs font-black text-amber-900 uppercase block">Pizza Sizes & Pricing (Rs.)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {newSizes.map((sz, idx) => (
                      <div key={sz.name} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-amber-200">
                        <span className="text-xs font-extrabold w-16 text-gray-700">{sz.name}:</span>
                        <input
                          type="number"
                          value={sz.price}
                          onChange={e => {
                            const updated = [...newSizes];
                            updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                            setNewSizes(updated);
                          }}
                          className="w-full bg-gray-50 border border-gray-200 px-2 py-1 rounded text-xs font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Short description of ingredients..."
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Image URL (Optional)</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black py-3 rounded-xl text-xs uppercase shadow-md"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Deal Modal */}
      {editingDeal && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900 uppercase">Edit Special Deal</h3>
              <button onClick={() => setEditingDeal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveDealEdit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Deal #</label>
                  <input
                    type="number"
                    required
                    value={editDealNumber}
                    onChange={e => setEditDealNumber(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-black text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Deal Title *</label>
                  <input
                    type="text"
                    required
                    value={editDealName}
                    onChange={e => setEditDealName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Deal Category *</label>
                  <select
                    value={editDealCategory}
                    onChange={e => setEditDealCategory(e.target.value as DealCategory)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Solo Era">Solo Era</option>
                    <option value="Hits Different">Hits Different</option>
                    <option value="Squad Goals">Squad Goals</option>
                    <option value="The Big Flex">The Big Flex</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={editDealPrice}
                    onChange={e => setEditDealPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-black text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Deal Contents (comma separated)</label>
                <textarea
                  rows={3}
                  value={editDealContentsStr}
                  onChange={e => setEditDealContentsStr(e.target.value)}
                  placeholder="Small Pizza, Regular Drink, Fries"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Deal Image URL</label>
                <input
                  type="text"
                  value={editDealImage}
                  onChange={e => setEditDealImage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDeal(null)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black py-3 rounded-xl text-xs uppercase shadow-md"
                >
                  Save Deal Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {isAddDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900 uppercase">Add New Special Deal</h3>
              <button onClick={() => setIsAddDealModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddDealSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Deal # *</label>
                  <input
                    type="number"
                    required
                    value={newDealNumber}
                    onChange={e => setNewDealNumber(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-black text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Deal Title *</label>
                  <input
                    type="text"
                    required
                    value={newDealName}
                    onChange={e => setNewDealName(e.target.value)}
                    placeholder="e.g. Mega Family Feast"
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Deal Category *</label>
                  <select
                    value={newDealCategory}
                    onChange={e => setNewDealCategory(e.target.value as DealCategory)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Solo Era">Solo Era</option>
                    <option value="Hits Different">Hits Different</option>
                    <option value="Squad Goals">Squad Goals</option>
                    <option value="The Big Flex">The Big Flex</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={newDealPrice}
                    onChange={e => setNewDealPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-black text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Deal Contents (comma separated) *</label>
                <textarea
                  rows={3}
                  required
                  value={newDealContentsStr}
                  onChange={e => setNewDealContentsStr(e.target.value)}
                  placeholder="2 Large Pizzas, 1.5L Drink, 1 Garlic Bread"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Deal Image URL (Optional)</label>
                <input
                  type="text"
                  value={newDealImage}
                  onChange={e => setNewDealImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDealModalOpen(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black py-3 rounded-xl text-xs uppercase shadow-md"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
