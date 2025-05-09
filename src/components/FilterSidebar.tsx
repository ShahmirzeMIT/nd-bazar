
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories, productTags } from "@/data/mockData";
import { Label } from "@/components/ui/label";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

const FilterSidebar = () => {
  const { 
    categoryFilter, 
    setCategoryFilter,
    selectedTags,
    toggleTag
  } = useProducts();
  
  const { onlyInStock, toggleOnlyInStock } = useCart();

  return (
    <Card className="sticky top-20">
      <CardContent className="p-4">
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Kateqoriya</h3>
          <RadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all" className="cursor-pointer">Hamısı</Label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id} className="cursor-pointer">{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Etiketlər</h3>
          <div className="flex flex-wrap gap-2">
            {productTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag.id) 
                    ? "bg-farm-green hover:bg-farm-green/80" 
                    : "hover:bg-farm-green/10"
                }`}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Mövcudluq</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-stock" 
              checked={onlyInStock}
              onCheckedChange={toggleOnlyInStock}
            />
            <Label htmlFor="in-stock" className="cursor-pointer">Yalnız mövcud məhsullar</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
