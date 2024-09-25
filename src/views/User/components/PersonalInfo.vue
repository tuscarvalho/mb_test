<script setup>
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';
import { 
    generalMessage, 
    nameValidationMessage, 
    cpfValidationMessage,
    birthValidationMessage,
    phoneValidationMessage
} from '../../../utils/dictionary.js';
import { validateCpf, validateCnpj } from '../../../utils/validator.js';
import { CUSTOM_LABEL_FOR_CPF_CNJP } from '../../../utils/constants.js';


import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    documentType: String,
    user: {
        type: Object,
        default: () => {}
    }
});

const input = ref(null);
const name = ref('');
const cpfOrCnpj = ref('');
const birth = ref('');
const phone = ref('');

const emit = defineEmits(['setState', 'getInputValue', 'input']);

const goNext = () => {
    if(!isFormValid.value) {
        input.value.validate({ valid: false, message: generalMessage});
        return;
    }

    emit('setState', 'password');
    emit('getInputValue' , { 
        name: name.value,
        cpfOrCnpj: cpfOrCnpj.value,
        birth: birth.value,
        phone: phone.value 
    })
};

const isFormValid = computed(() => 
    (
        name.value && 
        validateCpfOrCnpj(cpfOrCnpj.value) &&
        birth.value && 
        phone.value
    )
);

const validateCpfOrCnpj = (document) => {
    if(props.documentType === 'cpf') {
        return validateCpf(document)
    }

    return validateCnpj(document);
};

const customMaskForCpfOrCnpj = () => {
    if(props.documentType === 'cpf') {
        return "###.###.###-##";
    }
    return "##.###.###/####-##";
};

onMounted(() => {
    if(Object.keys(props.user).length > 0) {
        name.value = props.user.name;
        cpfOrCnpj.value = props.user.cpfOrCnpj;
        birth.value = props.user.birth;
        phone.value = props.user.phone;
    }
});
</script>

<template>
    <main>
        <Input 
            v-model="name"
            ref="input" 
            :label="CUSTOM_LABEL_FOR_CPF_CNJP[props.documentType].name" 
            :validation="nameValidationMessage"
        />
        <Input 
            v-model="cpfOrCnpj" 
            ref="input" 
            :label="CUSTOM_LABEL_FOR_CPF_CNJP[props.documentType].document" 
            :mask="customMaskForCpfOrCnpj()"
            :validation="cpfValidationMessage"
            />
        <Input 
            v-model="birth"
            ref="input" 
            :label="CUSTOM_LABEL_FOR_CPF_CNJP[props.documentType].birth" 
            :validation="birthValidationMessage"
            mask="##/##/####"
        />
        <Input 
            v-model="phone"
            ref="input" 
            label="Telefone" 
            mask="(##) #####-####"
            :validation="phoneValidationMessage"
        />

        <div class="btn-actions">
            <Button label="Voltar" :light="true" @click="$emit('setState', 'document')"/>
            <Button label="Continuar" @click.prevent="goNext" :disabled="!isFormValid"/>
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