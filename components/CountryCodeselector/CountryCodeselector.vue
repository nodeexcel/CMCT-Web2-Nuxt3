
<!-- import { CountryCodeselector } from '#build/components'; -->
<template>
    <Bcard
      :model-value="selectedValue"
      @update:model-value="(value) => emit('update:modelValue', value)"
      class="relative form-input flex flex-col justify-center block rounded-md border border-neutral-100 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-primary-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <div class="">
        <BButton class="w-full h-full rounded-md shadow-sm text-start cursor-default">
          <div
            class="flex items-center gap-3 px-5"
            :class="{ 'font-medium': selectedValue, 'font-normal': !selectedValue }"
          >
            <p class="text-lg" dir="ltr">{{ '+' + selectedValue.key }}</p>
            <Icon :name="getCountryFlag(selectedValue.code.toLowerCase())" size="1.4rem" class="w-16" />
          </div>
        </BButton>
  
        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <BDropdown
            class="overflow-x-hidden absolute top-20 z-10 py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none sm:text-sm"
          >
            <BDropdown 
              v-for="country in countriesCode"
              :key="country.code"
              v-slot="{ active, selected }"
              :value="country.code"
              as="template"
            >
              <li
                class="relative cursor-default select-none py-4 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <div class="flex items-center gap-4 w-32" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  <p class="font-medium w-3">{{ '+' + country.key }}</p>
                  <Icon :name="getCountryFlag(country.code.toLowerCase())" size="1.4rem" class="w-16" />
                </div>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                </span>
              </li>
            </BDropdown>
          </BDropdown>
        </transition>
      </div>
    </Bcard>
  </template>
  
  <script setup lang="ts">
//   import { getCountryFlag } from '~/helpers/countries';
  
  const props = defineProps<{ modelValue: string }>();
  const { modelValue } = toRefs(props);
  const getCountryFlag = (code: string) => {
    return 'flag:' + code.toLowerCase() + '-4x3';
  };
  const { countriesCode } = useCountriesCode();
  
  const emit = defineEmits(['update:model-value']);
  const selectedValue = computed(() => countriesCode.value?.find((co) => co.code === modelValue.value));
  </script>
  <style scoped>
  :deep(.dropdown-menu){
    display: block;
  }
  </style>
  