import type { MacroTargets } from '@/types/domain';

export type MacroPreset = 'balanced' | 'high_protein' | 'low_carb' | 'keto' | 'endurance' | 'custom';

export const MACRO_PRESETS: Record<MacroPreset, MacroTargets> = {
  balanced: {
    protein_percentage: 30,
    carbs_percentage: 40,
    fats_percentage: 30,
  },
  high_protein: {
    protein_percentage: 40,
    carbs_percentage: 35,
    fats_percentage: 25,
  },
  low_carb: {
    protein_percentage: 35,
    carbs_percentage: 25,
    fats_percentage: 40,
  },
  keto: {
    protein_percentage: 25,
    carbs_percentage: 5,
    fats_percentage: 70,
  },
  endurance: {
    protein_percentage: 20,
    carbs_percentage: 55,
    fats_percentage: 25,
  },
  custom: {
    protein_percentage: 30,
    carbs_percentage: 40,
    fats_percentage: 30,
  },
};

export function getMacroPresetLabel(preset: MacroPreset): string {
  const labels: Record<MacroPreset, string> = {
    balanced: 'Balanced (30/40/30)',
    high_protein: 'High Protein (40/35/25)',
    low_carb: 'Low Carb (35/25/40)',
    keto: 'Ketogenic (25/5/70)',
    endurance: 'Endurance (20/55/25)',
    custom: 'Custom',
  };
  return labels[preset];
}

export function calculateMacroGrams(calories: number, macros: MacroTargets): {
  protein_g: number;
  carbs_g: number;
  fats_g: number;
} {
  const proteinPercent = macros.protein_percentage || 30;
  const carbsPercent = macros.carbs_percentage || 40;
  const fatsPercent = macros.fats_percentage || 30;

  const proteinCalories = (calories * proteinPercent) / 100;
  const carbsCalories = (calories * carbsPercent) / 100;
  const fatsCalories = (calories * fatsPercent) / 100;

  return {
    protein_g: Math.round(proteinCalories / 4),
    carbs_g: Math.round(carbsCalories / 4),
    fats_g: Math.round(fatsCalories / 9),
  };
}

export function validateMacroTargets(macros: MacroTargets): boolean {
  const protein = macros.protein_percentage || 0;
  const carbs = macros.carbs_percentage || 0;
  const fats = macros.fats_percentage || 0;
  
  const total = protein + carbs + fats;
  return Math.abs(total - 100) < 0.1;
}

export function normalizeMacroTargets(macros: MacroTargets): MacroTargets {
  const protein = macros.protein_percentage || 30;
  const carbs = macros.carbs_percentage || 40;
  const fats = macros.fats_percentage || 30;
  
  const total = protein + carbs + fats;
  
  if (Math.abs(total - 100) < 0.1) {
    return macros;
  }
  
  return {
    protein_percentage: Math.round((protein / total) * 100),
    carbs_percentage: Math.round((carbs / total) * 100),
    fats_percentage: Math.round((fats / total) * 100),
  };
}

export function getMacroDescription(macros: MacroTargets): string {
  return `${macros.protein_percentage}% Protein / ${macros.carbs_percentage}% Carbs / ${macros.fats_percentage}% Fats`;
}
