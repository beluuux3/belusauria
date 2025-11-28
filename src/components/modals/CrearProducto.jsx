import React, { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { productService } from "../../services/productService";

export default function CrearProducto({ onClose, onProductCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      let imageUrl = null;

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

      await productService().create(dataToSend);
      onProductCreated();
    } catch (err) {
      setError("Error al crear el producto. Revisa los datos o la conexión.");
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Crear Nuevo Producto">
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
          required
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

        <Input
          label="Imagen"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" onClick={onClose} variant="cancel">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? "Creando..." : "Crear"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
