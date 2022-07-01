<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;400;800&display=swap');
@import '@/assets/base.css';

/* http://meyerweb.com/eric/tools/css/reset/ v2.0 | 20110126 License: none (public domain) */
/* prettier-ignore */
html,body, div, span,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, 
figure, figcaption, footer, header, hgroup, 
menu, nav, section, summary, mark, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* MOONHOLDING STYLES */
#app {
  max-width: auto;
  margin: 0 auto;
  font-family: 'Inconsolata', monospace;
  font-weight: normal;
}

strong {
  font-weight: 800;
}
</style>
