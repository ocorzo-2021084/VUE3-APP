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

databaseStore.getUrls();
</script>

<template>
    <a-space direction="vertical" style="width: 100%">
            <a-card
                v-for="item of databaseStore.documents"
                :key="item.id"
                :title="item.short"
            >
                <template #extra>
                    <a-space>
                        <a-button @click="router.push(`/editar/${item.id}`)"
                            >Editar</a-button
                        >
                        <a-popconfirm
                            title="¿Estás seguro que deseas eliminar este documento?"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="confirm(item.id)"
                            @cancel="cancel"
                        >
                            <a-button danger>Eliminar</a-button>
                        </a-popconfirm>
                    </a-space>
                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>
</template>

