import { ADD_CART, DELETE_CART, UPDATE_CART } from '../../shared/constants/action-type';

const initState = {
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_CART: {
      return addItem(state, action.payload);
    }

    case UPDATE_CART: {
      return updateCart(state, action.payload);
    }

    case DELETE_CART: {
      return deleteCart(state, action.payload);
    }
    default: {
      return state;
    }
  }
};

const addItem = (state, payload) => {
  const items = state.items;
  let isProductExists = false;
  items.map((item) => {
    if (item._id === payload._id) {
      item.qty += payload.qty;
      isProductExists = true;
    }
    return item;
  });

  const newItems = isProductExists ? items : [...items, payload];
  //   localStorage.setItem('cart_items', JSON.stringify(newItems));
  return { ...state, items: newItems };
};

const updateCart = (state, payload) => {
  const items = state.items;
  const newItems = items.map((item) => {
    if (item._id === payload._id) {
      item.qty = payload.qty;
    }
    return item;
  });
  return { ...state, items: newItems };
};

const deleteCart = (state, payload) => {
  const newItems = state.items.filter((item) => {
    return item._id != payload._id;
  });
  return { ...state, items: newItems };
};
