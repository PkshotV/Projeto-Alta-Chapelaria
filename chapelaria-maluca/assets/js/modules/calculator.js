import { AtelierData, BrazilMarketData } from '../data/atelierData.js';
import { HatSVGBuilder } from './svgBuilder.js';

export const PriceCalculatorEngine = {
  state: { model: 'cartola', material: 'feltro', brim: 9, extras: ['carneira', 'fita'], region: 'sudeste', qty: 1 },
  lastComputed: null,

  init() {
    const modelSel = document.getElementById('calc-model');
    const matSel = document.getElementById('calc-material');
    const regionSel = document.getElementById('calc-region');
    const brimSlider = document.getElementById('calc-brim');
    const qtyInput = document.getElementById('calc-qty');
    const extrasGrid = document.getElementById('calc-extras-grid');
    if (!modelSel || !matSel || !regionSel || !brimSlider || !qtyInput || !extrasGrid) return;

    modelSel.innerHTML = AtelierData.models.map(m => `<option value="${m.id}">${m.name} (Base R$ ${m.basePrice})</option>`).join('');
    matSel.innerHTML = AtelierData.materials.map(m => `<option value="${m.id}">${m.name} (${m.multiplier}x)</option>`).join('');
    regionSel.innerHTML = AtelierData.regions.map(r => `<option value="${r.id}">${r.name} — R$ ${r.shipping}</option>`).join('');
    extrasGrid.innerHTML = AtelierData.extras.map(ext => `<label class="flex items-center justify-between gap-2 p-3 rounded-2xl bg-hat-indigo/80 border border-hat-gold/20 hover:border-hat-gold/50 cursor-pointer transition-colors"><span class="flex items-center gap-2.5 text-xs sm:text-sm text-hat-cream"><input type="checkbox" value="${ext.id}" class="calc-extra-cb w-4 h-4 accent-[#D4A359] rounded" ${this.state.extras.includes(ext.id) ? 'checked' : ''}/><span>${ext.name}</span></span><span class="text-xs font-bold text-hat-goldLight shrink-0">+ R$ ${ext.price}</span></label>`).join('');

    modelSel.addEventListener('change', e => { this.state.model = e.target.value; const model = AtelierData.models.find(m => m.id === this.state.model); if (model) { this.state.brim = model.defaultBrim; brimSlider.value = model.defaultBrim; } this.recalculate(); });
    matSel.addEventListener('change', e => { this.state.material = e.target.value; this.recalculate(); });
    brimSlider.addEventListener('input', e => { this.state.brim = parseInt(e.target.value, 10); this.recalculate(); });
    extrasGrid.addEventListener('change', () => { this.state.extras = Array.from(extrasGrid.querySelectorAll('.calc-extra-cb:checked')).map(cb => cb.value); this.recalculate(); });
    regionSel.addEventListener('change', e => { this.state.region = e.target.value; this.recalculate(); });
    document.getElementById('qty-minus-btn')?.addEventListener('click', () => { this.state.qty = Math.max(1, this.state.qty - 1); qtyInput.value = this.state.qty; this.recalculate(); });
    document.getElementById('qty-plus-btn')?.addEventListener('click', () => { this.state.qty = Math.min(50, this.state.qty + 1); qtyInput.value = this.state.qty; this.recalculate(); });
    qtyInput.addEventListener('input', e => { const val = parseInt(e.target.value, 10); this.state.qty = Number.isNaN(val) || val < 1 ? 1 : Math.min(50, val); this.recalculate(); });
    document.getElementById('apply-quote-to-order-btn')?.addEventListener('click', () => this.applyToOrderForm());

    this.syncControlsFromState();
    this.recalculate();
  },

  applyPreset(preset) {
    this.state = { model: preset.model || 'cartola', material: preset.material || 'feltro', brim: preset.brim || 9, extras: Array.isArray(preset.extras) ? [...preset.extras] : [], region: preset.region || this.state.region || 'sudeste', qty: preset.qty || 1 };
    this.syncControlsFromState();
    this.recalculate();
  },

  syncControlsFromState() {
    const modelSel = document.getElementById('calc-model');
    const matSel = document.getElementById('calc-material');
    const regionSel = document.getElementById('calc-region');
    const brimSlider = document.getElementById('calc-brim');
    const qtyInput = document.getElementById('calc-qty');
    if (modelSel) modelSel.value = this.state.model;
    if (matSel) matSel.value = this.state.material;
    if (regionSel) regionSel.value = this.state.region;
    if (brimSlider) brimSlider.value = this.state.brim;
    if (qtyInput) qtyInput.value = this.state.qty;
    document.querySelectorAll('.calc-extra-cb').forEach(cb => { cb.checked = this.state.extras.includes(cb.value); });
  },

  formatBRL(val) { return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); },

  recalculate() {
    const model = AtelierData.models.find(m => m.id === this.state.model) || AtelierData.models[0];
    const material = AtelierData.materials.find(m => m.id === this.state.material) || AtelierData.materials[2];
    const region = AtelierData.regions.find(r => r.id === this.state.region) || AtelierData.regions[0];
    const activeExtras = AtelierData.extras.filter(e => this.state.extras.includes(e.id));
    const brimExtraCost = (this.state.brim - 4) * 11;
    const extrasCost = activeExtras.reduce((acc, e) => acc + e.price, 0);
    const unitPrice = Math.round(model.basePrice * material.multiplier + brimExtraCost + extrasCost);
    const discountPct = this.state.qty >= 5 ? 0.15 : (this.state.qty >= 2 ? 0.08 : 0);
    const subtotal = unitPrice * this.state.qty;
    const discountVal = Math.round(subtotal * discountPct);
    const shippingCost = region.shipping + (this.state.qty > 1 ? (this.state.qty - 1) * 9 : 0);
    const total = subtotal - discountVal + shippingCost;
    const pixTotal = total * 0.95;
    const installment6x = total / 6;
    const brimHours = this.state.brim >= 12 ? 2 : (this.state.brim >= 8 ? 1 : 0);
    const totalHours = (model.baseHours + material.extraHours + brimHours + activeExtras.reduce((acc, e) => acc + e.hours, 0)) * this.state.qty;

    const brimLabel = this.state.brim <= 5 ? 'Curta' : (this.state.brim <= 10 ? 'Clássica' : 'Ampla / Gala');
    document.getElementById('calc-brim-badge')?.replaceChildren(document.createTextNode(`${this.state.brim} cm (${brimLabel})`));
    const qtyPill = document.getElementById('calc-discount-pill');
    if (qtyPill) {
      qtyPill.textContent = discountPct > 0 ? `${this.state.qty} un. (${Math.round(discountPct * 100)}% OFF aplicado!)` : '1 un. (Tabela base)';
      qtyPill.className = discountPct > 0 ? 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300' : 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-hat-indigo border border-hat-gold/25 text-hat-cream/75';
    }
    const liveSvg = document.getElementById('calc-live-svg');
    if (liveSvg) liveSvg.innerHTML = HatSVGBuilder.render(model.id, material.id, this.state.brim, this.state.extras, 'calc_live');
    const summaryName = document.getElementById('calc-summary-name'); if (summaryName) summaryName.textContent = model.name;
    const summaryMeta = document.getElementById('calc-summary-meta'); if (summaryMeta) summaryMeta.textContent = `${material.name} • Aba ${this.state.brim} cm • ${activeExtras.length} acabamento(s)`;
    const craftHours = document.getElementById('calc-craft-hours'); if (craftHours) craftHours.textContent = `⏱️ ${totalHours}h estimadas de bancada artesanal`;
    const unit = document.getElementById('calc-unit-price'); if (unit) unit.textContent = this.formatBRL(unitPrice);

    const discRow = document.getElementById('calc-discount-row');
    if (discRow) {
      discRow.classList.toggle('hidden', discountPct === 0);
      discRow.classList.toggle('flex', discountPct > 0);
    }
    const discountPctEl = document.getElementById('calc-discount-pct'); if (discountPctEl) discountPctEl.textContent = `${Math.round(discountPct * 100)}%`;
    const discountValEl = document.getElementById('calc-discount-val'); if (discountValEl) discountValEl.textContent = `- ${this.formatBRL(discountVal)}`;
    const shippingLabel = document.getElementById('calc-shipping-label'); if (shippingLabel) shippingLabel.textContent = `Frete (${region.name.split(' ')[0]} • ${region.eta}):`;
    const shippingVal = document.getElementById('calc-shipping-val'); if (shippingVal) shippingVal.textContent = this.formatBRL(shippingCost);
    const totalEl = document.getElementById('calc-total-price'); if (totalEl) totalEl.textContent = this.formatBRL(total);
    const pixEl = document.getElementById('calc-pix-price'); if (pixEl) pixEl.textContent = this.formatBRL(pixTotal);
    const installments = document.getElementById('calc-installments'); if (installments) installments.textContent = `6x de ${this.formatBRL(installment6x)}`;

    const bench = BrazilMarketData.benchmarks.find(b => b.id === material.benchKey) || BrazilMarketData.benchmarks[2];
    const benchCategory = document.getElementById('calc-bench-category'); if (benchCategory) benchCategory.textContent = `Categoria: ${bench.title}`;
    const benchRange = document.getElementById('calc-bench-range'); if (benchRange) benchRange.innerHTML = `Faixa pesquisada no Brasil: <strong class="text-hat-goldLight">${this.formatBRL(bench.minPrice)} a ${this.formatBRL(bench.maxPrice)}</strong>`;
    const ratio = (unitPrice - bench.minPrice) / Math.max(1, bench.maxPrice - bench.minPrice);
    const marker = document.getElementById('calc-bench-marker'); if (marker) marker.style.left = `${Math.max(8, Math.min(92, Math.round(12 + ratio * 76)))}%`;
    const benchTag = document.getElementById('calc-bench-tag');
    if (benchTag) benchTag.textContent = unitPrice < bench.minPrice ? 'Abaixo da faixa média' : (unitPrice <= bench.maxPrice ? 'Dentro da faixa real BR' : 'Edição Exclusiva Sob Medida');

    this.lastComputed = { model, material, region, activeExtras, brim: this.state.brim, qty: this.state.qty, unitPrice, total, pixTotal, totalHours };
  },

  applyToOrderForm() {
    if (!this.lastComputed) return;
    const c = this.lastComputed;
    const extrasNames = c.activeExtras.length ? c.activeExtras.map(e => e.name).join(', ') : 'Sem acabamentos extras';
    const banner = document.getElementById('imported-quote-banner');
    const totalEl = document.getElementById('imported-quote-total');
    const detailsEl = document.getElementById('imported-quote-details');
    const notesEl = document.getElementById('order-notes');
    if (banner && totalEl && detailsEl && notesEl) {
      banner.classList.remove('hidden');
      totalEl.textContent = `Total: ${this.formatBRL(c.total)} (Pix: ${this.formatBRL(c.pixTotal)})`;
      detailsEl.textContent = `${c.qty}x ${c.model.name} • ${c.material.name} • Aba ${c.brim} cm • Entrega: ${c.region.name}`;
      notesEl.value = `ORÇAMENTO CALCULADO:\n• Modelo: ${c.model.name}\n• Matéria-Prima: ${c.material.name}\n• Largura da Aba: ${c.brim} cm\n• Acabamentos: ${extrasNames}\n• Quantidade: ${c.qty} unidade(s)\n• Região de Entrega: ${c.region.name} (${c.region.eta})\n• Valor Total: ${this.formatBRL(c.total)} (ou ${this.formatBRL(c.pixTotal)} no Pix)`;
    }
    window.ConfiguratorEngine?.applyFromCalculator(c.model.id, c.material.id, c.brim, this.state.extras);
    document.getElementById('atelie')?.scrollIntoView({ behavior: 'smooth' });
    window.UIHelpers?.showToast('Orçamento transferido para a Ficha de Encomenda!');
  }
};
