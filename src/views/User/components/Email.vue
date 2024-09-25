<script setup>
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';

import { validateEmail } from '../../../utils/validator.js';
import { emailValidationMessage } from '../../../utils/dictionary.js';

import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        default: () => {}
    }
})

const documentType = ref('');
const email = ref('');
const input = ref(null);

const emit = defineEmits(['setState','documentType', 'getInputValue']);

const goNext = () => {
    if(!isValidEmail.value) {
        input.value.validate({ valid: false, message: emailValidationMessage});
        return;
    }
    emit('setState', 'personal_data');
    emit('documentType', documentType.value);
    emit('getInputValue' , { email: email.value });
};

const isValidEmail = computed(() => email.value && validateEmail(email.value));

onMounted(() => {
    documentType.value = 'cpf';

    if(Object.keys(props.user).length > 0) {
        email.value = props.user.email;
    }
});
</script>

<template>
    <main>
        <Input 
            v-model="email" 
            ref="input" 
            label="Endereço de e-mail" 
            type="email" 
            :validation="emailValidationMessage"/>
        <div class="select-document">
            <input class="ipt-radio" type="radio" required id="cpf" value="cpf" v-model="documentType"/>
            <label class="label-radio" for="cpf"> Pessoa Física </label>

            <input class="ipt-radio" type="radio" required id="cnpj" value="cnpj" v-model="documentType"/>
            <label class="label-radio" for="cnpj"> Pessoa Jurídica </label>
        </div>

        <Button label="Continuar" @click.prevent="goNext" :disabled="!isValidEmail"/>
    </main>
</template> 

<style>
    .select-document {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem 1rem;
    }

    .label-radio {
        margin: 0 0 0 .3rem;
    }

    .ipt-radio {
        margin: 0;
        padding: .7rem;
        width: auto;
    }

    .label-radio,
    .ipt-radio {
        cursor: pointer;
    }
</style>