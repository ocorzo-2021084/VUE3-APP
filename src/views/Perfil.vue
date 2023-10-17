<template>
    <h1>Perfil de usuario</h1>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <!-- <a-card> -->
            <a-form name="basicPerfil" autocomplete="off" layout="vertical" :model="userStore.userData" @finish="onFinish">
                <a-form-item name="email" label="Tu correo (no modificable)" :rules="[
                    {
                        whitespace: true,
                        type: 'email',
                        message: 'Ingresa un email válido',
                    },
                ]">
                    <a-input disabled v-model:value="userStore.userData.email"></a-input>
                </a-form-item>
                <a-form-item name="displayName" label="Ingrese su nickname" :rules="[
                    {
                        required: true,
                        whitespace: true,
                        message: 'Ingresa un nickname válido',
                    },
                ]">
                    <a-input v-model:value="userStore.userData.displayName"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser">Actualizar información</a-button>
                </a-form-item>
            </a-form>
            <!-- </a-card> -->
        </a-col>
    </a-row>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const onFinish = async(value) => {
    const error = await userStore.updateUser(userStore.userData.displayName);
    if(!error){
        message.success('Se ha actualizado tu info correctamente.')
    }else {
        message.error('Ocurrio un error a la hora de actualizar tu perfil.')
    }
};
</script>
