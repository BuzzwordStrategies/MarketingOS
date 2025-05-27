 
'use client';

import { useState, useEffect } from 'react';

export default function PricingAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrice = async (serviceId, tier, newPrice) => {
    try {
      await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, tier, price: newPrice })
      });
      fetchServices();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  if (loading) return <div className="p-6">Loading services...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Service Pricing Manager</h1>
      
      <div className="grid gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{service.display_name}</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base Price</label>
                <input
                  type="number"
                  value={service.base_price}
                  onChange={(e) => updatePrice(service.id, 'base', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Standard Price</label>
                <input
                  type="number"
                  value={service.standard_price}
                  onChange={(e) => updatePrice(service.id, 'standard', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Premium Price</label>
                <input
                  type="number"
                  value={service.premium_price}
                  onChange={(e) => updatePrice(service.id, 'premium', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}