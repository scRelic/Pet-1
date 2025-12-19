<script setup>
import { onMounted } from "vue";
import { useFriend } from "@/composables/useFriend";
import { useRouter, useRoute } from "vue-router";
import FriendProfile from "@/components/FriendView/FriendProfile.vue";
import FriendAchievements from "@/components/FriendView/FriendAchievements.vue";
import { useNotify } from "@/composables/useNotify";

const { friend, fetchFriend, deleteFriend, addFriend } = useFriend();
const { notifySuccess } = useNotify();

const router = useRouter();
const route = useRoute();

const handleDeleteFriend = async () => {
  const friendId = Number(route.params.id);
  try {
    await deleteFriend(friendId);
    router.push("/profile");
  } catch (error) {
    console.error("Error deleting friend:", error);
  }
};

const handleAddFriend = async () => {
  const friendId = Number(route.params.id);
  try {
    await addFriend(friendId);
    await fetchFriend(friendId);
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};

onMounted(async () => {
  const friendId = Number(route.params.id);
  try {
    await fetchFriend(friendId);
  } catch (error) {
    console.error("Error fetching friend data:", error);
  }
});
</script>

<template>
  <main class="flex flex-col items-center py-8">
    <div class="container">
      <div v-if="friend" class="flex flex-col gap-6 w-full">
        <FriendProfile :friend="friend" :handleDeleteFriend="handleDeleteFriend" :handleAddFriend="handleAddFriend" @notifySuccess="notifySuccess" />
        <FriendAchievements :achievements="friend?.achievements || []" />
      </div>
      <div v-else>
        <p class="text-center text-gray-500">Завантаження даних друга...</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.material-icons {
  font-size: 1.5rem;
}
</style>
