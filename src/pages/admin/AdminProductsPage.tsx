
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProductsPage = () => {
  const { products, deleteProduct, searchQuery, setSearchQuery } = useProducts();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const getCategoryName = (categoryId: string) => {
    switch (categoryId) {
      case "dairy":
        return "Süd məhsulları";
      case "eggs":
        return "Yumurta";
      case "vegetables":
        return "Tərəvəzlər";
      case "fruits":
        return "Meyvələr";
      case "nuts":
        return "Qoz-fındıq";
      case "honey":
        return "Bal";
      default:
        return categoryId;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Məhsullar</h1>
        <Button asChild className="bg-farm-green hover:bg-farm-green/80">
          <Link to="/admin/products/add">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Məhsul
          </Link>
        </Button>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Məhsul axtar..."
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Şəkil</TableHead>
              <TableHead>Ad</TableHead>
              <TableHead>Kateqoriya</TableHead>
              <TableHead>Qiymət</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>{product.price} {product.currency}</TableCell>
                <TableCell>
                  {product.inStock ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Mövcuddur
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      Bitib
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-8 w-8"
                    >
                      <Link to={`/admin/products/edit/${product.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Redaktə et</span>
                      </Link>
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-200"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Sil</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Məhsulu silməyə əminsiniz?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu əməliyyat geri qaytarıla bilməz. Məhsul birdəfəlik silinəcək.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Ləğv et</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {products.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Məhsul tapılmadı
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
