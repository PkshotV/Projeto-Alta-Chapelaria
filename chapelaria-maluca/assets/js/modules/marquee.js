import { AtelierData } from '../data/atelierData.js';
import { HatSVGBuilder } from './svgBuilder.js';

export const MarqueeController = {
  isPaused: false,
  isRightward: true,

  init() {
    const track = document.getElementById('marquee-track');
    if (!track) return;

    const doubled = [...AtelierData.catalog, ...AtelierData.catalog];
    track.innerHTML = doubled.map((item, idx) => `
      <article onclick="ModalController.openCatalogModal('${item.id}')"
        class="group w-72 sm:w-80 shrink-0 bg-hat-indigo/90 hover:bg-hat-indigo border border-hat-gold/25 hover:border-hat-gold rounded-3xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-velvet flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3"><span class="px-3 py-1 rounded-full bg-hat-plum text-[11px] font-bold text-hat-goldLight border border-hat-gold/25">${item.badge}</span><span class="text-xs font-bold text-hat-gold">${item.price}</span></div>
          <div class="h-40 rounded-2xl bg-gradient-to-b from-hat-plumLight/60 to-hat-indigo p-3 flex items-center justify-center"><div class="w-full h-full group-hover:scale-105 transition-transform duration-300">${HatSVGBuilder.render(item.calcPreset.model, item.calcPreset.material, item.calcPreset.brim, item.calcPreset.extras, `mq_${idx}`)}</div></div>
          <h3 class="mt-4 font-editorial font-bold text-xl text-hat-cream group-hover:text-hat-goldLight transition-colors">${item.name}</h3>
          <p class="mt-1.5 text-xs text-hat-cream/70 line-clamp-2 leading-relaxed">${item.description}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-hat-gold/15 flex items-center justify-between text-xs font-semibold text-hat-goldLight"><span>${item.material}</span><span class="group-hover:translate-x-1 transition-transform">Inspecionar →</span></div>
      </article>
    `).join('');

    document.querySelectorAll('.marquee-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.marquee-speed-btn').forEach(b => b.classList.remove('active', 'bg-hat-gold', 'text-hat-indigo', 'font-bold'));
        btn.classList.add('active', 'bg-hat-gold', 'text-hat-indigo', 'font-bold');
        document.documentElement.style.setProperty('--marquee-duration', btn.dataset.speed);
      });
    });

    const dirBtn = document.getElementById('marquee-dir-btn');
    dirBtn?.addEventListener('click', () => {
      this.isRightward = !this.isRightward;
      document.documentElement.style.setProperty('--marquee-direction', this.isRightward ? 'normal' : 'reverse');
      dirBtn.textContent = this.isRightward ? 'Sentido: Direita →' : 'Sentido: Esquerda ←';
    });

    const pauseBtn = document.getElementById('marquee-pause-btn');
    pauseBtn?.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      track.classList.toggle('is-paused', this.isPaused);
      pauseBtn.textContent = this.isPaused ? '▶ Retomar' : '⏸ Pausar';
    });
  }
};
