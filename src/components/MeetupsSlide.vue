<template>
    <transition :name="direction" mode="out-in">
        <div class="container"  v-if="visableMeetup === index">
            <div class="inner-container">
                <div class="image">
                    <img :src="meetup.image">
                </div>
                <div class="over-content">
                    <h2 class="title">{{ meetup.title }}</h2>
                    <p class="date">{{ meetup.date }}</p>
                </div>
                <div class="buttons">
                    <i class="fas fa-arrow-circle-left" @click="next"></i>
                    <i class="fas fa-arrow-circle-right" @click="prev"></i>
                </div>
            </div>
            <div class="register" v-if="currentUser">
                <button class="form-button register-button" v-if="isRegistered" @click="unRegister">Already registered / Unregister</button>
                <button class="form-button register-button" @click="register" v-else >Register</button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['meetup', 'index', 'visableMeetup', 'direction'],
    data() {
        return{
            indexForUnregister: null,
        }
    },
    methods: {
        next() {
            this.$emit('next')
        },
        prev() {
            this.$emit('prev')
        },
        register() {
            this.$store.dispatch('registerMeetup', {
                id: this.meetup.id,
            })
        },
        unRegister() {
            this.indexForUnregister = this.currentUser.registeredMeetups.findIndex((el) => {
                el.id === this.meetup.id
            })
            this.$store.dispatch('unRegister', this.indexForUnregister)
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser
        },
        isRegistered() { 
            let value = null
  
            for(let registeredMeetup in this.currentUser.registeredMeetups) {
                if (this.currentUser.registeredMeetups[registeredMeetup].id === this.meetup.id) {
                    return value= true
                } 
            }
            return value 
        }
    }
}
</script>

<style scoped>
.container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    width: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;

}

.inner-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    width: 100%;
}

.image {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
        -ms-flex-align: end;
            align-items: flex-end
}

img {
  width: 100%;
}

.over-content {
    position: absolute;
    top: 20px;
    left: 20px;
}

.over-content .title {
    margin-top: 0
}

.buttons {
    position: absolute;
    top: calc(50% - 20px);
    left: 15px;
    right: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-item-align: center;
        align-self: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
}

i {
    font-size: 20px;
    opacity: 0.6;
    -webkit-transition: -webkit-transform 0.2s ease;
    transition: -webkit-transform 0.2s ease;
    -o-transition: transform 0.2s ease;
    transition: transform 0.2s ease;
    transition: transform 0.2s ease, -webkit-transform 0.2s ease
}
i:hover {
    -webkit-transform: scale(2);
        -ms-transform: scale(2);
            transform: scale(2);
    opacity: 1
}

.left-enter-active {
    -webkit-animation: left-in 0.4s ease;
            animation: left-in 0.4s ease;
}
@-webkit-keyframes left-in {
    from {
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%)
    }
    to {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
}
@keyframes left-in {
    from {
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%)
    }
    to {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
}

.left-leave-active {
 -webkit-animation: left-out 0.4s ease;
         animation: left-out 0.4s ease;
}

@-webkit-keyframes left-out {
    from {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
    to {
        -webkit-transform: translateX(100%);
                transform: translateX(100%)
    }
}

@keyframes left-out {
    from {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
    to {
        -webkit-transform: translateX(100%);
                transform: translateX(100%)
    }
}
.right-enter-active {
    -webkit-animation: right-in 0.4s ease;
            animation: right-in 0.4s ease;
}
@-webkit-keyframes right-in {
    from {
        -webkit-transform: translateX(100%);
                transform: translateX(100%)
    }
    to {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
}
@keyframes right-in {
    from {
        -webkit-transform: translateX(100%);
                transform: translateX(100%)
    }
    to {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
}

.right-leave-active {
 -webkit-animation: right-out 0.4s ease;
         animation: right-out 0.4s ease;
}

@-webkit-keyframes right-out {
    from {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
    to {
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%)
    }
}

@keyframes right-out {
    from {
        -webkit-transform: translateX(0);
                transform: translateX(0)
    }
    to {
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%)
    }
}

.register {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;   
    height: 60px;
    width: 100%;
    background: black;
}


.register-button {
    opacity: 0.7;
    cursor: pointer;
    margin: auto 0 auto 10px;
}

.register-button:hover {
    opacity: 1
}
/* ==============MEDIA */

@media (max-width: 425px) {
    .over-content {
        top: 10px;
    }
    .over-content .title {
        font-size: 20px;
        margin-bottom: 10px;
    }
    .over-content .date {
        margin-top: 10px;
    }
    .register {
        height: 50px;
        top: calc(100% - 50px);
    }
    .form-button {
        padding: 8px 6px
    }
}

@media (max-width: 375px) {
    
}

</style>