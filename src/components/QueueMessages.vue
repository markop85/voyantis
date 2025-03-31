<template>
    <div class="container">
        <h1>Queue Manager</h1>
        <div class="queues">
            <div v-for="queue in queues" :key="queue.name" class="queue">
                <span>{{ queue.name }} ({{ queue.count }})</span>
                <button @click="fetchQueue(queue.name)">Go</button>
            </div>
        </div>
        <div v-if="message" class="message">
            <h2>Message:</h2>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const queues = ref([]);
        const message = ref(null);

        const fetchQueues = async () => {
            try {
                const response = await axios.get('/api/queues');
                queues.value = response.data;
            } catch (error) {
                console.error('Error fetching queues', error);
            }
        };

        const fetchQueue = async (queueName) => {
            try {
                const response = await axios.get(`/api/queues/${queueName}?timeout=10000`);
                message.value = response.data || 'No message received';
            } catch (error) {
                console.error('Error fetching queue', error);
            }
        };

        onMounted(fetchQueues);

        return {
            queues,
            message,
            fetchQueue
        };
    }
};
</script>

<style>
.container {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 600px;
    margin: auto;
    text-align: center;
}

.queues {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.queue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #FF006D;
    border-radius: 5px;
    background-color: #f9f9f9;
}

button {
    background-color: #FF006D;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    cursor: pointer;
}

.message {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #FF006D;
    border-radius: 5px;
    background-color: #e3f2fd;
}
</style>