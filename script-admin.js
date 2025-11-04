
const adminGameList = document.getElementById('admin-game-list');
const adminOrders = document.getElementById('admin-orders');

// render games list
games.forEach(game => {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${game.name}</h3>`;
  game.packages.forEach(pkg => {
    const p = document.createElement('p');
    p.textContent = `${pkg.name} - Rp${pkg.price}`;
    div.appendChild(p);
  });
  adminGameList.appendChild(div);
});

// load transactions (from server) - fallback: localStorage
async function loadOrders(){
  adminOrders.innerHTML = '<p>Memuat orders...</p>';
  try{
    const res = await fetch('/api/orders');
    const data = await res.json();
    if(data.success){
      renderOrders(data.orders);
    }else{
      adminOrders.innerHTML = '<p>Tidak ada orders.</p>';
    }
  }catch(e){
    // fallback to localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    renderOrders(transactions.map(t=>({...t, order_id: t.order_id || ('local-'+Math.random().toString(36).slice(2,9))})));
  }
}

function renderOrders(orders){
  adminOrders.innerHTML = '';
  if(orders.length === 0) adminOrders.innerHTML = '<p>Tidak ada orders.</p>';
  orders.forEach(order => {
    const div = document.createElement('div');
    div.style.border = '1px solid #333'; div.style.padding='8px'; div.style.marginBottom='8px';
    div.innerHTML = `<p><b>Order ID:</b> ${order.order_id}</p>
      <p><b>Waktu:</b> ${order.date || order.created_at}</p>
      <p><b>Tujuan:</b> ${order.phone || order.destination}</p>
      <p><b>Total:</b> Rp${order.total}</p>
      <p><b>Metode:</b> ${order.payment || order.payment_method}</p>
      <p><b>Status:</b> ${order.status || order.payment_status || 'pending'}</p>
      <p><b>Items:</b> ${order.items.map(i=>i.name).join(', ')}</p>
      <button onclick="settleOrder('${order.order_id}')">Tarik / Konfirmasi & Deliver</button>`;
    adminOrders.appendChild(div);
  });
}

async function settleOrder(order_id){
  if(!confirm('Konfirmasi pembayaran dan kirim paket ke user?')) return;
  try{
    const res = await fetch('/api/admin/settle', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ order_id })
    });
    const data = await res.json();
    if(data.success){
      alert('Order settled: paket dikirim ke user.');
      loadOrders();
    }else alert('Gagal settle: '+data.message);
  }catch(e){
    alert('Error when settling order');
  }
}

loadOrders();
