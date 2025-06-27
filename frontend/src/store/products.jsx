import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products: products }),
  createProducts: async (products) => {
    if (!products.name || !products.image || !products.price) {
      return {
        success: false,
        message: 'Please provide all required field.',
      };
    }
    const product = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });
    if (!product.ok) {
      return {
        success: false,
        message: 'Failed to create product.',
      };
    } else {
      const data = await product.json();
      set((state) => ({ products: [...state.products, data.data] }));
      // Reset the form or handle success state as needed
      return {
        success: true,
        message: 'Product created successfully.',
      };
    }
  },
  fetchProducts: async () => {
    set({ loading: true });
    const response = await fetch('/api/products');
    if (!response.ok) {
      return {
        success: false,
        message: 'Failed to fetch products.',
      };
    }
    const data = await response.json();
    // console.log(data.products);
    set({ products: data.products, loading: false });

    return {
      success: true,
      message: 'Products fetched successfully.',
    };
  },

  updateProduct: async (id, product) => {
    // check if all required fields are provided
    if (!product.name || !product.image || !product.price) {
      return {
        success: false,
        message: 'please provide all required fields.',
      };
    }
    set({ loading: true });
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      return {
        success: false,
        message: 'Failed to update product.',
      };
    } else {
      const data = await res.json();
      set((state) => ({
        ...state,
        products: state.products.map((p) => (p._id === id ? data.product : p)),
      }));
      set({ loading: false });
      // Reset the form or handle success state as needed
      return {
        success: true,
        message: 'Product updated successfully.',
      };
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Failed to delete product.',
      };
    } else {
      set((state) => ({
        ...state,
        products: state.products.filter((p) => p._id !== id),
      }));
      set({ loading: false });
      return {
        success: true,
        message: 'Product deleted successfully.',
      };
    }
  },
}));
