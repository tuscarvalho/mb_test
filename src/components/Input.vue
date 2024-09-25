<script setup>
import {ref} from 'vue';

import { vMaska } from "maska/vue";

const props = defineProps({
  label: String,
  type: {
    type: String, 
    default: 'text'
  },
  id: String,
  modelValue: String, 
  validation: String, 
  mask: {
    type: String,
    default: null
  }
});

const isInvalid = ref(false);
const errorMessage = ref('');

const emitUpdateEvent = defineEmits(['update:modelValue']);
const updateValue = (event) => { 
    emitUpdateEvent('update:modelValue', event.target.value);
    
    if(!event.target.value) {
        isInvalid.value = true;
        errorMessage.value = props.validation;
    }else {
        isInvalid.value = false;
    }
};

const validate = ({valid, message}) => {
    isInvalid.value = !valid;
    errorMessage.value = message;
};

defineExpose({
    validate
});

</script>

<template>
    <div class="wrapper-ipt">
        <div class="wrapper-ipt__container">
            <label 
                class="label" 
                :for="props.id">{{ label }} 
            </label>
            <template v-if="props.mask">
                <input 
                    class="ipt" 
                    :type="type" 
                    :id="props.id"
                    v-maska="`${props.mask}`"
                    :value="modelValue"
                    @blur="updateValue"
                    @input="updateValue"
                />
            </template>
            <template v-else>
                <input 
                    class="ipt" 
                    :type="type" 
                    :id="props.id"
                    :value="modelValue"
                    @blur="updateValue"
                    @input="updateValue"
                />
            </template>
            <span class="error-message" v-if="isInvalid">{{ errorMessage  }}</span>
        </div>
    </div>
</template>

<style>
    .wrapper-ipt {
        display: flex;
    }

    .wrapper-ipt__container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .label {
        margin-bottom: .4rem;
    }

    .ipt {
        border: 1px solid black;
        border-radius: 5px;
        margin-bottom: .5rem;
        padding: .7rem;
        width: auto;
    }

    .error-message {
        color: var(--error-color);
        margin-bottom: 1rem;
    }
    
</style>