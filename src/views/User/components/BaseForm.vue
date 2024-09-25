<script setup>
import Email from './Email.vue';
import PersonalInfo from './PersonalInfo.vue';
import Password from './Password.vue';
import Review from './Review.vue';
import Step from '../../../components/Step.vue';
import Modal from '../../../components/Modal.vue';
import { fetchRegisters  }  from '../../../services/user.js';

import { ref, onBeforeMount, onMounted } from 'vue';

const STATES = {
    DOCUMENT:  'document',
    PERSONAL_DATA: 'personal_data',
    PASSWORD: 'password',
    REVIEW: 'review'
};

const documentType = ref('');
const currentState = ref('');
const endStep = ref(4);
const user = ref({});
const isOpen = ref(false);
const modal = ref({});

const STEPS = {
    document: {
        step: 1,
        title: 'Seja bem-vindo(a)'
    },
    personal_data: {
        step: 2,
        title: 'Preencha os dados',
    },
    password: {
        step: 3,
        title: 'Senha de acesso'
    },
    review: {
        step: 4,
        title: 'Revise suas informações'
    }
};

const documentTypeValue = document =>  documentType.value = document; 
const isState = (state) => currentState.value === state;
const setState = (state) => currentState.value = state;
const mountObject = (data) =>  Object.assign(user.value, data);
const showModal = (modalInfos) => {
    modal.value = modalInfos;
    const CLOSING_TIME = 4000;
    isOpen.value = true;

    setTimeout(() => {
        isOpen.value = false;
    }, CLOSING_TIME);
};

const clearFields = () => {
    user.value = {};
}

onBeforeMount(() => { 
    setState('document');
});

onMounted(async () => {
    await fetchRegisters();
})
</script>

<template>
    <Modal v-if="isOpen" :status="modal.status">
        <template #message> {{ modal.message }} </template>
    </Modal>

    <Step 
        :currentStep="STEPS[currentState].step" 
        :endStep="endStep" 
        :title="STEPS[currentState].title"
    >
        <template #title />
    </Step>

    <form>
        <section v-if="isState(STATES.DOCUMENT)">
            <Email 
                @setState="setState"
                :user="user"
                @documentType="documentTypeValue"
                @getInputValue="mountObject"
            />
        </section>

        <section v-if="isState(STATES.PERSONAL_DATA)">
            <PersonalInfo 
                :documentType="documentType" 
                :user="user"
                @setState="setState"
                @getInputValue="mountObject"
            />
        </section>

        <section v-if="isState(STATES.PASSWORD)">
            <Password 
                @setState="setState" 
                @getInputValue="mountObject"
            />
        </section>

        <section v-if="isState(STATES.REVIEW)">
            <Review 
                :user="user"
                :documentType="documentType"
                @showModal="showModal"
                @setState="setState"
                @clearFields="clearFields"
            />
        </section>
    </form>
</template>