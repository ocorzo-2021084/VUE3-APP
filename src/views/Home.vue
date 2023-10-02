<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
        <add-form></add-form>
        <p v-if="databaseStore.loadingDoc">Loading Docs...</p>
        <!-- <div v-else class="container">
            <ul class="list-group">
                <li class="list-group-item" v-for="item of databaseStore.documents" :key="item.id">
                    {{ item.id }}
                    <br>
                    {{ item.name }}
                    <br>
                    {{ item.short }}
                    <br>
                    <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                    <button @click="router.push(`/editar/${item.id}`)">Editar</button>
                </li>
            </ul>
        </div> -->

        <url-list v-else></url-list>

    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { userDatabaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const userStore = useUserStore()
const databaseStore = userDatabaseStore();
const router = useRouter();

databaseStore.getUrls();

const url = ref('');

const handleSubmit = () => {
    console.log('formulario');
    databaseStore.addUrl(url.value)
}

</script>