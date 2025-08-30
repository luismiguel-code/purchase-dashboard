
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/purchase-dashboard/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/purchase-dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OPGOMFQM.js"
    ],
    "route": "/purchase-dashboard/tasks"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IQ2IXZAO.js"
    ],
    "route": "/purchase-dashboard/users"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AEQFQLWJ.js"
    ],
    "route": "/purchase-dashboard/settings"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16897, hash: '5d134435672d9c6bb17d35487523890fccf99ad76b0f5891361b67e6f83ea6b1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17184, hash: '8d3bb890517a7597e9815eb967f6fe9cf2b474c51513f4bb29d945b544c9a008', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 33993, hash: '5f2bac4e26a79587bed0cea0f95405cf95e9cb7e49ccf3661a34ff127e3153de', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'index.html': {size: 0, hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'users/index.html': {size: 33984, hash: '6a3e3a1006c7d2b64d3b0da92ec5cc4e89cce3f0a423b782cdc65165b82dcf1c', text: () => import('./assets-chunks/users_index_html.mjs').then(m => m.default)},
    'tasks/index.html': {size: 147686, hash: '4a4aea0f8699e283ab9047566702355939308771ecef149fd6d2e33168aa48f5', text: () => import('./assets-chunks/tasks_index_html.mjs').then(m => m.default)},
    'styles-ERBDGEZ5.css': {size: 197161, hash: '9viAGpLnmTc', text: () => import('./assets-chunks/styles-ERBDGEZ5_css.mjs').then(m => m.default)}
  },
};
