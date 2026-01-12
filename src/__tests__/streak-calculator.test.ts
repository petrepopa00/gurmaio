import { describe, it, expect } from 'vitest';
import { calculateStreak } from '../lib/streak-calculator';
import type { DayProgress } from '../types/domain';

describe('Streak Calculator Tests', () => {
  const mockNutrition = {
    calories: 2000,
    protein_g: 100,
    carbohydrates_g: 250,
    fats_g: 70,
  };

  const createDayProgress = (date: string): DayProgress => ({
    date,
    completed_meals: [],
    total_nutrition: mockNutrition,
    total_cost: 25,
    meals_count: 3,
  });

  describe('Streak Calculation', () => {
    it('should return streak info object', () => {
      const progress: DayProgress[] = [
        createDayProgress(new Date().toISOString().split('T')[0]),
      ];
      
      const info = calculateStreak(progress);
      expect(info).toBeDefined();
      expect(info.currentStreak).toBeDefined();
      expect(info.longestStreak).toBeDefined();
      expect(info.lastCompletedDate).toBeDefined();
      expect(info.streakActive).toBeDefined();
    });

    it('should calculate streak for consecutive days ending today', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      const progress: DayProgress[] = [
        createDayProgress(twoDaysAgo.toISOString().split('T')[0]),
        createDayProgress(yesterday.toISOString().split('T')[0]),
        createDayProgress(today.toISOString().split('T')[0]),
      ];
      
      const info = calculateStreak(progress);
      expect(info.currentStreak).toBe(3);
      expect(info.streakActive).toBe(true);
    });

    it('should return 0 streak for empty progress', () => {
      const progress: DayProgress[] = [];
      const info = calculateStreak(progress);
      expect(info.currentStreak).toBe(0);
      expect(info.longestStreak).toBe(0);
      expect(info.lastCompletedDate).toBeNull();
      expect(info.streakActive).toBe(false);
    });

    it('should calculate longest streak correctly', () => {
      const progress: DayProgress[] = [
        createDayProgress('2024-01-10'),
        createDayProgress('2024-01-11'),
        createDayProgress('2024-01-12'),
        createDayProgress('2024-01-15'),
        createDayProgress('2024-01-16'),
      ];
      
      const info = calculateStreak(progress);
      expect(info.longestStreak).toBe(3);
    });

    it('should handle unordered dates', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const progress: DayProgress[] = [
        createDayProgress(today.toISOString().split('T')[0]),
        createDayProgress(yesterday.toISOString().split('T')[0]),
      ];
      
      const info = calculateStreak(progress);
      expect(info.currentStreak).toBeGreaterThan(0);
    });
  });

  describe('Streak Status', () => {
    it('should mark streak as active when completed today', () => {
      const today = new Date();
      const progress: DayProgress[] = [
        createDayProgress(today.toISOString().split('T')[0]),
      ];
      
      const info = calculateStreak(progress);
      expect(info.streakActive).toBe(true);
    });

    it('should mark streak as active when completed yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const progress: DayProgress[] = [
        createDayProgress(yesterday.toISOString().split('T')[0]),
      ];
      
      const info = calculateStreak(progress);
      expect(info.streakActive).toBe(true);
    });

    it('should mark streak as inactive when last completion is old', () => {
      const progress: DayProgress[] = [
        createDayProgress('2024-01-01'),
      ];
      
      const info = calculateStreak(progress);
      expect(info.streakActive).toBe(false);
      expect(info.currentStreak).toBe(0);
    });
  });

  describe('Last Completed Date', () => {
    it('should track last completed date', () => {
      const date = '2024-01-15';
      const progress: DayProgress[] = [
        createDayProgress('2024-01-10'),
        createDayProgress(date),
      ];
      
      const info = calculateStreak(progress);
      expect(info.lastCompletedDate).toBe(date);
    });

    it('should return most recent date when multiple exist', () => {
      const progress: DayProgress[] = [
        createDayProgress('2024-01-10'),
        createDayProgress('2024-01-15'),
        createDayProgress('2024-01-12'),
      ];
      
      const info = calculateStreak(progress);
      expect(info.lastCompletedDate).toBe('2024-01-15');
    });
  });

  describe('Cross-Month Streaks', () => {
    it('should maintain longest streak across month boundaries', () => {
      const progress: DayProgress[] = [
        createDayProgress('2024-01-30'),
        createDayProgress('2024-01-31'),
        createDayProgress('2024-02-01'),
        createDayProgress('2024-02-02'),
      ];
      
      const info = calculateStreak(progress);
      expect(info.longestStreak).toBe(4);
    });

    it('should maintain longest streak across year boundaries', () => {
      const progress: DayProgress[] = [
        createDayProgress('2023-12-30'),
        createDayProgress('2023-12-31'),
        createDayProgress('2024-01-01'),
        createDayProgress('2024-01-02'),
      ];
      
      const info = calculateStreak(progress);
      expect(info.longestStreak).toBe(4);
    });
  });

  describe('Long Streaks', () => {
    it('should handle 30+ day longest streaks', () => {
      const progress: DayProgress[] = Array.from({ length: 45 }, (_, i) => {
        const date = new Date('2024-01-01');
        date.setDate(date.getDate() + i);
        return createDayProgress(date.toISOString().split('T')[0]);
      });
      
      const info = calculateStreak(progress);
      expect(info.longestStreak).toBe(45);
    });

    it('should handle gaps in long streaks', () => {
      const progress: DayProgress[] = [
        ...Array.from({ length: 30 }, (_, i) => {
          const date = new Date('2024-01-01');
          date.setDate(date.getDate() + i);
          return createDayProgress(date.toISOString().split('T')[0]);
        }),
        ...Array.from({ length: 20 }, (_, i) => {
          const date = new Date('2024-02-05');
          date.setDate(date.getDate() + i);
          return createDayProgress(date.toISOString().split('T')[0]);
        }),
      ];
      
      const info = calculateStreak(progress);
      expect(info.longestStreak).toBe(30);
    });
  });
});
