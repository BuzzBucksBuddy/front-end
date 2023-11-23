<template>
  <div>
    <div class="container">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isProfileInfo" @click="toggleComponent"/>
        <span class="slider"></span>
      </label>

      <div class="component-container">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProfileInfo from '@/components/ProfileInfo.vue';
import ProfileMyProducts from '@/components/ProfileMyProducts.vue';

const isProfileInfo = ref(true);

const currentComponent = ref(ProfileInfo);

const toggleComponent = () => {
  currentComponent.value = isProfileInfo.value ? ProfileInfo : ProfileMyProducts;
};
</script>


<style scoped>
.container {
  display: flex;
  align-items: center;
  position: relative;
  
}

.toggle-switch {
  position: absolute;
  top: 45px;
  left: 7%;
  display: inline-block;
  width: 60px;
  height: 34px;
  
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
  
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sub-color);
  transition: 0.4s;
  border-radius: 34px;
  z-index: 2;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
  z-index: 2;
}

.toggle-switch input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

input:checked + .slider {
  background-color: var(--main-color);
  z-index: 1;
}

input:checked + .slider:before {
  transform: translateX(26px);
  z-index: 2;
}

.component-container {
  position: absolute;
  top: 10px; 
  left: 50px; 
  width: 100%;
  height: 100%;
  z-index: 1;
}

</style>
