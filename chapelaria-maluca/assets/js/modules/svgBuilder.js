import { AtelierData } from '../data/atelierData.js';

export const HatSVGBuilder = {
  render(modelId, materialId = 'feltro', brimCm = 9, extras = [], uniqueSuffix = 'hat') {
    const mat = AtelierData.materials.find(m => m.id === materialId) || AtelierData.materials[2];
    const gradId = `g_${uniqueSuffix}`;
    const goldId = `gd_${uniqueSuffix}`;
    const clampedBrim = Math.max(4, Math.min(16, Number(brimCm) || 9));
    const brimSpread = 32 + (clampedBrim - 4) * 5.2;
    const leftX = Math.max(10, 180 - (82 + brimSpread));
    const rightX = Math.min(350, 180 + (82 + brimSpread));

    let crown = '';
    let brim = '';
    let bandY = 188;

    if (modelId === 'cartola') {
      bandY = 188;
      crown = `<path d="M98 212L114 66C116 46 134 36 180 36C226 36 244 46 246 66L262 212H98Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M132 52C128 105 124 155 122 198" stroke="rgba(255,255,255,0.16)" stroke-width="6" stroke-linecap="round"/>`;
      brim = `<path d="M${leftX} 212C${leftX + 42} 240 ${rightX - 42} 240 ${rightX} 212C${rightX + 8} 205 ${rightX - 4} 195 ${rightX - 20} 200C250 214 110 214 ${leftX + 20} 200C${leftX + 4} 195 ${leftX - 8} 205 ${leftX} 212Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.8"/>`;
    } else if (modelId === 'fedora' || modelId === 'panama') {
      bandY = 184;
      crown = `<path d="M96 206C100 148 114 102 136 92C154 84 166 102 180 102C194 102 206 84 224 92C246 102 260 148 264 206H96Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M144 114C158 122 202 122 216 114" stroke="rgba(0,0,0,0.3)" stroke-width="4" stroke-linecap="round"/>`;
      brim = `<path d="M${leftX} 206C${leftX + 46} 234 ${rightX - 46} 234 ${rightX} 206C${rightX + 8} 200 ${rightX - 6} 190 ${rightX - 22} 195C250 209 110 209 ${leftX + 22} 195C${leftX + 6} 190 ${leftX - 8} 200 ${leftX} 206Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.8"/>`;
    } else if (modelId === 'bowler') {
      bandY = 186;
      crown = `<path d="M96 208C96 128 130 82 180 82C230 82 264 128 264 208H96Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M134 104C122 132 118 164 118 194" stroke="rgba(255,255,255,0.16)" stroke-width="6" stroke-linecap="round"/>`;
      brim = `<path d="M${leftX + 12} 206C${leftX + 44} 236 ${rightX - 44} 236 ${rightX - 12} 206C${rightX - 4} 196 ${rightX - 16} 188 ${rightX - 28} 195C248 210 112 210 ${leftX + 28} 195C${leftX + 16} 188 ${leftX + 4} 196 ${leftX + 12} 206Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.8"/>`;
    } else if (modelId === 'cloche') {
      bandY = 182;
      crown = `<path d="M84 214C92 134 126 84 180 84C234 84 268 134 276 214C244 222 116 222 84 214Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/>`;
      brim = `<path d="M${leftX + 18} 214C122 232 238 232 ${rightX - 18} 214C254 202 106 202 ${leftX + 18} 214Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.5"/>`;
    } else if (modelId === 'boina') {
      bandY = 194;
      crown = `<path d="M84 198C84 134 126 102 184 102C242 102 282 134 276 198H84Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M184 102V196" stroke="rgba(255,255,255,0.16)" stroke-width="2.4"/><circle cx="184" cy="100" r="6" fill="url(#${goldId})"/>`;
      brim = `<path d="M98 198C136 220 232 220 266 198C252 188 112 188 98 198Z" fill="#0D0916" stroke="url(#${goldId})" stroke-width="2.4"/>`;
    } else if (modelId === 'sombrero') {
      bandY = 186;
      crown = `<path d="M112 208L128 76C132 58 152 50 180 50C208 50 228 58 232 76L248 208H112Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M132 134L154 114L180 134L206 114L228 134" stroke="url(#${goldId})" stroke-width="3" fill="none"/>`;
      brim = `<path d="M${Math.max(6, leftX - 12)} 204C${leftX + 45} 248 ${rightX - 45} 248 ${Math.min(354, rightX + 12)} 204C${Math.min(358, rightX + 18)} 192 ${rightX} 184 ${rightX - 24} 194C248 214 112 214 ${leftX + 24} 194C${leftX} 184 ${Math.max(2, leftX - 18)} 192 ${Math.max(6, leftX - 12)} 204Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="3.2"/>`;
    } else if (modelId === 'campeiro') {
      bandY = 186;
      crown = `<path d="M98 206C104 148 124 106 180 106C236 106 256 148 262 206H98Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M138 124C158 132 202 132 222 124" stroke="rgba(0,0,0,0.32)" stroke-width="3.5" stroke-linecap="round"/>`;
      brim = `<path d="M${leftX} 204C${leftX + 46} 230 ${rightX - 46} 230 ${rightX} 204C${rightX + 6} 197 ${rightX - 8} 190 ${rightX - 22} 195C248 206 112 206 ${leftX + 22} 195C${leftX + 8} 190 ${leftX - 6} 197 ${leftX} 204Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.8"/>`;
    } else if (modelId === 'vaqueiro') {
      bandY = 188;
      crown = `<path d="M104 208C108 144 132 96 180 96C228 96 252 144 256 208H104Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><path d="M142 114L180 132L218 114" stroke="url(#${goldId})" stroke-width="2.2" stroke-dasharray="4 3" fill="none"/><path d="M126 214Q180 264 234 214" stroke="#D4A359" stroke-width="2.8" fill="none"/>`;
      brim = `<path d="M${leftX} 202C${leftX + 44} 236 ${rightX - 44} 236 ${rightX} 202C${rightX + 4} 190 ${rightX - 14} 182 ${rightX - 28} 192C246 210 114 210 ${leftX + 28} 192C${leftX + 14} 182 ${leftX - 4} 190 ${leftX} 202Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.8"/>`;
    } else {
      bandY = 176;
      crown = `<path d="M102 184C102 114 134 84 180 84C226 84 258 114 258 184H102Z" fill="url(#${gradId})" stroke="${mat.stroke}" stroke-width="2.4"/><rect x="114" y="136" width="132" height="44" rx="14" fill="#3B2E58" stroke="url(#${goldId})" stroke-width="2.4"/><path d="M98 168L86 234C86 244 106 246 112 234L120 182Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.2"/><path d="M262 168L274 234C274 244 254 246 248 234L240 182Z" fill="url(#${gradId})" stroke="url(#${goldId})" stroke-width="2.2"/>`;
    }

    const hasFita = extras.includes('fita') || modelId !== 'ushanka';
    const bandMarkup = hasFita && modelId !== 'ushanka'
      ? `<path d="M100 ${bandY}C144 ${bandY + 8} 216 ${bandY + 8} 260 ${bandY}L262 ${bandY + 18}C216 ${bandY + 26} 144 ${bandY + 26} 98 ${bandY + 18}L100 ${bandY}Z" fill="url(#${goldId})" opacity="0.92"/>`
      : '';
    const adornoMarkup = extras.includes('adorno106')
      ? `<g transform="translate(116, ${bandY - 44}) rotate(-10)"><rect x="0" y="0" width="52" height="36" rx="5" fill="#FAF6F0" stroke="#D4A359" stroke-width="2.2"/><text x="26" y="23" text-anchor="middle" fill="#120D1D" font-family="'Playfair Display', serif" font-weight="800" font-size="15">10/6</text></g>`
      : '';

    return `<svg viewBox="0 0 360 275" class="w-full h-full max-h-[250px] drop-shadow-[0_18px_24px_rgba(0,0,0,0.65)]" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${gradId}" x1="60" y1="30" x2="300" y2="240" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="${mat.light}"/><stop offset="55%" stop-color="${mat.hex}"/><stop offset="100%" stop-color="#0B0713"/></linearGradient><linearGradient id="${goldId}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F3D08A"/><stop offset="55%" stop-color="#D4A359"/><stop offset="100%" stop-color="#8C6223"/></linearGradient></defs>${crown}${brim}${bandMarkup}${adornoMarkup}</svg>`;
  }
};
