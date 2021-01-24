<template>
    <div id="nav">
        <router-link id="logo" to="/"><i class="fab fa-meetup"></i></router-link>
        <div id="content">
            <router-link class="nav-item" to="/"><i class="far fa-eye"></i>  View meetups</router-link>
            <router-link class="nav-item" to="/organize-meetup"><i class="fas fa-plus-circle"></i>  Organize Meetup</router-link>
            <template class="profile-logout" v-if="isLoggedIn">
                <router-link class="nav-item" to="/profile" v-if="currentUser"><i class="fas fa-user"></i>  {{ currentUser.username }} </router-link>
                <button class="nav-button" @click="logout"> <i class="fas fa-sign-out-alt"></i> Logout</button>
            </template>
            <template v-else class="sign-up-sign-in">
                <router-link class="nav-item" to="/sing-in"><i class="fas fa-sign-in-alt"></i>  Sing in</router-link>
                <router-link class="nav-item" to="/sign-up"><i class="fas fa-user-plus"></i>  Sing up</router-link>
            </template>
        </div>
        <div class="hidden">
          <div id="ham-icon"><i class="fas fa-bars" @click="turn"></i></div>
          <div class="hamburger-content" :class="{hamActive: isActive}">
            <div class="link-contetn">
              <router-link class="ham-item" to="/"><i class="far fa-eye"></i>  View meetups</router-link>
              <router-link class="ham-item" to="/organize-meetup"><i class="fas fa-plus-circle"></i>  Organize Meetup</router-link>
              <template v-if="isLoggedIn">
                <router-link class="ham-item" to="/profile" v-if="currentUser"><i class="fas fa-user"></i>  {{ currentUser.username }} </router-link>
                <button class="ham-button" @click="logout"> <i class="fas fa-sign-out-alt"></i> Logout</button>
              </template>
              <template v-else >
                  <router-link class="ham-item" to="/sing-in"><i class="fas fa-sign-in-alt"></i>  Sing in</router-link>
                  <router-link class="ham-item" to="/sign-up"><i class="fas fa-user-plus"></i>  Sing up</router-link>
              </template>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
      isLoggedIn() {
      return this.$store.getters.isLoggedIn
      },
      currentUser() {
          return this.$store.getters.currentUser
      }
  },
  methods: {
      logout() {
          this.$store.commit('logout')
          this.$router.push('sign-up')
      },
      turn() {
        this.isActive = !this.isActive
      }
  }
}
</script>

<style scoped>
#nav {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  height: 60px;
  width: 100%;
 background: #fe8c00;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-gradient(linear, right top, left top, from(#f83600), to(#fe8c00));
  background: -o-linear-gradient(right, #f83600, #fe8c00);
  background: linear-gradient(to left, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#logo {
  padding: 5px;
  margin-left: 30px;
  text-decoration: none;
  color: white;
  font-size: 50px;
  width: 30%;
  justify-self: flex-start;
}

#content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: flex-end;
  -ms-flex-pack: distribute;
      justify-content: space-around;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin-right: 20px;
  width: 60%;
}  

#nav .nav-item,
#nav .ham-item {
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 0 5px;
}

#nav .nav-button {
  border: none;
  outline: none;
  background: inherit;
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  color: white;
}

#nav .nav-item.router-link-exact-active,
#nav .ham-item.router-link-exact-active {
  display: inline;
  color:  #0039a6;
  -webkit-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
          transform: scale(1.2)

}

.sign-up-sign-in,
.profile-logout {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.hamburger-content {
  overflow: hidden;
  position: absolute;
  top: 60px;
  right: 0;
  background: #fe8c00;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-gradient(linear, left top, left bottom, from(#f83600), to(#fe8c00));
  background: -o-linear-gradient(top, #f83600, #fe8c00);
  background: linear-gradient(to bottom, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
  display: none;
  width: 160px;
  z-index: 2;
  -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
          transform: translateX(100%);
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#nav #ham-icon {
  height: 50px;
  width: 160px;
  padding-right: 30px;
  -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
          transform: translateX(100%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 25px;
}

.hamActive {
  padding: 0 12px;
  -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
          transform: translateX(0);
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}
.link-contetn {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-line-pack: center;
      align-content: center;
  min-height: calc(100vh - 50px);
}

.hidden {
  display: none;
}

#nav .ham-item {
  text-align: center;
  margin: 20px 0;
}

#nav .ham-button {
  margin-top: 20px;
  background: inherit;
  color: white;
  border: none;
  outline:none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

/* ==============MEDIA QUERIES */

@media (max-width: 768px) {
  #content {
    display: none;
  }
  .hidden {
    display: block
  }
  .hamburger-content {
    display: inline;
  }
  #nav #ham-icon { 
    -webkit-transform: translateX(0); 
        -ms-transform: translateX(0); 
            transform: translateX(0)
  }
}
</style>