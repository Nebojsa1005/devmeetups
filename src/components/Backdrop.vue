<template>
  <div class="backdrop" :class="{ show: show }" @click="hide"></div>
</template>

<script>
export default {
  methods: {
    hide() {
      this.$store.commit("showSideBar");
    }
  },
  computed: {
    show() {
      return this.$store.getters.showBackdrop;
    }
  }
};
</script>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: #fe8c00; /* fallback for old browsers */ /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f83600),
    to(#fe8c00)
  );
  background: -o-linear-gradient(top, #f83600, #fe8c00);
  background: linear-gradient(
    to bottom,
    #f83600,
    #fe8c00
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  opacity: 0.8;
  transform: translateX(-100%);
  transition: transform 0.2s ease;
}

.show {
  transform: translateX(0);
}
</style>