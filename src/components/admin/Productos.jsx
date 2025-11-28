import React, { useState, useEffect, useCallback } from "react";
import { productService } from "../../services/userService";
import CrearProducto from "../modals/CrearProducto";
import EditarProducto from "../modals/EditarProducto";
import PageHeader from "../common/PageHeader";
import SearchBar from "../common/SearchBar";
import Table from "../common/Table";
import Pagination from "../common/Pagination";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getBeluProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Fallo al obtener productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateClick = () => setIsModalOpen(true);
  const handleProductCreated = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedProductId(null);
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <p className="p-5">Cargando productos...</p>;
  if (error) return <p className="p-5 text-red-600">Error: {error}</p>;

  const tableHeaders = ["ID", "Nombre", "Categoría", "Precio", "Stock", "Acciones"];

  return (
    <>
      <PageHeader
        title="PRODUCTOS"
        buttonText="+ Crear Producto"
        onButtonClick={handleCreateClick}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar por nombre de producto..."
      />

      {filteredProducts.length === 0 ? (
        <p className="p-5 mx-10">
          {searchTerm
            ? "No se encontraron productos con ese nombre."
            : "No se encontraron productos con categoría 'Belu...'"}
        </p>
      ) : (
        <>
          <Table headers={tableHeaders}>
            {currentProducts.map((product) => (
              <tr key={product.id} className="bg-neutral-primary border-b border-default">
                <td className="px-6 py-4">{product.id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">Bs. {product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditClick(product.id)}
                    className="text-pink-600 hover:text-pink-800 font-semibold"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {isModalOpen && (
        <CrearProducto onClose={() => setIsModalOpen(false)} onProductCreated={handleProductCreated} />
      )}

      {isEditModalOpen && selectedProductId && (
        <EditarProducto
          productId={selectedProductId}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProductId(null);
          }}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </>
  );
}

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getBeluProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Fallo al obtener productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateClick = () => setIsModalOpen(true);
  const handleProductCreated = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedProductId(null);
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <p className="p-5">Cargando productos...</p>;
  if (error) return <p className="p-5 text-red-600">Error: {error}</p>;

  const tableHeaders = ["ID", "Nombre", "Categoría", "Precio", "Stock", "Acciones"];

  return (
    <>
      <PageHeader
        title="PRODUCTOS"
        buttonText="+ Crear Producto"
        onButtonClick={handleCreateClick}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar por nombre de producto..."
      />

      {filteredProducts.length === 0 ? (
        <p className="p-5 mx-10">
          {searchTerm
            ? "No se encontraron productos con ese nombre."
            : "No se encontraron productos con categoría 'Belu...'"}
        </p>
      ) : (
        <>
          <Table headers={tableHeaders}>
            {currentProducts.map((product) => (
              <tr key={product.id} className="bg-neutral-primary border-b border-default">
                <td className="px-6 py-4">{product.id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">Bs. {product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditClick(product.id)}
                    className="text-pink-600 hover:text-pink-800 font-semibold"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {isModalOpen && (
        <CrearProducto onClose={() => setIsModalOpen(false)} onProductCreated={handleProductCreated} />
      )}

      {isEditModalOpen && selectedProductId && (
        <EditarProducto
          productId={selectedProductId}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProductId(null);
          }}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </>
  );
}
