<template>
    <h1>Editar id: {{ route.params.id }}</h1>
    <a-form name="editform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="url" label="URL" :rules="[{
            required: true,
            whitespace: true,
            pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Ingrese una URL valida'
        }]">
            <a-input placeholder="Ingrese una URL" v-model:value="formState.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="databaseStore.loading">
                Editar URL
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, reactive } from 'vue';
import { userDatabaseStore } from '../stores/database'; 
import { message } from 'ant-design-vue';

const databaseStore = userDatabaseStore();
const route = useRoute();
console.log(route.params.id);

const onFinish = async (value) => {
    console.log('Todo bien' + value);
    const error = await databaseStore.updateUrl(route.params.id, formState.url);
    if (!error) {
        return message.success('URL editada ✅');
    }
    switch (error) {
        default:
            message.error(
                "Ocurrió un error en el servidor intentelo más tarde..."
            );
            break;
    }
}

const formState = reactive({
    url: ''
});

const url = reactive('');

onMounted(async () => {
    formState.url = await databaseStore.leerUrl(route.params.id);
});

</script>