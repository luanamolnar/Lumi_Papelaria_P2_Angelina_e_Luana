import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Telas que dependem da URL (?q=, ?codigo=) ou da cesta do visitante são montadas só no navegador
  { path: 'resultado-busca', renderMode: RenderMode.Client },
  { path: 'detalhe', renderMode: RenderMode.Client },
  { path: 'cesta', renderMode: RenderMode.Client },
  { path: 'pedido', renderMode: RenderMode.Client },
  { path: 'lista-pedidos', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];