import { AtelierData, BrazilMarketData } from './data/atelierData.js';
import { HatSVGBuilder } from './modules/svgBuilder.js';
import { MarqueeController } from './modules/marquee.js';
import { PriceCalculatorEngine } from './modules/calculator.js';
import { WorldAtlasController, CollectionsController } from './modules/worldAtlas.js';

export const HeroParallaxEngine = {
  init() {
    const stage = document.getElementById('hero-parallax-stage');
    const card = document.getElementById('hero-hat-3d');
    if (!stage || !card) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    stage.addEventListener('mousemove', e => {
      const rect = stage.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width * 26 - 13;
      targetY = -((e.clientY - rect.top) / rect.height * 26 - 13);
    });
    stage.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    stage.addEventListener('click', e => {
      const rect = stage.getBoundingClientRect();
      const originX = e.clientX - rect.left;
      const originY = e.clientY - rect.top;
      const symbols = ['✨', '⚙️', '🎩', '10/6', '✦'];
      for (let i = 0; i < 12; i++) {
        const spark = document.createElement('span');
        spark.className = 'magic-spark text-sm font-bold text-hat-goldLight';
        spark.textContent = symbols[i % symbols.length];
        const angle = Math.PI * 2 * i / 12 + Math.random() * 0.4;
        const dist = 70 + Math.random() * 85;
        spark.style.left = `${originX}px`;
        spark.style.top = `${originY}px`;
        spark.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--ty', `${Math.sin(angle) * dist - 25}px`);
        stage.appendChild(spark);
        setTimeout(() => spark.remove(), 980);
      }
    });
    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      card.style.transform = `rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
      requestAnimationFrame(animate);
    };
    animate();
  }
};

export const ConfiguratorEngine = {
  state: { model: 'cartola', material: 'feltro', brim: 9, extras: ['adorno106'] },
  init() {
    this.renderControls();
    this.updateStage();
    document.getElementById('randomize-hat-btn')?.addEventListener('click', () => {
      const pick = arr => arr[Math.floor(Math.random() * arr.length)].id;
      this.state.model = pick(AtelierData.models);
      this.state.material = pick(AtelierData.materials);
      this.state.brim = 6 + Math.floor(Math.random() * 9);
      this.state.extras = ['adorno106', 'fita'];
      this.renderControls();
      this.updateStage();
      UIHelpers.showToast('Prototipagem surpresa criada pelo Chapeleiro Maluco!');
    });
    document.getElementById('atelier-order-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const clientName = document.getElementById('order-name')?.value.trim();
      const headSize = document.getElementById('order-head-size')?.value;
      const notes = document.getElementById('order-notes')?.value.trim();
      if (!clientName) {
        UIHelpers.showToast('Informe o nome para registrar o pedido.');
        document.getElementById('order-name')?.focus();
        return;
      }
      ModalController.openOrderReceipt(clientName, headSize, notes, this.state);
    });
  },
  applyFromCalculator(model, material, brim, extras) {
    this.state = { model, material, brim, extras: [...extras] };
    this.renderControls();
    this.updateStage();
  },
  renderControls() {
    const mBox = document.getElementById('selector-models');
    const fBox = document.getElementById('selector-fabrics');
    if (mBox) mBox.innerHTML = AtelierData.models.slice(0, 4).map(m => `<button type="button" onclick="ConfiguratorEngine.setProp('model', '${m.id}')" class="p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${this.state.model === m.id ? 'bg-hat-plum border-hat-gold text-hat-goldLight' : 'bg-hat-plum/40 border-hat-gold/20 text-hat-cream/80'}">${m.name}</button>`).join('');
    if (fBox) fBox.innerHTML = AtelierData.materials.slice(0, 4).map(f => `<button type="button" onclick="ConfiguratorEngine.setProp('material', '${f.id}')" class="flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${this.state.material === f.id ? 'bg-hat-plum border-hat-gold text-hat-goldLight' : 'bg-hat-plum/40 border-hat-gold/20 text-hat-cream/80'}"><span class="w-4 h-4 rounded-full border border-hat-gold/60 shrink-0" style="background:${f.hex};"></span><span class="truncate">${f.name.split(' ')[0]}</span></button>`).join('');
  },
  setProp(key, val) { this.state[key] = val; this.renderControls(); this.updateStage(); },
  updateStage() {
    const stage = document.getElementById('custom-hat-stage');
    if (stage) stage.innerHTML = `<div class="hat-morph-anim w-full max-w-[240px]">${HatSVGBuilder.render(this.state.model, this.state.material, this.state.brim, this.state.extras, 'bench_live')}</div>`;
  }
};

export const ModalController = {
  init() {
    const modal = document.getElementById('atelier-modal');
    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.close());
    modal?.addEventListener('click', e => { if (e.target === modal) this.close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) this.close(); });
  },
  openCatalogModal(id) {
    const item = AtelierData.catalog.find(c => c.id === id);
    if (!item) return;
    document.getElementById('modal-kicker').textContent = `${item.categoryLabel} • ${item.badge}`;
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-visual-stage').innerHTML = `<div class="w-full max-w-[260px]">${HatSVGBuilder.render(item.calcPreset.model, item.calcPreset.material, item.calcPreset.brim, item.calcPreset.extras, 'modal_cat')}</div>`;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-specs-grid').innerHTML = `<div><span class="text-[10px] uppercase text-hat-cream/60 block">Matéria-Prima</span><strong class="text-xs sm:text-sm text-hat-cream">${item.material}</strong></div><div><span class="text-[10px] uppercase text-hat-cream/60 block">Confecção</span><strong class="text-xs sm:text-sm text-hat-cream">${item.leadTime}</strong></div><div><span class="text-[10px] uppercase text-hat-cream/60 block">Referência</span><strong class="text-xs sm:text-sm text-hat-goldLight">${item.price}</strong></div>`;
    document.getElementById('modal-footer-note').textContent = 'Deseja personalizar aba, material ou quantidade?';
    const btn = document.getElementById('modal-primary-action');
    btn.textContent = 'Simular na Calculadora de Preços';
    btn.onclick = () => { PriceCalculatorEngine.applyPreset(item.calcPreset); this.close(); document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' }); UIHelpers.showToast(`"${item.name}" carregado na Calculadora!`); };
    this.show();
  },
  openOrderReceipt(clientName, headSize, notes, benchState) {
    const code = `CM-10/6-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('modal-kicker').textContent = `Certificado Oficial • Protocolo ${code}`;
    document.getElementById('modal-title').textContent = `Pedido Registrado para ${clientName}!`;
    document.getElementById('modal-visual-stage').innerHTML = `<div class="w-full max-w-[240px]">${HatSVGBuilder.render(benchState.model, benchState.material, benchState.brim, benchState.extras, 'modal_receipt')}</div>`;
    document.getElementById('modal-description').textContent = notes || 'Pedido sem observações.';
    document.getElementById('modal-specs-grid').innerHTML = `<div><span class="text-[10px] uppercase text-hat-cream/60 block">Protocolo</span><strong class="text-xs sm:text-sm text-hat-goldLight">${code}</strong></div><div><span class="text-[10px] uppercase text-hat-cream/60 block">Medida</span><strong class="text-xs sm:text-sm text-hat-cream">${headSize}</strong></div><div><span class="text-[10px] uppercase text-hat-cream/60 block">Status</span><strong class="text-xs sm:text-sm text-emerald-400">Reservado na Bancada</strong></div>`;
    document.getElementById('modal-footer-note').textContent = 'Ateliê Chapelaria Maluca • Edição Numerada';
    const btn = document.getElementById('modal-primary-action');
    btn.textContent = `Copiar Protocolo (${code})`;
    btn.onclick = () => { UIHelpers.copyToClipboard(`Chapelaria Maluca | Protocolo ${code} | Cliente: ${clientName} | ${(notes || '').replace(/\n/g, ' ')}`); this.close(); };
    this.show();
  },
  show() { const modal = document.getElementById('atelier-modal'); if (!modal) return; modal.classList.remove('hidden'); modal.classList.add('flex'); },
  close() { const modal = document.getElementById('atelier-modal'); if (!modal) return; modal.classList.add('hidden'); modal.classList.remove('flex'); }
};

