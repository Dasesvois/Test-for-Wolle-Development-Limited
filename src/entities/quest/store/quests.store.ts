import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export type Reward = {
  id: number;
  title: string;
  value: string;
  image: string;
};

export type QuestTask = {
  id: number;
  title: string;
  description: string;
  button: string;
  status: 'available' | 'locked';
};

type DailyWheelProgress = {
  streakDay: number;
  lastSpinDate: string | null;
  claimedFinalReward: boolean;
};

const STORAGE_KEY = 'daily-wheel-progress';

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function diffDays(from: string, to: string) {
  const fromDate = new Date(`${from}T00:00:00`);
  const toDate = new Date(`${to}T00:00:00`);
  const ms = toDate.getTime() - fromDate.getTime();
  return Math.round(ms / 86400000);
}

function loadProgress(): DailyWheelProgress {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      streakDay: 1,
      lastSpinDate: null,
      claimedFinalReward: false,
    };
  }

  try {
    const parsed = JSON.parse(raw) as DailyWheelProgress;

    return {
      streakDay: Math.min(Math.max(parsed.streakDay || 1, 1), 7),
      lastSpinDate: parsed.lastSpinDate ?? null,
      claimedFinalReward: Boolean(parsed.claimedFinalReward),
    };
  } catch {
    return {
      streakDay: 1,
      lastSpinDate: null,
      claimedFinalReward: false,
    };
  }
}

function saveProgress(progress: DailyWheelProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export const useQuestsStore = defineStore('quests', () => {
  const baseUrl = import.meta.env.BASE_URL;
  const rewards = ref<Reward[]>([
    { id: 1, title: 'СКИДКА', value: '70%', image: `${baseUrl}images/pres1.png` },
    { id: 2, title: 'СКИДКА', value: '50%', image: `${baseUrl}images/pres1.png` },
    { id: 3, title: 'СКИДКА', value: '30%', image: `${baseUrl}images/pres1.png` },
    { id: 4, title: 'БЕСПЛАТНЫЕ', value: '6 часов', image: `${baseUrl}images/pres2.png` },
    { id: 5, title: 'СКИДКА', value: '20%', image: `${baseUrl}images/pres1.png` },
    { id: 6, title: 'ПОПРОБУЙТЕ', value: 'заВтра', image: `${baseUrl}images/pres1.png` },
  ]);

  const tasks = ref<QuestTask[]>([
    {
      id: 1,
      title: 'ОСТАВЬ ОТЗЫВ',
      description: 'Поделитесь своим мнением о HiroVPN и получите 3 дня VPN бесплатно!',
      button: 'ОСТАВИТЬ ОТЗЫВ',
      status: 'available',
    },
    {
      id: 2,
      title: 'ПОДЕЛИТЬСЯ С ДРУЗЬЯМИ',
      description: 'Пригласите друга в HiroVPN и получите 1 день VPN бесплатно!',
      button: 'ПОДЕЛИТЬСЯ',
      status: 'available',
    },
    {
      id: 3,
      title: 'ПОДДЕРЖИТЕ НАС ЛАЙКАМИ',
      description: 'Поставьте лайки 5 комментариям, с которыми вы согласны, и мы подарим вам 2 дня VPN бесплатно!',
      button: 'ПОДДЕРЖАТЬ',
      status: 'available',
    },
    {
      id: 4,
      title: 'ОЦЕНИ НАС В GOOGLE КАРТАХ',
      description: 'Поделись впечатлением и получи 1 день VPN в подарок!',
      button: 'ОЦЕНИТЬ',
      status: 'available',
    },
    {
      id: 5,
      title: 'ОЦЕНИ НАС В ЯНДЕКС КАРТАХ',
      description: 'Поделись впечатлением и получи 1 день VPN в подарок!',
      button: 'ОЦЕНИТЬ',
      status: 'available',
    },
    {
      id: 6,
      title: 'ПОДПИСАТЬСЯ НА TG-КАНАЛ',
      description: 'Подпишитесь на канал HiroVPN — получайте новости и апдейты первыми, а также 1 день VPN бесплатно!',
      button: 'ПОДПИСАТЬСЯ',
      status: 'available',
    },
  ]);

  const progress = ref<DailyWheelProgress>(loadProgress());

  const isSpinning = ref(false);
  const activeRewardIndex = ref(0);
  const selectedReward = ref<Reward | null>(null);
  const isResultModalOpen = ref(false);

  const todayKey = computed(() => getTodayKey());

  const hasSpunToday = computed(() => {
    return progress.value.lastSpinDate === todayKey.value;
  });

  const canClaimFinalReward = computed(() => {
    return progress.value.streakDay >= 7 && !progress.value.claimedFinalReward;
  });

  const canSpinToday = computed(() => {
    if (canClaimFinalReward.value) return false;
    return !hasSpunToday.value;
  });

  const currentDay = computed(() => progress.value.streakDay);

  const spinButtonText = computed(() => {
    if (canClaimFinalReward.value) return 'ЗАБРАТЬ НАГРАДУ';
    if (hasSpunToday.value) return 'ПРИХОДИ ЗАВТРА';
    return 'ИСПЫТАТЬ УДАЧУ';
  });

  const countdownTarget = computed<number | null>(() => {
    if (!hasSpunToday.value) return null;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return tomorrow.getTime();
  });

  function resetDailyWheelProgress() {
  progress.value = {
    streakDay: 1,
    lastSpinDate: null,
    claimedFinalReward: false,
  };

  isSpinning.value = false;
  activeRewardIndex.value = 0;
  selectedReward.value = null;
  isResultModalOpen.value = false;

  saveProgress(progress.value);
}

  function refreshProgressState() {
    const loaded = loadProgress();
    const today = getTodayKey();

    if (!loaded.lastSpinDate) {
      progress.value = loaded;
      saveProgress(progress.value);
      return;
    }

    const daysPassed = diffDays(loaded.lastSpinDate, today);

    if (daysPassed <= 0) {
      progress.value = loaded;
      saveProgress(progress.value);
      return;
    }

    if (daysPassed === 1) {
      progress.value = loaded;
      saveProgress(progress.value);
      return;
    }

    progress.value = {
      streakDay: 1,
      lastSpinDate: null,
      claimedFinalReward: false,
    };
    saveProgress(progress.value);
  }

  function markTodaySpinComplete() {
    const today = getTodayKey();

    if (progress.value.lastSpinDate) {
      const daysPassed = diffDays(progress.value.lastSpinDate, today);

      if (daysPassed > 1) {
        progress.value.streakDay = 1;
        progress.value.claimedFinalReward = false;
      } else if (daysPassed === 1) {
        progress.value.streakDay = Math.min(progress.value.streakDay + 1, 7);
      }
    } else {
      progress.value.streakDay = 1;
    }

    progress.value.lastSpinDate = today;
    saveProgress(progress.value);
  }

  function claimFinalReward() {
    if (!canClaimFinalReward.value) return;

    progress.value.claimedFinalReward = true;
    saveProgress(progress.value);
  }

  function closeResultModal() {
    isResultModalOpen.value = false;
  }

  refreshProgressState();

  return {
    rewards,
    tasks,
    progress,
    isSpinning,
    activeRewardIndex,
    selectedReward,
    isResultModalOpen,
    hasSpunToday,
    canSpinToday,
    canClaimFinalReward,
    currentDay,
    spinButtonText,
    countdownTarget,
    closeResultModal,
    markTodaySpinComplete,
    claimFinalReward,
    refreshProgressState,
    resetDailyWheelProgress,
  };
});