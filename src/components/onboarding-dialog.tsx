import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { UserProfile } from '@/types/domain';
import { toast } from 'sonner';

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (profile: UserProfile) => void;
  existingProfile?: UserProfile | null;
}

const DIETARY_OPTIONS = [
  'Balanced',
  'High Protein',
  'Low Carb',
  'Vegetarian',
  'Vegan',
  'Mediterranean',
  'Paleo',
];

const ALLERGEN_OPTIONS = [
  'Gluten',
  'Dairy',
  'Nuts',
  'Shellfish',
  'Eggs',
  'Soy',
];

const CUISINE_OPTIONS = [
  'Italian',
  'Asian',
  'Mediterranean',
  'Mexican',
  'American',
  'Indian',
];

export function OnboardingDialog({ open, onOpenChange, onSave, existingProfile }: OnboardingDialogProps) {
  const [budget, setBudget] = useState(existingProfile?.budget_eur?.toString() || '50');
  const [budgetPeriod, setBudgetPeriod] = useState<'daily' | 'weekly'>(existingProfile?.budget_period || 'weekly');
  const [days, setDays] = useState(existingProfile?.meal_plan_days?.toString() || '5');
  const [dietaryPrefs, setDietaryPrefs] = useState<string[]>(existingProfile?.dietary_preferences || ['Balanced']);
  const [allergens, setAllergens] = useState<string[]>(existingProfile?.allergens || []);
  const [cuisines, setCuisines] = useState<string[]>(existingProfile?.cuisine_preferences || ['Italian', 'Mediterranean']);
  const [calories, setCalories] = useState(existingProfile?.target_calories?.toString() || '');

  const handleSave = () => {
    const budgetNum = parseFloat(budget);
    const daysNum = parseInt(days);
    const caloriesNum = calories ? parseInt(calories) : undefined;

    if (isNaN(budgetNum) || budgetNum <= 0) {
      toast.error('Please enter a valid budget');
      return;
    }

    if (isNaN(daysNum) || daysNum < 1 || daysNum > 14) {
      toast.error('Please enter days between 1 and 14');
      return;
    }

    if (dietaryPrefs.length === 0) {
      toast.error('Please select at least one dietary preference');
      return;
    }

    const profile: UserProfile = {
      budget_eur: budgetNum,
      budget_period: budgetPeriod,
      meal_plan_days: daysNum,
      dietary_preferences: dietaryPrefs,
      allergens,
      cuisine_preferences: cuisines,
      target_calories: caloriesNum,
    };

    onSave(profile);
  };

  const toggleDietary = (option: string) => {
    setDietaryPrefs((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    );
  };

  const toggleAllergen = (option: string) => {
    setAllergens((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    );
  };

  const toggleCuisine = (option: string) => {
    setCuisines((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            {existingProfile ? 'Update Your Profile' : 'Create Your Profile'}
          </DialogTitle>
          <DialogDescription>
            Tell us about your budget, dietary preferences, and nutrition goals.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (EUR)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                min="1"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="50.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget-period">Budget Period</Label>
              <Select value={budgetPeriod} onValueChange={(v) => setBudgetPeriod(v as 'daily' | 'weekly')}>
                <SelectTrigger id="budget-period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Per Day</SelectItem>
                  <SelectItem value="weekly">Per Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="days">Meal Plan Days</Label>
              <Input
                id="days"
                type="number"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Target Calories (optional)</Label>
              <Input
                id="calories"
                type="number"
                min="1000"
                max="5000"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="2000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Dietary Preferences</Label>
            <div className="grid grid-cols-2 gap-2">
              {DIETARY_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dietary-${option}`}
                    checked={dietaryPrefs.includes(option)}
                    onCheckedChange={() => toggleDietary(option)}
                  />
                  <label
                    htmlFor={`dietary-${option}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Allergens to Avoid</Label>
            <div className="grid grid-cols-2 gap-2">
              {ALLERGEN_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergen-${option}`}
                    checked={allergens.includes(option)}
                    onCheckedChange={() => toggleAllergen(option)}
                  />
                  <label
                    htmlFor={`allergen-${option}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Cuisine Preferences</Label>
            <div className="grid grid-cols-2 gap-2">
              {CUISINE_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${option}`}
                    checked={cuisines.includes(option)}
                    onCheckedChange={() => toggleCuisine(option)}
                  />
                  <label
                    htmlFor={`cuisine-${option}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            {existingProfile ? 'Update Profile' : 'Save Profile'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
