<script setup>
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';
import { passwordValidationMessage } from '../../../utils/dictionary.js';
import { validatePassword } from '../../../utils/validator.js';

import { ref, computed } from 'vue';

const props = defineProps({
    documentType: String,
});

const input = ref(null);
const emit = defineEmits(['setState']);

const password = ref('');

const goNext = () => {
    if(!isPasswordValid.value) {
        input.value.validate({ valid: false, message: passwordValidationMessage});
        return;
    }

    emit('setState', 'review');
    emit('getInputValue', { password: password.value });
};

const isPasswordValid = computed(() => password.value && validatePassword(password.value));
</script>

<template>
    <main>
        <Input 
            v-model="password"
            ref="input" 
            label="Senha" 
            type="password" 
        />
        <div class="btn-actions">
            <Button label="Voltar" :light="true" @click.prevent="$emit('setState','personal_data')"/>
            <Button label="Continuar" @click.prevent="goNext"/>
        </div>
    </main>
</template>


<style>
    .btn-actions {
        display: flex;
        justify-content: space-between;
    } 

    .btn-actions > div {
        width: 150px;
    }
</style>
