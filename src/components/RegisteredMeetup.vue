<template>
    <div id="profile-content" v-if="user">
        <div class="registered-meetups" v-if="user.registeredMeetups.length > 0">
            <h3 >Registered Meetups</h3>
            <div class="meetups">
                <div class="meetup-content" v-for="meetup in user.registeredMeetups" :key="meetup.id">
                    <div class="image-container">
                        <img class="meetup-image" :src="meetup.image">
                        <div class="description">
                            <p class="meetup-description">{{ meetup.description }}</p>
                        </div>
                    </div>
                    <h2 class="meetup-info">{{ meetup.title }} - {{ meetup.date }}</h2>
                </div>
            </div>
        </div>
        <div v-else class="no-meetups-content">
            <p class="no-meetups">You are not registered for any meetups</p>
            <router-link class="form-button no-meetups-button" to="/">Go Register</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style  scoped>

#profile-content {
    margin-bottom: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center
}

.registered-meetups {
    margin-top: 30px;
    width: 100%;
}

.registered-meetups h3 {
    font-size: 25px;
    margin: 0 0 30px 30px;
}

.meetups {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
        justify-content: space-around;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;

}

.meetup-content {
    width: 30%;
}


.image-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.meetup-image {
    width: 100%;
    -webkit-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
}

.meetup-image:hover {
    -webkit-transform: scale(1.2);
        -ms-transform: scale(1.2);
            transform: scale(1.2);
    -webkit-filter:grayscale(1);
            filter:grayscale(1);
}

.description {
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 0;
    -webkit-transform: translateY(40px);
        -ms-transform: translateY(40px);
            transform: translateY(40px);
    -webkit-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;

}

.meetup-description {
    font-size: 16px;
    color: white;
}

h2 {
    margin: 7px 0 20px 0;
}

.image-container:hover .description {
  opacity: 1;
  -webkit-transform: translateY(0px);
      -ms-transform: translateY(0px);
          transform: translateY(0px);
}

.no-meetups-content {
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
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}

.no-meetups {
    margin-top: 200px;
    font-size: 50px;
    font-weight: bold;
}

.no-meetups-button {
    font-size: 30px;
    text-decoration: none;
}

@media (max-width: 1024px) {
    .meetup-content {
        width: 45%;
    }
}

@media (max-width: 425px) { 
    .registered-meetups . {
        font-size: 20px;
        margin: 20px 0 0 20px;
    }
    .meetup-content {
        width: 95%;
    }
    .meetup-info {
        font-size: 20px;
    }
}
</style>