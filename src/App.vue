<template>
  <v-app>
<v-navigation-drawer v-model="sideNav" temporary>
  <v-list>

    <v-list-tile 
    v-for="item in menuItems" 
    :key="item.title"
    router
    :to="item.link">
      <v-list-tile-action>
        <v-icon>{{item.icon}}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>{{item.title}}</v-list-tile-content>
    </v-list-tile>

  </v-list>

  <v-list  >
  <v-list-tile v-if="userIsAuth" @click="onLogout"
   >
      <v-list-tile-action >
        <v-icon>exit_to_app</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>Logout</v-list-tile-content>
    </v-list-tile>

  </v-list>
  

</v-navigation-drawer>

    <v-toolbar dark class="primary">
            <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>

      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">ToMeet</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
     <v-toolbar-items >
       <v-btn flat class="hidden-xs-only" v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-icon left dark>{{item.icon}}</v-icon>{{item.title}}</v-btn>
     </v-toolbar-items>


     <v-toolbar-items v-if="userIsAuth" >
       <v-btn flat class="hidden-xs-only" @click="onLogout">
        <v-icon left dark>exit_to_app</v-icon>Logout</v-btn>
     </v-toolbar-items>
    </v-toolbar>

    <main>
      
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

export default{
  data () {
    return {
      sideNav: false,
     
    }
  }, 

  computed: {
    menuItems(){
      let menuItems = [
         {icon: 'face', title: 'Signup', link: '/signup'},
     {icon: 'lock_open', title: 'Sign In', link: '/signin'}
      ]

      if(this.userIsAuth){
        menuItems = [
        {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
            {icon: 'room', title: 'Create Meetup', link: '/meetup/new'},

      {icon: 'person', title: 'Profile', link: '/profile'}
            // {icon: 'exit_to_app', title: 'Logout', link: '/profile'}

        ]
      }

      return menuItems;

    },

    userIsAuth(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    }
  },

  methods: {
    onLogout(){
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style >
  body{
    font-family: 'Roboto Slab', serif;
  }

  h3:after{
    display: block;
    height: 2px;
    background-color: #e53935;
    content: " ";
    width: 25%;
    margin: 0 auto;
    margin-top: 30px;
}

.jump {
    opacity: 1;
    width: 100%;
    height: auto;
    transform: scale(0.97);
    transition: transform 0.5s;
    
}

.jump :hover{
    width: 100%;
    height: auto;
    transform: scale(1.1);
    opacity: 1;
}
</style>
