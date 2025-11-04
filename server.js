/*
Simple Express server to create orders and simulate payment gateway integration.
- Replace or implement real payment gateway SDK calls (Midtrans / Xendit / DOKU) where indicated.
- Set environment variables for real deployment:
  - PAYMENT_KEY (example: MIDTRANS_SERVER_KEY)
  - PAYMENT_CLIENT_KEY
  - HOST (public host for redirect/webhook)
This server demonstrates:
- POST /api/create-order  -> create order, return payment_url or va number
- GET  /api/orders        -> list orders (admin)
- POST /api/admin/settle  -> admin confirms order (delivers to user)
- POST /api/webhook       -> payment gateway webhook to mark order paid
Data storage: simple JSON file (orders.json) for demo. NOT for production.
*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // serve frontend files

const ORDERS_FILE = path.join(__dirname, 'orders.json');

function loadOrders(){
  if(!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(ORDERS_FILE));
}
function saveOrders(orders){ fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2)); }

// helper: generate order id
function genId(){ return 'ORD'+Date.now().toString(36)+Math.random().toString(36).slice(2,6).toUpperCase(); }

// Create Order - in production call payment gateway SDK here
app.post('/api/create-order', (req,res) => {
  const { phone, items, total, payment_method } = req.body;
  if(!phone || !items || !total) return res.json({ success:false, message:'Missing fields' });
  const order_id = genId();
  const order = { order_id, created_at: new Date().toISOString(), phone, items, total, payment_method, status:'pending' };

  // === Payment gateway integration point ===
  // Example: call Midtrans Snap API or Xendit to create a payment page/VA and return payment_url or virtual_account
  // For demo we'll simulate two flows:
  // - if payment_method starts with 'midtrans' -> return a fake payment_url (simulate redirect to e-wallet)
  // - if payment_method == 'manual_bank' -> return a fake virtual account number

  if(payment_method && payment_method.startsWith('midtrans')){
    order.gateway = 'midtrans';
    order.payment_url = 'https://simulated-payment.example.com/pay/'+order_id; // replace with real snap redirect URL
  } else if(payment_method === 'manual_bank'){
    order.gateway = 'bank_va';
    order.virtual_account = '777'+Math.floor(Math.random()*900000+100000);
  }

  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);

  // respond with payment info
  res.json({ success:true, order_id, payment_url: order.payment_url, virtual_account: order.virtual_account });
});

// List orders (admin)
app.get('/api/orders', (req,res) => {
  const orders = loadOrders();
  res.json({ success:true, orders });
});

// Admin settle: mark as paid and deliver topup automatically
app.post('/api/admin/settle', (req,res) => {
  const { order_id } = req.body;
  if(!order_id) return res.json({ success:false, message:'Missing order_id' });
  const orders = loadOrders();
  const o = orders.find(x=>x.order_id === order_id);
  if(!o) return res.json({ success:false, message:'Order not found' });
  if(o.status === 'paid' || o.status === 'settled') return res.json({ success:false, message:'Order already settled' });

  // simulate delivering topup to user's game account: in real system call the game's topup API / reseller API
  o.status = 'settled';
  o.settled_at = new Date().toISOString();
  o.delivery = { success:true, note:'Topup dikirim ke '+o.phone };
  saveOrders(orders);

  res.json({ success:true, order: o });
});

// Payment gateway webhook (simulate gateway calling this when payment completed)
app.post('/api/webhook', (req,res) => {
  // In real gateway, verify signature/header here
  const { order_id, status } = req.body;
  if(!order_id) return res.json({ success:false, message:'Missing order_id' });
  const orders = loadOrders();
  const o = orders.find(x=>x.order_id === order_id);
  if(!o) return res.json({ success:false, message:'Order not found' });
  if(status === 'paid'){
    o.status = 'paid';
    o.paid_at = new Date().toISOString();
    // Optionally auto-settle if you want auto-delivery after payment
    // o.status = 'settled'; o.settled_at = new Date().toISOString();
    saveOrders(orders);
    return res.json({ success:true });
  }
  res.json({ success:false, message:'Unsupported status' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on port', PORT));