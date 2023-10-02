<script setup>
import { reactive } from 'vue';
import { userDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';
const databaseStore = userDatabaseStore();

const formState = reactive({
    url: ''
});

const onFinish = async (value) => {
    console.log('Todo bien' + value);
    const error = await databaseStore.addUrl(formState.url);

    if (!error) {
        return message.success('URL agregada ✅');
    }

    switch (error) {
        default:
            message.error(
                "Ocurrió un error en el servidor intentelo más tarde..."
            );
            break;
    }

}
</script>

<template>
    <a-form name="addform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="url" label="URL" :rules="[{
            required: true,
            whitespace: true,
            pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Ingrese una URL valida'
        }]">
            <a-input placeholder="Ingrese una URL" v-model:value="formState.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button 
                type="primary" 
                html-type="submit" 
                :loading="databaseStore.loading">
                Agregar URL
            </a-button>
        </a-form-item>
    </a-form>
</template>