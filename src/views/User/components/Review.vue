<script setup>
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';
import { register  as registerUser }  from '../../../services/user.js';
import { 
    createdUserMessage, 
    errorCreatedUserMessage, 
    nameValidationMessage,
    cpfValidationMessage,
    birthValidationMessage,
    phoneValidationMessage,
    emailValidationMessage
} from '../../../utils/dictionary.js';
import { CUSTOM_LABEL_FOR_CPF_CNJP } from '../../../utils/constants.js';
import { validateEmail, validatePassword, validateCpf,  validateCnpj} from '../../../utils/validator.js';

import { ref, onMounted, computed } from 'vue';

const props = defineProps({
    documentType: String,
    user: Object
});

const input = ref(null);
const email = ref('');
const name = ref('');
const cpfOrCnpj = ref('');
const birth = ref('');
const phone = ref('');   
const password = ref('');

const emit = defineEmits(['showModal', 'setState', 'clearFields']);

const save = async () => {
    if(!isFormValid.value) {
        input.value.validate({ valid: false, message: emailValidationMessage});
        return;
    }
    
    try {
        const response =  await registerUser(props.user);
    
        if(response.ok) {
            modalEvent('success', createdUserMessage);
            emit('clearFields');
            redirect();
        }
    } catch (error) {
        modalEvent('error', errorCreatedUserMessage);
        emit('clearFields');
        redirect();
        throw Error('Tente novamente', error);
    }
};

const modalEvent = (status, messageValue) => {
    emit('showModal', {status,  message: messageValue });
};

const redirect = () => {
    const TIME_FOR_RELOAD = 3000;

    setTimeout(() => {
        emit('setState', 'document');
    }, TIME_FOR_RELOAD);
}

const validateCpfOrCnpj = (document) => {
    if(props.documentType === 'cpf') {
        return validateCpf(document);
    }

    return validateCnpj(document);
};

const isFormValid = computed(() => 
    (   
        name.value && 
        birth.value && 
        phone.value &&
        validateEmail(email.value) &&
        validatePassword(password.value) &&
        validateCpfOrCnpj(cpfOrCnpj.value) 
    )
);

const customMaskForCpfOrCnpj = () => {
    if(props.documentType === 'cpf') {
        return "###.###.###-##";
    }
    return "##.###.###/####-##";
}

onMounted(() => {
    email.value = props.user.email;
    name.value = props.user.name;
    cpfOrCnpj.value = props.user.cpfOrCnpj;
    birth.value = props.user.birth;
    phone.value = props.user.phone;
    password.value = props.user.password;
});

</script>

<template>
    <main>
        <Input 
            label="E-mail" 
            ref="input"
            v-model="email"
            :validation="emailValidationMessage"
        />
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

        <Button label="Salvar" @click.prevent="save"/>
    </main>
</template>
