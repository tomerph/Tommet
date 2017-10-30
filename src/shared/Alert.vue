<template>
	<div>
	 
    <v-alert color="error" icon="warning"  @input="onClose" :value="true" dismissible >
      {{text}}
    </v-alert>
</div>
</template>

<script>
	
	export default{
		methods: {
			onClose(){
				this.$emit('dismiss')
			}
		},
		props: ['text']
	}
</script>