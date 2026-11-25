import { AtelierData, WorldHatsAtlasData } from '../data/atelierData.js';
import { HatSVGBuilder } from './svgBuilder.js';

export const WorldAtlasController = {
  currentIndex: 0,

  init() {
    const pillsBox = document.getElementById('atlas-dest-pills');
    const routesLayer = document.getElementById('atlas-routes-layer');
    const pinsLayer = document.getElementById('atlas-pins-layer');
    if (!pillsBox || !routesLayer || !pinsLayer) return;

    pillsBox.innerHTML = WorldHatsAtlasData.destinations.map((dest, idx) => `<button type="button" data-idx="${idx}" class="atlas-pill-btn px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${idx === 0 ? 'bg-hat-gold text-hat-indigo border-hat-gold font-bold shadow-gold-glow' : 'bg-hat-indigo/85 text-hat-cream/85 border-hat-gold/25 hover:border-hat-gold'}">${dest.flag} ${dest.shortName}</button>`).join('');
    pillsBox.querySelectorAll('.atlas-pill-btn').forEach(btn => btn.addEventListener('click', () => this.selectDestination(parseInt(btn.dataset.idx, 10))));

    pinsLayer.innerHTML = WorldHatsAtlasData.destinations.map((dest, idx) => `<g class="cursor-pointer" onclick="WorldAtlasController.selectDestination(${idx})"><circle id="pin-pulse-${idx}" cx="${dest.coords.x}" cy="${dest.coords.y}" r="9" fill="none" stroke="#F3D08A" stroke-width="2" class="${idx === 0 ? 'pin-pulse' : 'hidden'}"/><circle id="pin-dot-${idx}" cx="${dest.coords.x}" cy="${dest.coords.y}" r="${idx === 0 ? 7 : 5}" fill="${idx === 0 ? '#F3D08A' : '#D4A359'}" stroke="#120D1D" stroke-width="2"/><text x="${dest.coords.x}" y="${dest.coords.y - 11}" text-anchor="middle" fill="#FAF6F0" font-size="10" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif">${dest.shortName}</text></g>`).join('');
    document.getElementById('atlas-next-flight-btn')?.addEventListener('click', () => this.selectDestination((this.currentIndex + 1) % WorldHatsAtlasData.destinations.length));
    document.getElementById('atlas-calculate-btn')?.addEventListener('click', () => {
      const dest = WorldHatsAtlasData.destinations[this.currentIndex];
      window.PriceCalculatorEngine?.applyPreset(dest.calcPreset);
      document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
      window.UIHelpers?.showToast(`Modelo "${dest.hatName}" carregado na Calculadora!`);
    });
    this.selectDestination(0);
  },

  selectDestination(index) {
    if (!Number.isInteger(index) || index < 0 || index >= WorldHatsAtlasData.destinations.length) return;
    this.currentIndex = index;
    const dest = WorldHatsAtlasData.destinations[index];
    const hub = { x: 282, y: 292 };

    document.querySelectorAll('.atlas-pill-btn').forEach((btn, i) => {
      btn.className = i === index
        ? 'atlas-pill-btn px-3.5 py-2 rounded-full text-xs border transition-all bg-hat-gold text-hat-indigo border-hat-gold font-bold shadow-gold-glow'
        : 'atlas-pill-btn px-3.5 py-2 rounded-full text-xs font-semibold border transition-all bg-hat-indigo/85 text-hat-cream/85 border-hat-gold/25 hover:border-hat-gold';
    });

    WorldHatsAtlasData.destinations.forEach((_, i) => {
      const pulse = document.getElementById(`pin-pulse-${i}`);
      const dot = document.getElementById(`pin-dot-${i}`);
      if (pulse) { pulse.classList.toggle('hidden', i !== index); pulse.classList.toggle('pin-pulse', i === index); }
      if (dot) { dot.setAttribute('r', i === index ? '7.5' : '5'); dot.setAttribute('fill', i === index ? '#F3D08A' : '#D4A359'); }
    });

    const routesLayer = document.getElementById('atlas-routes-layer');
    if (routesLayer) {
      if (dest.id === 'brasil') {
        routesLayer.innerHTML = `<circle cx="${hub.x}" cy="${hub.y}" r="26" fill="none" stroke="#F3D08A" stroke-width="2" class="flight-route-active"/>`;
      } else {
        const midX = (hub.x + dest.coords.x) / 2;
        const midY = Math.min(hub.y, dest.coords.y) - 65;
        routesLayer.innerHTML = `<path d="M ${hub.x} ${hub.y} Q ${midX} ${midY} ${dest.coords.x} ${dest.coords.y}" fill="none" stroke="rgba(212,163,89,0.28)" stroke-width="2"/><path d="M ${hub.x} ${hub.y} Q ${midX} ${midY} ${dest.coords.x} ${dest.coords.y}" fill="none" stroke="#F3D08A" stroke-width="2.5" class="flight-route-active"/>`;
      }
    }

    document.getElementById('atlas-flight-status')?.replaceChildren(document.createTextNode(`Rota Ativa: Brasil → ${dest.location}`));
    const values = { 'atlas-country-badge': `${dest.flag} ${dest.location}`, 'atlas-century-badge': dest.century, 'atlas-hat-title': dest.hatName, 'atlas-material': dest.material, 'atlas-icon': dest.culturalIcon, 'atlas-history': dest.history };
    Object.entries(values).forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.textContent = value; });
    const box = document.getElementById('atlas-hat-svg-box');
    if (box) box.innerHTML = `<div class="hat-morph-anim w-full max-w-[240px]">${HatSVGBuilder.render(dest.svgModel.model, dest.svgModel.material, dest.svgModel.brim, dest.svgModel.extras, `atlas_${dest.id}`)}</div>`;
  }
};

