import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import type { MealPlan, UserProfile, ShoppingList } from '@/types/domain';
import { generateMockMealPlan, generateShoppingList } from '@/lib/mock-data';
import { OnboardingDialog } from '@/components/onboarding-dialog';
import { MealPlanView } from '@/components/meal-plan-view';
import { ShoppingListSheet } from '@/components/shopping-list-sheet';
import { BudgetGauge } from '@/components/budget-gauge';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Plus, List, Gear } from '@phosphor-icons/react';
import { toast } from 'sonner';

function App() {
  const [userProfile, setUserProfile] = useKV<UserProfile | null>('user_profile', null);
  const [mealPlan, setMealPlan] = useKV<MealPlan | null>('current_meal_plan', null);
  const [shoppingListState, setShoppingListState] = useKV<ShoppingList | null>('shopping_list_state', null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shoppingListOpen, setShoppingListOpen] = useState(false);

  const hasProfile = userProfile !== null;
  const hasMealPlan = mealPlan !== null;

  const currentShoppingList = shoppingListState || (mealPlan ? generateShoppingList(mealPlan) : null);

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(() => profile);
    setIsOnboarding(false);
    toast.success('Profile saved successfully');
  };

  const handleGeneratePlan = async () => {
    if (!userProfile) {
      toast.error('Please complete your profile first');
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newPlan = generateMockMealPlan();
    setMealPlan(() => newPlan);
    setShoppingListState(() => null);
    setIsGenerating(false);
    
    toast.success('Meal plan generated successfully!');
  };

  const handleToggleOwned = (ingredientId: string) => {
    if (!currentShoppingList) return;
    
    setShoppingListState((current) => {
      const base = current || currentShoppingList;
      return {
        ...base,
        items: base.items.map(item =>
          item.ingredient_id === ingredientId
            ? { ...item, owned: !item.owned }
            : item
        )
      };
    });
  };

  const handleDeleteItem = (ingredientId: string) => {
    if (!currentShoppingList) return;
    
    setShoppingListState((current) => {
      const base = current || currentShoppingList;
      return {
        ...base,
        items: base.items.map(item =>
          item.ingredient_id === ingredientId
            ? { ...item, deleted: true }
            : item
        )
      };
    });
  };

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-5xl font-bold text-primary tracking-tight">
              Gurmaio
            </h1>
            <p className="text-xl text-muted-foreground">
              Budget-aware meal planning with precision nutrition tracking
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-semibold">Welcome</h2>
              <p className="text-muted-foreground">
                Let's create your personalized meal plan based on your budget, dietary preferences, and nutrition goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="space-y-2">
                <div className="text-3xl">💰</div>
                <h3 className="font-heading font-medium">Budget-First</h3>
                <p className="text-sm text-muted-foreground">
                  Every meal plan respects your budget with transparent cost breakdowns
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🎯</div>
                <h3 className="font-heading font-medium">Precise Nutrition</h3>
                <p className="text-sm text-muted-foreground">
                  Deterministic calculations for calories, protein, carbs, and fats
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🛒</div>
                <h3 className="font-heading font-medium">Smart Shopping</h3>
                <p className="text-sm text-muted-foreground">
                  Aggregated shopping lists with realistic grocery costs
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsOnboarding(true)}
              size="lg"
              className="w-full"
            >
              <Plus className="mr-2" />
              Get Started
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Production-ready architecture • Cloud-native • Edge-first
          </p>
        </div>

        <OnboardingDialog
          open={isOnboarding}
          onOpenChange={setIsOnboarding}
          onSave={handleSaveProfile}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="font-heading text-2xl font-bold text-primary">Gurmaio</h1>
              {mealPlan && (
                <BudgetGauge
                  budget={mealPlan.metadata.period_budget_eur}
                  spent={mealPlan.metadata.period_cost_eur}
                  isOverBudget={mealPlan.metadata.is_over_budget}
                  compact
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasMealPlan && (
                <Button
                  variant="outline"
                  onClick={() => setShoppingListOpen(true)}
                >
                  <List className="mr-2" />
                  Shopping List
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setIsOnboarding(true)}
              >
                <Gear />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {!hasMealPlan ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="font-heading text-3xl font-semibold">
                  Ready to generate your meal plan?
                </h2>
                <p className="text-muted-foreground">
                  We'll create a {userProfile!.meal_plan_days}-day meal plan for €{userProfile!.budget_eur}
                  {userProfile!.budget_period === 'daily' ? '/day' : '/week'} based on your preferences.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {userProfile!.dietary_preferences.map((pref) => (
                  <span
                    key={pref}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {pref}
                  </span>
                ))}
              </div>

              <Button
                onClick={handleGeneratePlan}
                size="lg"
                disabled={isGenerating}
                className="w-full max-w-sm"
              >
                {isGenerating ? 'Generating...' : 'Generate Meal Plan'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl font-bold">Your Meal Plan</h2>
                <p className="text-muted-foreground">
                  {mealPlan!.metadata.days}-day plan • Generated {new Date(mealPlan!.generated_at).toLocaleDateString()}
                </p>
              </div>
              <Button onClick={handleGeneratePlan} disabled={isGenerating}>
                <Plus className="mr-2" />
                {isGenerating ? 'Regenerating...' : 'Regenerate'}
              </Button>
            </div>

            <MealPlanView mealPlan={mealPlan!} />
          </div>
        )}
      </main>

      <OnboardingDialog
        open={isOnboarding && hasProfile}
        onOpenChange={setIsOnboarding}
        onSave={handleSaveProfile}
        existingProfile={userProfile}
      />

      {mealPlan && currentShoppingList && (
        <ShoppingListSheet
          open={shoppingListOpen}
          onOpenChange={setShoppingListOpen}
          shoppingList={currentShoppingList}
          onToggleOwned={handleToggleOwned}
          onDeleteItem={handleDeleteItem}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;