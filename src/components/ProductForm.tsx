
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types";
import { categories, productTags } from "@/data/mockData";

const formSchema = z.object({
  name: z.string().min(2, "Ad ən az 2 simvol olmalıdır"),
  price: z.coerce.number().positive("Qiymət müsbət olmalıdır"),
  currency: z.string(),
  category: z.string().min(1, "Kateqoriya seçilməlidir"),
  description: z.string().min(10, "Təsvir ən az 10 simvol olmalıdır"),
  image: z.string(),
  inStock: z.boolean(),
  tags: z.array(z.string()),
});

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  buttonText: string;
}

const ProductForm = ({
  initialData,
  onSubmit,
  buttonText,
}: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      currency: "AZN",
      category: "",
      description: "",
      image: "/placeholder.svg",
      inStock: true,
      tags: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const productData: Product = {
        id: initialData?.id || `product-${Date.now()}`,
        ...values,
      };
      
      onSubmit(productData);
      
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Məhsul adı</FormLabel>
                <FormControl>
                  <Input placeholder="Məhsul adı" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Qiymət</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel>Valyuta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="AZN" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AZN">AZN</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kateqoriya</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kateqoriya seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Təsvir</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Məhsul haqqında məlumat..."
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şəkil URL</FormLabel>
              <FormControl>
                <Input placeholder="/placeholder.svg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="inStock"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Stokda varmı?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etiketlər</FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {productTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center space-x-2 rounded-md border p-2"
                  >
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={field.value.includes(tag.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, tag.id]);
                        } else {
                          field.onChange(
                            field.value.filter((value) => value !== tag.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={`tag-${tag.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full bg-farm-green hover:bg-farm-green/80"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Yüklənir..." : buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
