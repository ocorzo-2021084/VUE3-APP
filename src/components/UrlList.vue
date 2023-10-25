<script setup>
import { userDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const databaseStore = userDatabaseStore();
const router = useRouter();

const confirm = (id) => {
    console.log(id);
    databaseStore.deleteUrl(id);
    message.success("Eliminado");
};

const cancel = (e) => {
    console.log(e);
    message.error("No se eliminó");
};

const copiarPortapapeles = (id) => {
    const path = `${window.location.origin}/${id}`;
    console.log(id);
    if (!navigator.clipboard) {
        return message.error('No se pudo copiar 💋');
    }

    navigator.clipboard.writeText(path)
        .then(() => {
            message.success('URL copiada');
        })
        .catch(err => {
            message.error('No se pudo copiar 💋', err);
        });
}

databaseStore.getUrls();
</script>

<template>
    <a-space direction="vertical" style="width: 100%">
        <a-card v-for="item of databaseStore.documents" :key="item.id" :title="item.short">
            <template #extra>
                <a-space>
                    <a-button @click="copiarPortapapeles(item.id)">Copiar</a-button>
                    <a-button @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                    <a-popconfirm title="¿Estás seguro que deseas eliminar este documento?" ok-text="Yes" cancel-text="No"
                        @confirm="confirm(item.id)" @cancel="cancel">
                        <a-button danger>Eliminar</a-button>
                    </a-popconfirm>
                </a-space>
            </template>
            <p>{{ item.name }}</p>
        </a-card>
    </a-space>
</template>

