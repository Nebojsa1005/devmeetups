<template>
  <div id="app">
      <app-header></app-header>
      <transition name="blur" mode="out-in">
        <router-view/>
      </transition>
  </div>
  
</template>

<script>
import appHeader from './components/Header.vue'
export default {
  components: {
    appHeader
  }
}
</script>

<style>
/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v7.0.29,
* Autoprefixer: v9.7.6
* Browsers: last 4 version
*/

body {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  /* background: #002147; */
  background-size:cover;
  background: url('https://www.vamosrayos.com/b/2020/01/royal-blue-background-design-for-wedding-pastel-scaled.jpg');
  min-height: 100vh;
  overflow: hidden
}

.section {
  height: 100%;
  margin-top: 30px;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

/*====================== FORMS */
form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 30%;
}

input,
textarea {
  border: none;
  border-radius: 12px;
  outline: none;
  width: 90%;
  padding: 0 10px;
  margin: 5px 0;
}

input {
  height: 30px;
}

textarea {
  padding-top: 5px;
  height: 300px;
}

label {
  margin-top: 10px;
}

.form-button {
  cursor: pointer;
  padding: 12px 8px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  outline: none;
  background: #fe8c00;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-gradient(linear, right top, left top, from(#f83600), to(#fe8c00));
  background: -o-linear-gradient(right, #f83600, #fe8c00);
  background: linear-gradient(to left, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}


.invalid {
  border: 3px solid red blur(2px);
  -webkit-box-shadow: 0px 0px 15px 4px red;
          box-shadow: 0px 0px 15px 4px red
}


/* =====================FORM MEDIA QUERIES */

@media (max-width: 1024px) {
  form {
    width: 40%
  }
}

@media (max-width: 768px) {
  form {
    width: 50%
  }
}

@media (max-width: 425px) {
  form {
    width: 80%
  }
}

@media (max-width: 320px) {
  form {
    width: 90%
  }
}

/* =================KEYFRAMES */
.blur-enter-active {
  -webkit-animation: blur-in 0.4s ease;
          animation: blur-in 0.4s ease;
}
@-webkit-keyframes blur-in {
  from {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes blur-in {
  from {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

.blur-leave-active {
  -webkit-animation: blur-out 0.4s ease;
          animation: blur-out 0.4s ease;
}
@-webkit-keyframes blur-out {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);

  }
  to {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
}
@keyframes blur-out {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);

  }
  to {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
}
</style>
