import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThumbsUp, ThumbsDown, MagnifyingGlass, X, Trash, SortAscending } from '@phosphor-icons/react';
import type { MealPreference } from '@/types/domain';
import { motion, AnimatePresence } from 'framer-motion';

interface MealPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferences: MealPreference[];
  onRemovePreference: (mealId: string) => void;
  onClearAll: (type: 'like' | 'dislike' | 'all') => void;
}

export function MealPreferencesDialog({
  open,
  onOpenChange,
  preferences,
  onRemovePreference,
  onClearAll,
}: MealPreferencesDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date');
  const [activeTab, setActiveTab] = useState<'liked' | 'disliked'>('liked');

  const likedMeals = preferences.filter(p => p.preference === 'like');
  const dislikedMeals = preferences.filter(p => p.preference === 'dislike');

  const filterAndSortMeals = (meals: MealPreference[]) => {
    let filtered = meals;

    if (searchQuery) {
      filtered = meals.filter(meal =>
        meal.recipe_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.rated_at).getTime() - new Date(a.rated_at).getTime();
        case 'name':
          return a.recipe_name.localeCompare(b.recipe_name);
        case 'type':
          return a.meal_type.localeCompare(b.meal_type);
        default:
          return 0;
      }
    });

    return sorted;
  };

  const displayedLiked = filterAndSortMeals(likedMeals);
  const displayedDisliked = filterAndSortMeals(dislikedMeals);

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'lunch':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'dinner':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'snack':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMealTypeEmoji = (type: string) => {
    switch (type) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  const handleClearAll = () => {
    const type = activeTab === 'liked' ? 'like' : 'dislike';
    if (confirm(`Are you sure you want to clear all ${type}d meals? This cannot be undone.`)) {
      onClearAll(type);
    }
  };

  const renderMealCard = (meal: MealPreference, isLiked: boolean) => (
    <motion.div
      key={meal.meal_id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-base">{meal.recipe_name}</h4>
              {isLiked ? (
                <ThumbsUp weight="fill" className="text-green-600" size={18} />
              ) : (
                <ThumbsDown weight="fill" className="text-red-600" size={18} />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getMealTypeColor(meal.meal_type)}>
                <span className="mr-1">{getMealTypeEmoji(meal.meal_type)}</span>
                {meal.meal_type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(meal.rated_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {meal.ingredients.slice(0, 5).map((ingredient, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                >
                  {ingredient}
                </span>
              ))}
              {meal.ingredients.length > 5 && (
                <span className="text-xs text-muted-foreground px-2">
                  +{meal.ingredients.length - 5} more
                </span>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemovePreference(meal.meal_id)}
            className="shrink-0"
          >
            <X size={18} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Meal Preferences</DialogTitle>
          <DialogDescription>
            View and manage your liked and disliked meals. These preferences help us generate better meal plans for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search meals or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SortAscending size={18} className="mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Most Recent</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="type">Meal Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="liked" className="gap-2">
                  <ThumbsUp weight="fill" size={16} />
                  Liked ({likedMeals.length})
                </TabsTrigger>
                <TabsTrigger value="disliked" className="gap-2">
                  <ThumbsDown weight="fill" size={16} />
                  Disliked ({dislikedMeals.length})
                </TabsTrigger>
              </TabsList>

              {((activeTab === 'liked' && likedMeals.length > 0) ||
                (activeTab === 'disliked' && dislikedMeals.length > 0)) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash size={16} className="mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            <TabsContent value="liked" className="flex-1 mt-4 overflow-hidden">
              {displayedLiked.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ThumbsUp size={64} className="text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    {searchQuery ? 'No liked meals found' : 'No liked meals yet'}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {searchQuery
                      ? 'Try adjusting your search query'
                      : 'Start liking meals in your meal plans to help us recommend better recipes'}
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="space-y-3 pr-4">
                    <AnimatePresence mode="popLayout">
                      {displayedLiked.map((meal) => renderMealCard(meal, true))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="disliked" className="flex-1 mt-4 overflow-hidden">
              {displayedDisliked.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ThumbsDown size={64} className="text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    {searchQuery ? 'No disliked meals found' : 'No disliked meals yet'}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {searchQuery
                      ? 'Try adjusting your search query'
                      : 'Disliked meals will be avoided in future meal plan generations'}
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="space-y-3 pr-4">
                    <AnimatePresence mode="popLayout">
                      {displayedDisliked.map((meal) => renderMealCard(meal, false))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {preferences.length === 0
              ? 'No preferences saved'
              : `${likedMeals.length} liked • ${dislikedMeals.length} disliked`}
          </p>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
