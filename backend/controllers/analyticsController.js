const supabase = require('../config/supabase');

// @desc    Get dashboard analytics
// @route   GET /api/analytics
exports.getAnalytics = async (req, res) => {
  try {
    // 1. Total Orders
    const { count: totalOrders, error: countErr } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (countErr) throw countErr;

    // 2. Fetch all for aggregation (or use Supabase SQL functions/views for better scale)
    const { data: orders, error: fetchErr } = await supabase
      .from('orders')
      .select('product, total_amount, status');

    if (fetchErr) throw fetchErr;

    // Calculate totals manually for the demo (normally done via Postgres aggregate)
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

    // Group by Product
    const productMap = {};
    orders.forEach(o => {
      if (!productMap[o.product]) {
        productMap[o.product] = { _id: o.product, count: 0, totalRevenue: 0 };
      }
      productMap[o.product].count += 1;
      productMap[o.product].totalRevenue += (Number(o.total_amount) || 0);
    });
    const ordersByProduct = Object.values(productMap).sort((a, b) => b.count - a.count);

    // Group by Status
    const statusMap = {};
    orders.forEach(o => {
      if (!statusMap[o.status]) {
        statusMap[o.status] = { _id: o.status, count: 0 };
      }
      statusMap[o.status].count += 1;
    });
    const ordersByStatus = Object.values(statusMap);

    res.status(200).json({
      totalOrders,
      totalRevenue,
      ordersByProduct,
      ordersByStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
