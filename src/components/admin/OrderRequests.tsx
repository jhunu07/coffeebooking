
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Order = {
  id: string;
  created_at: string;
  user_id: string;
  status: string;
  total: number;
};

type OrderItem = {
  id: string;
  product_id: string;
  order_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
  product_name?: string;
};

type OrderWithItems = Order & {
  items: OrderItem[];
  user_email?: string;
};

export const OrderRequests = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch order items and user data for each order
      const ordersWithDetails = await Promise.all((ordersData || []).map(async (order) => {
        // Get order items
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*, products(name)')
          .eq('order_id', order.id);

        // Format items with product names
        const items = (itemsData || []).map((item: any) => ({
          ...item,
          product_name: item.products?.name
        }));

        // Get user email
        const { data: userData } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', order.user_id)
          .single();

        return {
          ...order,
          items,
          user_email: userData?.username
        };
      }));

      setOrders(ordersWithDetails);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Set up real-time listeners for orders table
    const channel = supabase
      .channel('orders_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders' 
        }, 
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Order status updated to ${status}`);
      fetchOrders();
      
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({
          ...selectedOrder,
          status
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleViewDetails = (order: OrderWithItems) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader className="h-6 w-6 animate-spin text-coffee-medium" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-coffee-darkest mb-6">
        Order Requests
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-coffee-dark">
          No orders found
        </div>
      ) : (
        <Table>
          <TableCaption>List of customer orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono">{order.id.slice(0, 8)}...</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{order.user_email || order.user_id.slice(0, 8)}</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : order.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'processing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'processing')}
                    disabled={order.status === 'processing'}
                  >
                    Processing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    disabled={order.status === 'completed'}
                  >
                    Completed
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order Details
            </DialogTitle>
            <DialogDescription>
              Order placed on {selectedOrder && formatDate(selectedOrder.created_at)}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                <p className="mt-1 font-mono">{selectedOrder.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                <p className="mt-1">{selectedOrder.user_email || selectedOrder.user_id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">{selectedOrder.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Items</h3>
                <div className="mt-2 space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.product_name || item.product_id} x {item.quantity}</span>
                      <span>{formatCurrency(item.unit_price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-bold flex justify-between">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                  disabled={selectedOrder.status === 'processing'}
                >
                  Mark Processing
                </Button>
                <Button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                  disabled={selectedOrder.status === 'completed'}
                >
                  Mark Completed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
