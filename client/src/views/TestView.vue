<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuestions } from "@/composables/useQuestions";
import { useTestStore } from "@/stores/test";
import TheModal from "@/components/TheModal.vue";

const router = useRouter();
const route = useRoute();
const testStore = useTestStore();
const { questions, fetchQuestions } = useQuestions();
const testId = parseInt(route.params.testId as string, 10);

const questionsLength = computed(() => questions.value?.length || 0);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref<string | null>(null);
const score = ref(0);
const showModal = ref(false);

const countCorrectAnswers = () => {
  const currentQuestion = questions.value?.[currentQuestionIndex.value];
  if (selectedAnswer.value === currentQuestion?.correct_answer) {
    score.value++;
  }
};

const closeModal = () => {
  router.push("/");
};

const nextQuestion = async () => {
  if (currentQuestionIndex.value < questionsLength.value - 1) {
    countCorrectAnswers();
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
  } else {
    countCorrectAnswers();
    try {
      await testStore.saveResultsForTest(testId, score.value, questionsLength.value);
      showModal.value = true;
    } catch (e) {
      console.error("Error saving test results:", e);
    }
  }
};

document.title = "Тестування";

onMounted(async () => {
  await fetchQuestions(testId);
});
</script>

<template>
  <main class="my-16">
    <div class="container">
      <TheModal v-model="showModal" :actionAfterClosing="closeModal">
        <div class="flex flex-col items-center justify-center py-8 px-4">
          <div class="relative mb-6">
            <div class="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#974fdb] rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#974fdb] flex items-center justify-center shadow-2xl">
              <svg
                v-if="Math.round((score / questionsLength) * 100) >= 70"
                class="w-14 h-14 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg
                v-else-if="Math.round((score / questionsLength) * 100) >= 40"
                class="w-14 h-14 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <h2 class="text-4xl font-extrabold bg-gradient-to-r from-[#22D3EE] to-[#974fdb] bg-clip-text text-transparent mb-6 text-center">Результат тесту</h2>

          <div class="bg-gradient-to-br from-[#1a1625] to-[#0f0e13] rounded-2xl border border-[#2b2136] p-8 mb-6 w-full max-w-md shadow-2xl">
            <div class="text-center mb-4">
              <div class="text-6xl font-black mb-2">
                <span class="bg-gradient-to-r from-[#22D3EE] to-[#974fdb] bg-clip-text text-transparent">{{ score }}</span>
                <span class="text-gray-500 text-4xl">/</span>
                <span class="text-gray-400 text-4xl">{{ questionsLength }}</span>
              </div>
              <div class="text-gray-400 text-sm uppercase tracking-wider">балів набрано</div>
            </div>

            <div class="relative w-full h-4 bg-[#1a1625] rounded-full overflow-hidden mb-4 border border-[#2b2136]">
              <div
                class="absolute top-0 left-0 h-full bg-gradient-to-r from-[#22D3EE] to-[#974fdb] transition-all duration-1000 ease-out rounded-full shadow-lg"
                :style="{ width: `${Math.round((score / questionsLength) * 100)}%` }"></div>
            </div>

            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">{{ Math.round((score / questionsLength) * 100) }}%</div>
              <div class="text-sm text-gray-400">правильних відповідей</div>
            </div>

            <div class="mt-6 text-center">
              <p v-if="Math.round((score / questionsLength) * 100) >= 90" class="text-green-400 font-semibold">🎉 Відмінний результат!</p>
              <p v-else-if="Math.round((score / questionsLength) * 100) >= 70" class="text-[#22D3EE] font-semibold">✨ Чудова робота!</p>
              <p v-else-if="Math.round((score / questionsLength) * 100) >= 50" class="text-yellow-400 font-semibold">👍 Непоганий результат!</p>
              <p v-else-if="Math.round((score / questionsLength) * 100) >= 30" class="text-orange-400 font-semibold">💪 Є куди рости!</p>
              <p v-else class="text-red-400 font-semibold">📚 Варто повторити матеріал</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              class="flex-1 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#6c3bbf] hover:to-[#974fdb] cursor-pointer"
              @click="closeModal">
              <span class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                На головну
              </span>
            </button>
            <button
              class="flex-1 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#06B6D4] hover:to-[#22D3EE] cursor-pointer"
              @click="router.go(0)">
              <span class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Пройти ще раз
              </span>
            </button>
          </div>
        </div>
      </TheModal>
      <div class="w-full bg-[#201D2A] rounded-2xl shadow-2xl p-10 border border-[#392750]">
        <h2 class="text-3xl font-extrabold text-white mb-8 text-center">Тестування</h2>
        <div v-if="questions && questions.length > 0">
          <div class="mb-6">
            <div class="flex items-center justify-between mb-8">
              <span class="text-white font-medium">Питання {{ currentQuestionIndex + 1 }} / {{ questionsLength }}</span>
              <div class="w-[calc(100%-130px)] h-2 bg-[#e9d5ff] rounded">
                <div
                  class="h-2 bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] rounded"
                  :style="{ width: ((currentQuestionIndex + 1) / questionsLength) * 100 + '%' }"></div>
              </div>
            </div>
            <div v-for="(question, idx) in questions" :key="question.id" v-show="idx === currentQuestionIndex">
              <div class="text-xl font-semibold mb-6 text-center text-white">{{ question.question_text }}</div>
              <div class="grid grid-cols-2 gap-4">
                <button
                  class="py-4 px-4 rounded-xl border font-medium transition text-base cursor-pointer shadow"
                  v-for="option in question.options"
                  :key="option"
                  :class="[
                    selectedAnswer === option
                      ? 'bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white border-[#974fdb]'
                      : 'bg-[#f3e8ff] text-[#392750] border-[#e9d5ff] hover:bg-[#e9d5ff]',
                  ]"
                  @click="selectedAnswer = option">
                  {{ option }}
                </button>
              </div>
            </div>
          </div>
          <button
            @click="nextQuestion"
            class="bttn-primary soft-shadow w-full text-white py-3 rounded-xl font-bold text-lg transition cursor-pointer mt-4 hover:scale-101 hover:shadow-xl">
            Наступне питання
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
