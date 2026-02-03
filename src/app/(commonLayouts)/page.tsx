import RecipesByCategory from "@/components/modules/homepage/categoriesSection";
import FeaturesSection from "@/components/modules/homepage/FeaturesSection";
import FoodHubJourney from "@/components/modules/homepage/FoodHubJourney";
import { Hero7 } from "@/components/modules/homepage/hero7";
import PopularMeals from "@/components/modules/homepage/PopularMeals";
import WhyFoodHub from "@/components/modules/homepage/WhyFoodHub";

export default function Home() {
  return (
    <div>
      <Hero7></Hero7>
      <RecipesByCategory></RecipesByCategory>

      <FeaturesSection></FeaturesSection>
      <WhyFoodHub></WhyFoodHub>
      <FoodHubJourney></FoodHubJourney>
    </div>
  );
}
