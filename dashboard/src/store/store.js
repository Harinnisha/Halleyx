import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get initial user session
const getInitialUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

export const useStore = create((set, get) => ({
  // ─── Auth State ──────────────────────────────────────────────────────
  user: null, // Will be set on mount or login
  authError: null,
  authLoading: false,

  setUser: (user) => set({ user }),

  login: async (credentials) => {
    set({ authLoading: true, authError: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;
      set({ user: data.user, authLoading: false, authError: null });
    } catch (err) {
      set({ authError: err.message || 'Login failed', authLoading: false });
    }
  },

  register: async (userData) => {
    set({ authLoading: true, authError: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.name,
          }
        }
      });
      if (error) throw error;
      set({ user: data.user, authLoading: false, authError: null });
    } catch (err) {
      set({ authError: err.message || 'Registration failed', authLoading: false });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ 
      user: null, 
      orders: [], 
      analytics: { totalOrders: 0, totalRevenue: 0, ordersByProduct: [], ordersByStatus: [] }, 
      widgets: [] 
    });
  },

  // ─── Dashboard State ─────────────────────────────────────────────────
  orders: [],
  widgets: JSON.parse(localStorage.getItem('halleyx_widgets') || '[]'),
  analytics: { totalOrders: 0, totalRevenue: 0, ordersByProduct: [], ordersByStatus: [] },
  isEditingDashboard: false,
  loading: false,

  // ─── Order Actions (Supabase) ───────────────────────────
  fetchOrders: async () => {
    const currentUser = get().user;
    if (!currentUser) return;

    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) throw error;
      
      // Map database fields to frontend fields if they differ
      const mappedOrders = data.map(o => ({
        ...o,
        _id: o.id, // compatibility with old code
        firstName: o.first_name,
        lastName: o.last_name,
        phoneNumber: o.phone_number,
        streetAddress: o.street_address,
        postalCode: o.postal_code,
        unitPrice: o.unit_price,
        totalAmount: o.total_amount,
        orderDate: o.order_date,
        createdBy: o.created_by
      }));

      set({ orders: mappedOrders, loading: false });
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      set({ loading: false });
    }
  },

  addOrder: async (order) => {
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          first_name: order.firstName,
          last_name: order.lastName,
          email: order.email,
          phone_number: order.phoneNumber,
          street_address: order.streetAddress,
          city: order.city,
          state: order.state,
          postal_code: order.postalCode,
          country: order.country,
          product: order.product,
          quantity: order.quantity,
          unit_price: order.unitPrice,
          status: order.status || 'Pending',
          created_by: currentUser.id
        }])
        .select();

      if (error) throw error;
      
      await get().fetchOrders();
      await get().fetchAnalytics();
    } catch (err) {
      console.error('Failed to add order:', err);
    }
  },

  updateOrder: async (id, updatedOrder) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          first_name: updatedOrder.firstName,
          last_name: updatedOrder.lastName,
          email: updatedOrder.email,
          phone_number: updatedOrder.phoneNumber,
          street_address: updatedOrder.streetAddress,
          city: updatedOrder.city,
          state: updatedOrder.state,
          postal_code: updatedOrder.postalCode,
          country: updatedOrder.country,
          product: updatedOrder.product,
          quantity: updatedOrder.quantity,
          unit_price: updatedOrder.unitPrice,
          status: updatedOrder.status,
          updated_at: new Date()
        })
        .eq('id', id);

      if (error) throw error;
      
      await get().fetchOrders();
      await get().fetchAnalytics();
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  },

  deleteOrder: async (id) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await get().fetchOrders();
      await get().fetchAnalytics();
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  },

  // ─── Analytics (Aggregated in client from fetched orders) ──────────
  fetchAnalytics: async () => {
    const orders = get().orders;
    if (orders.length === 0) {
      // If no orders in state, try to fetch them first
       await get().fetchOrders();
    }
    
    const currentOrders = get().orders;
    
    // Calculate totals
    const totalOrders = currentOrders.length;
    const totalRevenue = currentOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

    // Group by Product
    const productMap = {};
    currentOrders.forEach(o => {
      if (!productMap[o.product]) {
        productMap[o.product] = { _id: o.product, count: 0, totalRevenue: 0 };
      }
      productMap[o.product].count += 1;
      productMap[o.product].totalRevenue += (Number(o.totalAmount) || 0);
    });
    const ordersByProduct = Object.values(productMap).sort((a, b) => b.count - a.count);

    // Group by Status
    const statusMap = {};
    currentOrders.forEach(o => {
      const status = o.status || 'Pending';
      if (!statusMap[status]) {
        statusMap[status] = { _id: status, count: 0 };
      }
      statusMap[status].count += 1;
    });
    const ordersByStatus = Object.values(statusMap);

    set({ analytics: { totalOrders, totalRevenue, ordersByProduct, ordersByStatus } });
  },

  // ─── Dashboard Widget Actions ────────────────────────
  setEditingDashboard: (isEditing) => set({ isEditingDashboard: isEditing }),

  addWidget: (widgetType) => set((state) => {
    const id = uuidv4();
    const newWidget = {
      i: id,
      type: widgetType,
      x: (state.widgets.length * 4) % 12,
      y: Infinity,
      w: widgetType === 'kpi' ? 3 : widgetType === 'table' ? 12 : 6,
      h: widgetType === 'kpi' ? 5 : widgetType === 'table' ? 6 : 8,
      minW: widgetType === 'kpi' ? 2 : 4,
      minH: widgetType === 'kpi' ? 3 : 6,
    };
    const updated = [...state.widgets, newWidget];
    localStorage.setItem('halleyx_widgets', JSON.stringify(updated));
    return { widgets: updated };
  }),

  updateWidgetsLayout: (layout) => set((state) => {
    const newWidgets = state.widgets.map(w => {
      const l = layout.find(item => item.i === w.i);
      return l ? { ...w, ...l } : w;
    });
    localStorage.setItem('halleyx_widgets', JSON.stringify(newWidgets));
    return { widgets: newWidgets };
  }),

  removeWidget: (id) => set((state) => {
    const updated = state.widgets.filter((w) => w.i !== id);
    localStorage.setItem('halleyx_widgets', JSON.stringify(updated));
    return { widgets: updated };
  }),

  // ─── Load Sample Data (simplified) ────────────────────
  loadDummyData: async () => {
    const sampleOrders = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '555-0101', streetAddress: '123 Main St', city: 'New York', state: 'NY', postalCode: '10001', country: 'USA', product: 'Laptop Pro', quantity: 1, unitPrice: 1200, status: 'Completed' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '555-0102', streetAddress: '456 Oak Ave', city: 'Los Angeles', state: 'CA', postalCode: '90001', country: 'USA', product: 'Wireless Mouse', quantity: 2, unitPrice: 25, status: 'In progress' },
      { firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com', phoneNumber: '555-0103', streetAddress: '789 Pine Rd', city: 'Chicago', state: 'IL', postalCode: '60601', country: 'USA', product: 'Mechanical Keyboard', quantity: 1, unitPrice: 150, status: 'Completed' },
      { firstName: 'Alice', lastName: 'Williams', email: 'alice@example.com', phoneNumber: '555-0104', streetAddress: '321 Elm Dr', city: 'Houston', state: 'TX', postalCode: '77001', country: 'USA', product: '27" Monitor', quantity: 2, unitPrice: 300, status: 'Pending' },
      { firstName: 'Tom', lastName: 'Brown', email: 'tom@example.com', phoneNumber: '555-0105', streetAddress: '654 Maple Ln', city: 'Phoenix', state: 'AZ', postalCode: '85001', country: 'USA', product: 'USB-C Hub', quantity: 3, unitPrice: 40, status: 'Pending' },
    ];
    
    for (const order of sampleOrders) {
      await get().addOrder(order);
    }
    
    const defaultWidgets = [
      { i: 'w1', type: 'kpi', x: 0, y: 0, w: 4, h: 5, minW: 2, minH: 3 },
      { i: 'w2', type: 'kpi', x: 4, y: 0, w: 4, h: 5, minW: 2, minH: 3 },
      { i: 'w3', type: 'kpi', x: 8, y: 0, w: 4, h: 5, minW: 2, minH: 3 },
      { i: 'w4', type: 'barChart', x: 0, y: 5, w: 6, h: 8, minW: 4, minH: 6 },
      { i: 'w5', type: 'pieChart', x: 6, y: 5, w: 6, h: 8, minW: 4, minH: 6 },
      { i: 'w6', type: 'table', x: 0, y: 13, w: 12, h: 8, minW: 4, minH: 6 }
    ];
    set({ widgets: defaultWidgets });
    localStorage.setItem('halleyx_widgets', JSON.stringify(defaultWidgets));
    get().fetchAnalytics();
  }
}));

// Initialize auth listener
supabase.auth.onAuthStateChange((event, session) => {
  useStore.getState().setUser(session?.user || null);
  if (session?.user) {
    useStore.getState().fetchOrders();
    useStore.getState().fetchAnalytics();
  }
});