export const CollectionsController = {
  init() {
    this.render('todos');
    document.querySelectorAll('.collection-filter-btn').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.collection-filter-btn').forEach(b => { b.classList.remove('active', 'bg-hat-gold', 'text-hat-indigo', 'font-bold'); b.classList.add('bg-hat-plum', 'text-hat-cream/85', 'font-semibold'); });
      btn.classList.add('active', 'bg-hat-gold', 'text-hat-indigo', 'font-bold');
      btn.classList.remove('bg-hat-plum', 'text-hat-cream/85', 'font-semibold');
      this.render(btn.dataset.filter);
    }));
  },

  render(category) {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;
    const items = category === 'todos' ? AtelierData.catalog : AtelierData.catalog.filter(item => item.category === category);
    grid.innerHTML = items.map((item, idx) => `<article onclick="ModalController.openCatalogModal('${item.id}')" class="tilt-card group bg-hat-plum/85 border border-hat-gold/25 hover:border-hat-gold rounded-3xl p-6 cursor-pointer shadow-velvet flex flex-col justify-between"><div><div class="flex items-center justify-between gap-2 mb-4"><span class="px-3 py-1 rounded-full bg-hat-indigo text-[11px] font-bold uppercase tracking-wider text-hat-gold border border-hat-gold/25">${item.categoryLabel}</span><span class="font-editorial font-bold text-lg text-hat-goldLight">${item.price}</span></div><div class="h-48 rounded-2xl bg-gradient-to-b from-hat-indigo to-hat-plumLight/40 p-4 flex items-center justify-center"><div class="w-full h-full group-hover:scale-105 transition-transform duration-300">${HatSVGBuilder.render(item.calcPreset.model, item.calcPreset.material, item.calcPreset.brim, item.calcPreset.extras, `col_${category}_${idx}`)}</div></div><h3 class="mt-5 font-editorial font-bold text-2xl text-hat-cream group-hover:text-hat-goldLight transition-colors">${item.name}</h3><p class="mt-2 text-sm text-hat-cream/75 leading-relaxed">${item.description}</p></div><div class="mt-6 pt-4 border-t border-hat-gold/15 flex items-center justify-between"><span class="text-xs text-hat-cream/65">Prazo: <strong class="text-hat-cream">${item.leadTime}</strong></span><span class="text-xs font-bold text-hat-goldLight group-hover:translate-x-1 transition-transform">Inspecionar / Calcular →</span></div></article>`).join('');

    grid.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => { const rect = card.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; card.style.transform = `perspective(900px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) translateY(-4px)`; });
      card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)'; });
    });
  }
};
