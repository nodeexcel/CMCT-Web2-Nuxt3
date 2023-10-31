<template>
  <div class="fixed top-16 w-25" >
    <Listbox 
    :model-value="selectedValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    >
      <div class="position-relative listbox-main main mt-1 d-flex flex-column">
        <ListboxButton
          class="position-relative w-100 cursor-default rounded-lg bg-white py-2 pl-1 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        style="border:none">
        <div
          class="d-flex justify-space-between gap-1  ListboxButton"
          :class="{ 'font-medium': selectedValue, 'font-normal': !selectedValue }"
           style="min-width: 100px;background: #fff;">
          
          <p class="fs-md w-3 mb-0" v-if="selectedValue.name == 'Country code'" style="font-size: 12px;color: #000;font-weight: 400;width:75px">Country Code</p>
          <p class="text-lg  mb-0" v-else dir="ltr">{{ '+' + selectedValue.key }}</p>
          <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
          <!-- <Icon :name="getCountryFlag(selectedValue.code.toLowerCase())" size="1.5rem" class="w-16" style="height:15px" /> -->
        </div>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base w-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="country in countriesCode"
              :key="country.code"
              :value="country.code"
              as="template"
            >
            <li 
                class="relative cursor-default select-none  pl-10 pr-1  list-unstyled"
                :class="{
                  'bg-teal-600 text-black': active,
                  'text-gray-900': !active,
                }"
              >
                <div class="d-flex justify-content-between gap-2 " :class="{ 'fs-md': selected, 'fs': !selected }" v-if="country.code !== ''" style="border-radius:unset !important" >
                  <p class="pl-2" style="font-size: 14px;" >{{ country.name }}</p>
                  <Icon :name="getCountryFlag(country.code.toLowerCase())" size="1.4rem" class="w-16 mt-1"  />
                </div>
                <span
                  v-if="selected"
                  class="position-absolute d-flex justify-items-center pl-1"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { getCountryFlag } from '~/helpers/countries';

const props = defineProps<{ modelValue: string }>();
const { modelValue } = toRefs(props);

const { countriesCode } = useCountriesCode();

const emit = defineEmits(['update:model-value']);
const selectedValue = computed(() => countriesCode.value?.find((co) => co.code === modelValue.value));
</script>
<style scoped>
.main{
  z-index: 9999;
  left: 5px;
}
.main ul{
  height: 300px;
  padding-left: 12px;
  padding: 0;
  position: absolute;
  top: 100%;
  list-style: none;
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  min-width: 230px;
  overflow-x:hidden !important;
  overflow-y:auto ;
}
.main ul li div{
  height: 3rem;
}
.ListboxButton{
  line-height: 15px;
  height: 15px;
}

/* .listbox-main{
  top:2.3rem
} */
</style>
