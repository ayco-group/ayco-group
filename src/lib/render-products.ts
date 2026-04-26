import type { Product, ProductIcon } from '@/data/products';

export type Lang = 'uk' | 'en';

const ctaLabel = {
  uk: { live: 'Відкрити →', soon: 'Незабаром' },
  en: { live: 'Open →', soon: 'Coming soon' },
};

function renderIcon(icon: ProductIcon): string {
  switch (icon.kind) {
    case 'brand':
      return `<div class="card-icon brand"><img src="${icon.src}" alt="" width="48" height="48" loading="lazy" /></div>`;
    case 'bzhu':
      return `<div class="card-icon"><span class="bzhu-logo">Б·Ж·У·В</span></div>`;
    case 'symbol': {
      const style = icon.color ? ` style="color: ${icon.color}"` : '';
      return `<div class="card-icon"${style}>${icon.value}</div>`;
    }
  }
}

function renderCard(product: Product, lang: Lang): string {
  const isLive = product.status === 'live';
  const tag = isLive ? 'a' : 'div';
  const cls = isLive ? 'card' : 'card coming';
  const href = isLive ? ` href="${product.url}" target="_blank" rel="noopener"` : '';
  const badge = isLive ? '<span class="badge live">LIVE</span>' : '<span class="badge">SOON</span>';
  const cta = ctaLabel[lang][product.status];
  return `<${tag} class="${cls}" style="--card-glow: ${product.glow}"${href}>
            ${badge}
            ${renderIcon(product.icon)}
            <span class="tag">${product.tag}</span>
            <h3>${product.name}</h3>
            <p class="desc">${product.description[lang]}</p>
            <span class="cta">${cta}</span>
          </${tag}>`;
}

export function renderCards(products: Product[], lang: Lang): string {
  return products.map((p) => renderCard(p, lang)).join('\n          ');
}

export function renderTerminal(products: Product[]): string {
  const maxLen = Math.max(...products.map((p) => p.terminalLabel.length));
  return products
    .map((p) => {
      const pad = '&nbsp;'.repeat(maxLen - p.terminalLabel.length + 3);
      const dot = p.status === 'live' ? '◆' : '◇';
      const status =
        p.status === 'live' ? '<span class="s">live</span>' : '<span class="c">soon</span>';
      return `                <div>&nbsp;&nbsp;<span class="p">${dot}</span> ${p.terminalLabel}${pad}${status}</div>`;
    })
    .join('\n');
}

export function renderJsonLd(products: Product[]): string {
  const items = products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: p.url,
    name: p.name,
  }));
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ayco group products',
      itemListElement: items,
    },
    null,
    2,
  );
}
