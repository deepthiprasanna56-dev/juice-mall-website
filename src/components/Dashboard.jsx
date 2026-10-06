/* eslint-disable react-refresh/only-export-components */
import { useState, useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, ArrowUpRight, ArrowDownRight, Boxes, DollarSign, ClipboardList, UsersRound, ChartNoAxesCombined, TrendingUp } from 'lucide-react';

/* ─── Data ─── */
const PERIODS = {
  '7 days':  { revenue: '$84,250',  orders: '1,248', customers: '986',   change: '+12.8%', positive: true, sales: [
    { name: 'Mon', sales: 36 }, { name: 'Tue', sales: 52 }, { name: 'Wed', sales: 44 },
    { name: 'Thu', sales: 68 }, { name: 'Fri', sales: 58 }, { name: 'Sat', sales: 83 }, { name: 'Sun', sales: 76 },
  ]},
  '30 days': { revenue: '$342,800', orders: '5,164', customers: '3,842', change: '+9.4%',  positive: true, sales: [
    { name: 'W1', sales: 42 }, { name: 'W2', sales: 54 }, { name: 'W3', sales: 48 },
    { name: 'W4', sales: 70 }, { name: 'W5', sales: 63 }, { name: 'W6', sales: 88 },
  ]},
  '90 days': { revenue: '$976,450', orders: '15,308', customers: '10,427', change: '+16.2%', positive: true, sales: [
    { name: 'Jul', sales: 31 }, { name: 'Aug', sales: 45 }, { name: 'Sep', sales: 42 },
    { name: 'Oct', sales: 64 }, { name: 'Nov', sales: 73 }, { name: 'Dec', sales: 91 },
  ]},
};

const POPULAR = [
  { name: 'Sunburst Citrus Glow',    detail: 'Valencia orange · grapefruit', sold: 428, pct: 88, color: '#e78a3e' },
  { name: 'Golden Mango Sunrise',    detail: 'Alphonso · passionfruit',       sold: 362, pct: 74, color: '#d6aa38' },
  { name: 'Berry Blast Antioxidant', detail: 'Blueberry · pomegranate',       sold: 291, pct: 61, color: '#9a70ad' },
  { name: 'Emerald Green Detox',     detail: 'Spinach · cucumber · apple',    sold: 218, pct: 46, color: '#34d399' },
];

const PIE_DATA = [
  { name: 'Citrus',   value: 38, color: '#e78a3e' },
  { name: 'Tropical', value: 26, color: '#d6aa38' },
  { name: 'Berry',    value: 20, color: '#9a70ad' },
  { name: 'Green',    value: 16, color: '#34d399' },
];

const INVENTORY = [
  { name: 'Valencia oranges',    unit: 'Fresh fruit · kg',      qty: 84,  pct: 82 },
  { name: 'Alphonso mangoes',    unit: 'Fresh fruit · kg',      qty: 21,  pct: 28 },
  { name: 'Glass bottles 450ml', unit: 'Packaging · units',     qty: 214, pct: 64 },
  { name: 'Young coconut water', unit: 'Cold storage · L',      qty: 12,  pct: 22 },
];

/* ─── Metric card ─── */
function MetricCard({ icon: Icon, label, value, change, positive, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-400">
          <Icon size={14} /> {label}
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-bold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}
        >
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
      </div>
      <p className="text-3xl font-black text-white" style={{ fontFamily: "'Cinzel', serif" }}>{value}</p>
      <p className="text-xs text-stone-500">vs. previous period</p>
    </motion.div>
  );
}

/* ─── Custom tooltip for recharts ─── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs font-bold" style={{ background: 'rgba(13,13,18,0.95)', border: '1px solid rgba(212,175,55,0.3)', color: '#F59E0B' }}>
      <p>{label}</p>
      <p className="text-white">${payload[0].value}k</p>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function Dashboard() {
  const [period, setPeriod] = useState('7 days');
  const report = PERIODS[period];

  return (
    <section id="dashboard" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #07090E 0%, #0a0f1a 100%)' }}>
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] rounded-full blur-3xl opacity-[0.06]" style={{ background: '#D4AF37' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">
              <Activity size={12} /> The Juice Mall · Operations
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              At a Glance
            </h2>
            <p className="text-stone-400 mt-2">Store performance & orchard stock</p>
          </motion.div>
          <div className="flex items-center gap-2 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {Object.keys(PERIODS).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPeriod(opt)}
                className="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={period === opt ? { background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)', color: '#0d0d12' } : { color: '#78716c' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-stone-600 mb-8 border border-stone-800 rounded-xl px-4 py-2.5 w-fit">
          📊 Sample dashboard preview · Metrics are illustrative, not live sales data.
        </p>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard icon={DollarSign}    label="Revenue"       value={report.revenue}   change={report.change} positive delay={0} />
          <MetricCard icon={ClipboardList} label="Orders"        value={report.orders}    change="+8.6%"         positive delay={0.08} />
          <MetricCard icon={UsersRound}    label="Customers"     value={report.customers} change="+6.3%"         positive delay={0.16} />
          <MetricCard icon={Boxes}         label="Stock Alerts"  value="02 items"         change="Reorder soon"  positive={false} delay={0.24} />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Sales area chart — spans 2/3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl p-5 sm:p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-1">Sales Overview</p>
                <h3 className="text-xl font-black text-white">Revenue Trend</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <TrendingUp size={14} /> Gross sales
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={report.sales} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#78716c', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#78716c', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2.5} fill="url(#salesGrad)" dot={{ fill: '#D4AF37', r: 4 }} activeDot={{ r: 6, fill: '#F59E0B' }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart — 1/3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-5 sm:p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-1">Category Mix</p>
            <h3 className="text-xl font-black text-white mb-4">Sales Split</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val}%`, 'Share']} contentStyle={{ background: 'rgba(13,13,18,0.95)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 12, fontSize: 12, color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {PIE_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-stone-400">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  {d.name} <span className="text-white font-bold ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Popular + Inventory */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top performers */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-5 sm:p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-1">Top Performers</p>
                <h3 className="text-xl font-black text-white">Popular Pours</h3>
              </div>
              <ChartNoAxesCombined size={18} className="text-[#D4AF37]" />
            </div>
            <div className="space-y-5">
              {POPULAR.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-2xl font-black tabular-nums" style={{ color: item.color, fontFamily: "'Cinzel', serif" }}>0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    <p className="text-xs text-stone-500 truncate">{item.detail}</p>
                    <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </div>
                  <span className="text-right shrink-0">
                    <span className="text-base font-black text-white tabular-nums">{item.sold}</span>
                    <span className="text-[10px] text-stone-500 block">sold</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-5 sm:p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-1">Fresh Bar · Live Stock</p>
                <h3 className="text-xl font-black text-white">Inventory</h3>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                2 need attention
              </span>
            </div>
            <div className="space-y-5">
              {INVENTORY.map((item) => {
                const low = item.pct < 30;
                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1.5">
                        <p className="text-sm font-bold text-white truncate">{item.name}</p>
                        <span className={`text-xs font-bold ml-3 shrink-0 ${low ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {low ? 'Reorder soon' : 'In stock'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mb-2">{item.unit}</p>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9 }}
                          className="h-full rounded-full"
                          style={{ background: low ? '#f43f5e' : '#10b981' }}
                        />
                      </div>
                    </div>
                    <span className="text-right shrink-0">
                      <span className={`text-base font-black tabular-nums ${low ? 'text-rose-400' : 'text-white'}`}>{item.qty}</span>
                      <span className="text-[10px] text-stone-500 block">on hand</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
