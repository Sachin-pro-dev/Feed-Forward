
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from './AuthContext';
import { toast } from "sonner";

export type ProductPriority = 'high' | 'medium' | 'low';
export type ProductType = 'perishable' | 'non-perishable';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  seller_id: string;
  seller_name: string;
  company?: string;
  priority: ProductPriority;
  type: ProductType;
  quantity: number;
  created_at: string;
  expiry_date?: string;
}

interface MarketplaceContextType {
  products: Product[];
  userProducts: Product[];
  loading: boolean;
  filters: {
    priority: ProductPriority | null;
    type: ProductType | null;
    company: string | null;
    search: string;
  };
  setFilters: (filters: {
    priority?: ProductPriority | null;
    type?: ProductType | null;
    company?: string | null;
    search?: string;
  }) => void;
  addProduct: (product: Omit<Product, 'id' | 'seller_id' | 'seller_name' | 'created_at'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchUserProducts: () => Promise<void>;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    priority: null as ProductPriority | null,
    type: null as ProductType | null,
    company: null as string | null,
    search: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('marketplace_products')
        .select('*');

      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.company) {
        query = query.eq('company', filters.company);
      }
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data as Product[]);
    } catch (error) {
      console.error('Error in fetchProducts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProducts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('marketplace_products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user products:', error);
        return;
      }

      setUserProducts(data as Product[]);
    } catch (error) {
      console.error('Error in fetchUserProducts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'seller_id' | 'seller_name' | 'created_at'>) => {
    if (!user) {
      toast.error("You must be logged in to add products");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('marketplace_products')
        .insert({
          ...product,
          seller_id: user.id,
          seller_name: user.name || 'Unknown Seller',
        })
        .select();

      if (error) {
        toast.error(`Error adding product: ${error.message}`);
        return;
      }

      toast.success("Product added successfully!");
      await fetchProducts();
      await fetchUserProducts();
    } catch (error: any) {
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (!user) {
      toast.error("You must be logged in to update products");
      return;
    }

    try {
      const { error } = await supabase
        .from('marketplace_products')
        .update(updates)
        .eq('id', id)
        .eq('seller_id', user.id);

      if (error) {
        toast.error(`Error updating product: ${error.message}`);
        return;
      }

      toast.success("Product updated successfully!");
      await fetchProducts();
      await fetchUserProducts();
    } catch (error: any) {
      toast.error(`Error updating product: ${error.message}`);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!user) {
      toast.error("You must be logged in to delete products");
      return;
    }

    try {
      const { error } = await supabase
        .from('marketplace_products')
        .delete()
        .eq('id', id)
        .eq('seller_id', user.id);

      if (error) {
        toast.error(`Error deleting product: ${error.message}`);
        return;
      }

      toast.success("Product deleted successfully!");
      await fetchProducts();
      await fetchUserProducts();
    } catch (error: any) {
      toast.error(`Error deleting product: ${error.message}`);
    }
  };

  const updateFilters = (newFilters: {
    priority?: ProductPriority | null;
    type?: ProductType | null;
    company?: string | null;
    search?: string;
  }) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    if (user) {
      fetchUserProducts();
    } else {
      setUserProducts([]);
    }
  }, [user]);

  return (
    <MarketplaceContext.Provider 
      value={{
        products,
        userProducts,
        loading,
        filters,
        setFilters: updateFilters,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
        fetchUserProducts
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};
