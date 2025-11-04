
const gameList = document.getElementById('game-list');
const cartItems = document.getElementById('cart-items');
const totalSpan = document.getElementById('total');
const gameFilter = document.getElementById('game-filter');
const payNowBtn = document.getElementById('pay-now');
const paymentMethod = document.getElementById('payment-method');
const paymentResult = document.getElementById('payment-result');
const phoneInput = document.getElementById('phone');

let cart = [];

games.forEach(game => {
  const option = document.createElement('option');
  option.value = game.id;
  option.textContent = game.name;
  gameFilter.appendChild(option);
});

function renderGames(filter="all") {
  gameList.innerHTML = '';
  games.forEach(game => {
    if(filter !== "all" && game.id != filter) return;
    game.packages.forEach(pkg => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h4>${game.name}</h4><p>${pkg.name}</p><p>Rp${pkg.price}</p><button onclick="addToCart(${pkg.id}, ${game.id})">Tambah</button>`;
      gameList.appendChild(card);
    });
  });
}

gameFilter.addEventListener('change', () => renderGames(gameFilter.value));

function addToCart(pkgId, gameId) {
  const game = games.find(g => g.id == gameId);
  const pkg = game.packages.find(p => p.id == pkgId);
  cart.push({ ...pkg, gameName: game.name });
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.gameName} - ${item.name} - Rp${item.price}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Hapus';
    removeBtn.onclick = () => { cart.splice(index,1); renderCart(); }
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price;
  });
  totalSpan.textContent = total;
}

payNowBtn.addEventListener('click', async () => {
  if(cart.length === 0){ alert('Keranjang kosong!'); return; }
  if(!phoneInput.value){ alert('Masukkan nomor/ID tujuan topup'); return; }
  const payload = {
    phone: phoneInput.value,
    items: cart,
    total: cart.reduce((a,b)=>a+b.price,0),
    payment_method: paymentMethod.value
  };
  paymentResult.innerHTML = 'Membuat order...';
  try{
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(data.success){
      if(data.payment_url){
        paymentResult.innerHTML = `<p>Silakan selesaikan pembayaran: <a href="${data.payment_url}" target="_blank">Buka Halaman Pembayaran</a></p><p>Order ID: ${data.order_id}</p>`;
      } else if(data.virtual_account){
        paymentResult.innerHTML = `<p>Transfer ke Virtual Account: <b>${data.virtual_account}</b></p><p>Order ID: ${data.order_id}</p>`;
      } else {
        paymentResult.innerHTML = `<p>Order dibuat. Order ID: ${data.order_id}. Menunggu konfirmasi.</p>`;
      }
      // simpan sementara ke localStorage agar admin.html bisa tampil cepat
      let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.push({ order_id: data.order_id, date: new Date().toLocaleString(), items: payload.items, total: payload.total, payment: payload.payment_method, status: 'pending', phone: payload.phone });
      localStorage.setItem('transactions', JSON.stringify(transactions));
      cart = []; renderCart();
    } else {
      paymentResult.innerHTML = `<p>Gagal: ${data.message}</p>`;
    }
  }catch(err){
    console.error(err);
    paymentResult.innerHTML = '<p>Terjadi error saat membuat order.</p>';
  }
});

renderGames();
