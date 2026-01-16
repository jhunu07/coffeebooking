import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader, ShoppingBag, Calendar, Mail, Package, Users, DollarSign } from 'lucide-react';
import { formatPrice } from '@/utils/currency';

type Stats = {
  totalOrders: number;
  totalBookings: number;
  totalContacts: number;
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  pendingBookings: number;
};

export const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalBookings: 0,
    totalContacts: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch all stats in parallel
        const [
          ordersResult,
          bookingsResult,
          contactsResult,
          productsResult,
          usersResult,
        ] = await Promise.all([
          supabase.from('orders').select('id, status, total'),
          supabase.from('bookings').select('id, status'),
          supabase.from('contact_submissions').select('id'),
          supabase.from('products').select('id'),
          supabase.from('profiles').select('id'),
        ]);

        const orders = ordersResult.data || [];
        const bookings = bookingsResult.data || [];
        const contacts = contactsResult.data || [];
        const products = productsResult.data || [];
        const users = usersResult.data || [];

        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const pendingOrders = orders.filter((o) => o.status === 'pending').length;
        const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

        setStats({
          totalOrders: orders.length,
          totalBookings: bookings.length,
          totalContacts: contacts.length,
          totalProducts: products.length,
          totalUsers: users.length,
          totalRevenue,
          pendingOrders,
          pendingBookings,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader className="h-6 w-6 animate-spin text-coffee-medium" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-green-100 text-green-800',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-800',
      iconColor: 'text-blue-600',
      subtitle: `${stats.pendingOrders} pending`,
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-purple-100 text-purple-800',
      iconColor: 'text-purple-600',
      subtitle: `${stats.pendingBookings} pending`,
    },
    {
      title: 'Contact Requests',
      value: stats.totalContacts,
      icon: Mail,
      color: 'bg-yellow-100 text-yellow-800',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-orange-100 text-orange-800',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-pink-100 text-pink-800',
      iconColor: 'text-pink-600',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-coffee-darkest mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-coffee-darkest">
                    {card.value}
                  </p>
                  {card.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-coffee-darkest mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h4 className="font-medium mb-2">Pending Orders</h4>
            <p className="text-2xl font-bold text-coffee-medium">
              {stats.pendingOrders}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Require attention
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h4 className="font-medium mb-2">Pending Bookings</h4>
            <p className="text-2xl font-bold text-coffee-medium">
              {stats.pendingBookings}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Need confirmation
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h4 className="font-medium mb-2">Total Products</h4>
            <p className="text-2xl font-bold text-coffee-medium">
              {stats.totalProducts}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              In your menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

