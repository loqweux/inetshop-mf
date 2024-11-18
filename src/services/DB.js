export default class DB {
  static async getAllProducts(type) {
    try {
      const resp = await fetch(`http://localhost:3001/${type}`);
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllBasketItems() {
    try {
      const resp = await fetch("http://localhost:3001/cart");
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async setProductItemBasket(item) {
    try {
      const resp = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async editProductItemBasket(data, id) {
    try {
      const resp = await fetch(`http://localhost:3001/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }
  static async removeProductItemFromBasket(id) {
    try {
      await fetch(`http://localhost:3001/cart/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  }
}
