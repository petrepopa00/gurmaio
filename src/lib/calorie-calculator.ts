export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Objective = 'lose_weight' | 'maintain' | 'gain_muscle';

export interface CalorieCalculationInput {
  weight_kg: number;
  height_cm: number;
  age: number;
  sex: Sex;
  activity_level: ActivityLevel;
  objective: Objective;
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const OBJECTIVE_ADJUSTMENTS: Record<Objective, number> = {
  lose_weight: -500,
  maintain: 0,
  gain_muscle: 300,
};

export function calculateTargetCalories(input: CalorieCalculationInput): number {
  const { weight_kg, height_cm, age, sex, activity_level, objective } = input;

  let bmr: number;
  if (sex === 'male') {
    bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;
  } else {
    bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;
  }

  const tdee = bmr * ACTIVITY_MULTIPLIERS[activity_level];

  const targetCalories = tdee + OBJECTIVE_ADJUSTMENTS[objective];

  return Math.round(targetCalories);
}

export function getActivityLevelLabel(level: ActivityLevel): string {
  const labels: Record<ActivityLevel, string> = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Light (exercise 1-3 days/week)',
    moderate: 'Moderate (exercise 3-5 days/week)',
    active: 'Active (exercise 6-7 days/week)',
    very_active: 'Very Active (intense exercise daily)',
  };
  return labels[level];
}

export function getObjectiveLabel(objective: Objective): string {
  const labels: Record<Objective, string> = {
    lose_weight: 'Lose Weight',
    maintain: 'Maintain Weight',
    gain_muscle: 'Gain Muscle',
  };
  return labels[objective];
}
