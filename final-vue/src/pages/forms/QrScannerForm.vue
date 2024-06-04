<template>
  <div class="mt-4 flex justify-center items-center transform translate-x-1/4 h-80 shadow-lg">
    <qr-stream @decode="onDecode" class="mb relative">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-500 size-80 box-border"></div>
    </qr-stream>
  </div>
</template>

<script setup lang="ts">


import { ref } from 'vue';
import { QrStream } from 'vue3-qr-reader';

const data = ref('');
const emit = defineEmits(['qr-scanned']);

const playBeep = () => {
  const audio = new Audio('../../../public/sounds/qr-sound.mp3');
  audio.play();
};

const onDecode = (decodedString: string) => {
  data.value = decodedString;
  emit('qr-scanned', decodedString);
  //console.log("Decoded string ", decodedString);
  playBeep();
};



</script>