<template>
  <div id="nav" class="p-4">
    <!--  |
    <router-link to="/about">About</router-link> |
    <router-link to="/contacts">Contacts</router-link> -->
    <div class="flex-1 flex flex-col">
		<nav class="px-4 flex justify-between bg-white h-16 rounded">

			<!-- top bar left -->
			<ul class="flex items-center">
				<!-- add button -->
				<li class="h-12 w-9">
					<img
						class="h-full w-full mx-auto"
						src="@/assets/logo.png"
						alt="svelte logo" />
				</li>
			</ul>

			<!-- to bar right  -->
			<ul class="flex items-center">

				<li class="pr-6">
					<router-link to="/" class="hover:text-readee">
						<HomeIcon class="h-6 w-6 duration-150"></HomeIcon>
					</router-link>
				</li>
				<li class="pr-6">
					<router-link to="/contact" class="hover:text-readee">
						<LightBulbIcon class="h-6 w-6 duration-150"></LightBulbIcon>
					</router-link>
				</li>
				<li class="h-10 w-10">
                    <div class="h-full w-full rounded-full mx-auto bg-cover relative hover-trigger" style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')">
						<div class="h-12"></div>
						<div class="absolute bg-white border border-grey-100 hover-target w-150 right-0 rounded ">
							<ul>
								<li @click="logOut()" class="w-full cursor-pointer px-4 py-2 hover:bg-blue-400 hover:text-white">
									<span class="font-bold">log out</span>
								</li>
							</ul>
						</div>
					</div>
				</li>

			</ul>

		</nav>
	</div>
  </div>
  
</template>

<script>
import {LightBulbIcon, HomeIcon} from '@heroicons/vue/solid'
export default {
	name: "AppLayoutLinks",
	components:{LightBulbIcon, HomeIcon},
	methods:{
		logOut(){
			this.$store.dispatch('logout');
		}
	}
}
</script>

<style scoped>
.hover-trigger .hover-target {
	display: none;
}

.hover-trigger:hover .hover-target {
	display: block;
}
</style>