<script lang="ts" setup>
</script>

<style scoped>
 .stroke-shape {
   stroke: var(--stroke, #1f2833);
   fill: none;
 }
 .fills {
   fill: var(--fill, #fff);
 }
</style>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18">
    <path d="M7.737 6.405 2.8 11.911" class="fills"/>
    <path d="M7.737 6.405 2.8 11.911" class="stroke-shape"/>
    <path d="m8.066 6.405 5.134 5.696" class="fills"/>
    <path d="m8.066 6.405 5.134 5.696" class="stroke-shape" />
    <rect width="6.4" height="8.1" x="9.6" y="9.9" class="fills" rx="2" ry="2"/>
    <g class="strokes">
      <g class="inner-stroke-shape">
        <defs>
          <clipPath id="b">
            <use href="#a"/>
          </clipPath>
          <rect id="a" width="6.4" height="8.1" x="9.6" y="9.9" rx="2" ry="2" class="stroke-shape" style="stroke-width:2;"/>
        </defs>
        <use clip-path="url('#b')" href="#a"/>
      </g>
    </g>
    <rect width="6" height="8.1" x="5" class="fills" rx="2" ry="2"/>
    <g class="strokes">
      <g class="inner-stroke-shape">
        <defs>
          <clipPath id="d">
            <use href="#c"/>
          </clipPath>
          <rect id="c" width="6" height="8.1" x="5" y="0" rx="2" ry="2" class="stroke-shape" style="stroke-width:2;"/>
        </defs>
        <use clip-path="url('#d')" href="#c"/>
      </g>
    </g>
    <rect width="6.4" height="8.1" y="9.9" class="fills" rx="2" ry="2"/>
    <g class="strokes">
      <g class="inner-stroke-shape">
        <defs>
          <clipPath id="f">
            <use href="#e"/>
          </clipPath>
          <rect id="e" width="6.4" height="8.1" x="0" y="9.9" rx="2" ry="2" class="stroke-shape" style="stroke-width:2;"/>
        </defs>
        <use clip-path="url('#f')" href="#e"/>
      </g>
    </g>
  </svg>
</template>
