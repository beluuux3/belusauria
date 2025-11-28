import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { productService } from "../../services/productService";

export default function EditarProducto({
  productId,
  onClose,
  onProductUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: null,
    currentImageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await productService().getById(productId);
        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "",
          price: product.price || "",
          stock: product.stock || "",
          image: null,
          currentImageUrl: product.image_url || "",
        });
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del producto.");
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let imageUrl = formData.currentImageUrl;

      if (formData.image) {
        const uploadResponse = await productService().uploadImage(
          formData.image
        );
        imageUrl = uploadResponse.url;
      }

      const dataToSend = {
        name: formData.name,
        description: formData.description || null,
        category: formData.category || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: imageUrl,
      };

      await productService().update(productId, dataToSend);
      onProductUpdated();
    } catch (err) {
      setError(
        "Error al actualizar el producto. Revisa los datos o la conexión."
      );
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Modal isOpen={true} onClose={onClose} title="Editar Producto">
        <p className="text-center">Cargando producto...</p>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Editar Producto">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <Input
          label="Categoría"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <Input
          label="Precio"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <Input
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Imagen{" "}
            {formData.currentImageUrl && "(opcional: solo si deseas cambiarla)"}
          </label>
          {formData.currentImageUrl && (
            <div className="mb-2">
              <img
                src={formData.currentImageUrl}
                alt="Imagen actual"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3f89]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} variant="cancel">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? "Actualizando..." : "Actualizar Producto"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
