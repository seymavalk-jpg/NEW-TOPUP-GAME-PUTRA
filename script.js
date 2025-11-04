const gameList = document.getElementById('game-list');
const cartItems = document.getElementById('cart-items');
const totalSpan = document.getElementById('total');
const gameFilter = document.getElementById('game-filter');
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
document.getElementById('checkout').onclick = () => {
  if(cart.length === 0){ alert('Keranjang kosong!'); return; }
  let transactions = JSON.parse(localStorage.getItem('transactions'));
  transactions.push({ date: new Date().toLocaleString(), items: cart, total: cart.reduce((a,b)=>a+b.price,0) });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  alert(`Checkout berhasil. Total: Rp${totalSpan.textContent}`);
  cart = [];
  renderCart();
}
renderGames();
