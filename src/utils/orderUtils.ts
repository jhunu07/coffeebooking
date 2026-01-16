import { supabase } from '@/integrations/supabase/client';
import { Coffee } from '@/context/CartContext';

export interface CheckoutItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}

export const createOrder = async (
  userId: string,
  items: Coffee[],
  total: number
): Promise<{ orderId: string; error: any }> => {
  try {
    // Create order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total: total,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      return { orderId: '', error: orderError };
    }

    // Get product IDs from database (match by name)
    const productNames = items.map(item => item.name);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price')
      .in('name', productNames);

    if (productsError) {
      return { orderId: orderData.id, error: productsError };
    }

    // Create order items
    const orderItems = items.map(item => {
      const product = products?.find(p => p.name === item.name);
      return {
        order_id: orderData.id,
        product_id: product?.id || null,
        quantity: item.quantity,
        unit_price: item.price,
      };
    });

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return { orderId: orderData.id, error: itemsError };
    }

    return { orderId: orderData.id, error: null };
  } catch (error) {
    return { orderId: '', error };
  }
};

