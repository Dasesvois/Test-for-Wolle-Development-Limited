export type Reward = {
  title: string;
  value: string;
};

export type QuestTask = {
  id: number;
  title: string;
  description: string;
  button: string;
  status: 'available' | 'locked';
};

export type DailyWheelState = {
  currentDay: number;
  totalDays: number;
  canSpin: boolean;
};