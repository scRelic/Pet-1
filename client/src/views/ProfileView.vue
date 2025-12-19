<script setup lang="ts">
import TheMainInfo from "@/components/ProfileView/TheMainInfo.vue";
import TheAdditionalInfo from "@/components/ProfileView/TheAdditionalInfo.vue";
import TheModal from "@/components/TheModal.vue";
import Avatar from "@/components/FriendView/Avatar.vue";
import { onMounted, provide, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useAchievements } from "@/composables/useAchievements";

const userStore = useUserStore();
const { achievements, fetchAchievements } = useAchievements();

const isEditMode = ref(false);
const showModal = ref(false);

const toggleEditMode = () => (isEditMode.value = !isEditMode.value);
const openModal = () => (showModal.value = true);

provide("toggleEditMode", toggleEditMode);

watch(showModal, (val) => {
  document.body.classList.toggle("overflow-hidden", val);
});

document.title = "Профіль користувача";

onMounted(async () => {
  try {
    await userStore.getUser();
    await fetchAchievements();
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
});
</script>

<template>
  <main class="my-10">
    <div class="container">
      <div class="flex flex-col gap-6">
        <TheModal v-model="showModal">
          <h2 class="text-2xl font-extrabold text-[#22D3EE] mb-6 text-center">Друзі</h2>
          <PerfectScrollbar class="max-h-[500px] overflow-y-scroll py-1">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
              <div v-for="friend in userStore.friends" :key="friend.id" class="flex flex-col items-center">
                <Avatar :friend="friend" />
              </div>
            </div>
          </PerfectScrollbar>
        </TheModal>
        <TheMainInfo :user="userStore.user" :isEditMode="isEditMode" @openModal="openModal" />
        <TheAdditionalInfo :user="userStore.user" :isEditMode="isEditMode" :globalAchievements="achievements" />
      </div>
    </div>
  </main>
</template>