export const UIHelpers = {
  init() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const iconHam = document.getElementById('icon-hamburger');
    const iconClose = document.getElementById('icon-close');
    toggleBtn?.addEventListener('click', () => {
      if (!drawer || !iconHam || !iconClose) return;
      const isHidden = drawer.classList.contains('hidden');
      drawer.classList.toggle('hidden', !isHidden);
      iconHam.classList.toggle('hidden', isHidden);
      iconClose.classList.toggle('hidden', !isHidden);
    });
    document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', () => {
      drawer?.classList.add('hidden');
      iconHam?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
    }));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.1 });
      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    }
    document.getElementById('copy-portfolio-sig')?.addEventListener('click', () => this.copyToClipboard('Chapelaria Maluca — Desenvolvido por Victor Matheus (Victor M.) | Engenharia da Computação (FMU)'));
  },
  copyToClipboard(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try { document.execCommand('copy'); this.showToast('Copiado para a área de transferência!'); }
    catch { this.showToast('Não foi possível copiar automaticamente.'); }
    finally { document.body.removeChild(tempInput); }
  },
  showToast(message) {
    const toast = document.getElementById('atelier-toast');
    const msgEl = document.getElementById('atelier-toast-msg');
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { toast.classList.add('hidden'); toast.classList.remove('flex'); }, 2800);
  }
};

export const BrazilMarketController = {
  init() {
    BrazilMarketData.init();
  }
};

window.HeroParallaxEngine = HeroParallaxEngine;
window.ConfiguratorEngine = ConfiguratorEngine;
window.ModalController = ModalController;
window.UIHelpers = UIHelpers;
window.PriceCalculatorEngine = PriceCalculatorEngine;
window.WorldAtlasController = WorldAtlasController;
window.BrazilMarketData = BrazilMarketData;

document.addEventListener('DOMContentLoaded', () => {
  UIHelpers.init();
  HeroParallaxEngine.init();
  MarqueeController.init();
  BrazilMarketData.init();
  PriceCalculatorEngine.init();
  WorldAtlasController.init();
  CollectionsController.init();
  ConfiguratorEngine.init();
  ModalController.init();
});
