// EDIT PRODUCTS HERE: Change title and price when you are ready. Leave price empty to show "Price on request".
const products = [
  { id: 'SR-001', title: 'Obsidian Crest Ring', price: '', image: 'black-stone-silver-ring.png', alt: 'Square black stone silver ring' },
  { id: 'SR-002', title: 'Turquoise Halo Ring', price: '', image: 'turquoise-silver-ring.png', alt: 'Turquoise stone silver ring' },
  { id: 'SR-003', title: 'Midnight Trio Ring', price: '', image: 'trio-stone-silver-ring.png', alt: 'Three stone silver ring' },
  { id: 'SR-004', title: 'Carnelian Signet Ring', price: '', image: 'carnelian-silver-ring.png', alt: 'Red carnelian silver ring' },
  { id: 'SR-005', title: 'Amber Filigree Ring', price: '', image: 'amber-silver-ring.png', alt: 'Amber stone silver ring' },
  { id: 'SR-006', title: 'Garnet Mosaic Ring', price: '', image: 'garnet-silver-ring.png', alt: 'Garnet stone silver ring' }
];
let cart = JSON.parse(localStorage.getItem('sitara-cart') || '[]');
const grid = document.querySelector('#product-grid');
const cartEl = document.querySelector('#cart');
const overlay = document.querySelector('#overlay');
const formatPrice = price => price ? `PKR ${Number(price).toLocaleString('en-PK')}` : 'Price on request';
function renderProducts(){grid.innerHTML=products.map(p=>`<article class="product"><div class="product-image"><img src="images/${p.image}" alt="${p.alt}"></div><div class="product-info"><div><h3>${p.title}</h3><p>${formatPrice(p.price)}</p></div><button class="add" data-id="${p.id}">Add to bag</button></div></article>`).join('');}
function renderCart(){document.querySelector('#cart-count').textContent=cart.length;const container=document.querySelector('#cart-items');if(!cart.length){container.innerHTML='<p class="empty">Your bag is waiting for a beautiful piece.</p>';return;}container.innerHTML=cart.map((item,index)=>`<div class="cart-line"><img src="images/${item.image}" alt=""><div><h3>${item.title}</h3><p>${formatPrice(item.price)} · ${item.id}</p><button class="remove" data-index="${index}">Remove</button></div></div>`).join('');localStorage.setItem('sitara-cart',JSON.stringify(cart));}
function openCart(){cartEl.classList.add('open');overlay.classList.add('show');cartEl.setAttribute('aria-hidden','false')}function closeCart(){cartEl.classList.remove('open');overlay.classList.remove('show');cartEl.setAttribute('aria-hidden','true')}
grid.addEventListener('click',e=>{const id=e.target.dataset.id;if(!id)return;cart.push(products.find(p=>p.id===id));renderCart();openCart();});
document.querySelector('#cart-items').addEventListener('click',e=>{if(e.target.classList.contains('remove')){cart.splice(e.target.dataset.index,1);renderCart();}});
document.querySelector('#open-cart').onclick=openCart;document.querySelector('#close-cart').onclick=closeCart;overlay.onclick=closeCart;
document.querySelector('#checkout-button').onclick=()=>{if(!cart.length)return alert('Please add a piece to your bag first.');const name=document.querySelector('#customer-name').value.trim()||'Not provided';const city=document.querySelector('#customer-city').value.trim()||'Not provided';const items=cart.map((p,i)=>`${i+1}. ${p.title} (${p.id}) — ${formatPrice(p.price)}`).join('\n');const message=`Hello Sitara Emporium, I would like to place an order.%0A%0AName: ${encodeURIComponent(name)}%0ACity: ${encodeURIComponent(city)}%0A%0AItems:%0A${encodeURIComponent(items)}%0A%0APlease confirm availability, size and total.`;window.open(`https://wa.me/923301339004?text=${message}`,'_blank');};
renderProducts();renderCart();
