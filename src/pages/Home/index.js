import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

import * as CartActions from "../../store/modules/cart/actions";

import { ProductList } from "./styles";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.get("products");

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }));

    setProducts(data);
  }

  const handleAddProduct = product => {
    addToCart(product);
  };

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
