<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-circle :config="circleConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { Stage as VStage, Layer as VLayer, Circle as VCircle } from 'vue-konva';

const stageSize = {
  width: 200,
  height: 200
};

const circleConfig = {
  x: 100,
  y: 100,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};
</script>