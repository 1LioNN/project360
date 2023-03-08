const BASE_URL = `http://localhost:3000`;

const templateFetch = async (url, params = {}) => {
  return fetch(`${BASE_URL}/${url}`, params).then((res) => {
    if (!res.ok) {
      throw new Error(`api fetch failed: ${res.status}`);
    }
    return res.json();
  });
};

// ROOMS
const getRooms = async (userId) => {
  return templateFetch(`api/users/${userId}/rooms`);
};

const createRoom = async (userId, name, dimensions) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, dimensions }),
  };
  return templateFetch(`api/users/${userId}/rooms`, params);
};

// ITEMS
const getItems = async (roomId) => {
  return templateFetch(`api/items?roomId=${roomId}`);
};

const createItem = async (roomId, type, position) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: type, coordinates: position }),
  };
  return templateFetch(`api/items?roomId=${roomId}`);
};

const updateItemPos = async (itemId, position) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return templateFetch(
    `api/items/${itemId}/move/${position[0]}/${position[1]}/${position[2]}`,
    params
  );
};

const deleteItem = async (roomId, itemId) => {
  const params = {
    method: `DELETE`,
  };
  return templateFetch(`api/items/${itemId}?roomId=${roomId}`, params);
};

// USERS
const getMe = async () => {
  return templateFetch(`api/users/me`);
}

export default {
  getRooms,
  createRoom,
  getItems,
  createItem,
  updateItemPos,
  deleteItem,
  getMe
};
