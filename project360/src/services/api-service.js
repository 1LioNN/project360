const BASE_URL = `http://localhost:3000`;

const fetchTemplate = async (url, params = {}) => {
  return fetch(`${BASE_URL}/${url}`, params).then((res) => {
    if (!res.ok) {
      throw new Error(`api fetch failed: ${res.status}`);
    }
    return res.json();
  });
};

// ROOMS
const getRooms = async (userId) => {
  return fetchTemplate(`api/users/${userId}/rooms`);
};

const createRoom = async (userId, name, dimensions) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, dimensions }),
  };
  return fetchTemplate(`api/users/${userId}/rooms`, params);
};

// ITEMS
const getItems = async (roomId) => {
  return fetchTemplate(`api/items?roomId=${roomId}`);
};

const createItem = async (roomId, type, position) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: type, coordinates: position }),
  };
  return fetchTemplate(`api/items?roomId=${roomId}`, params);
};

const updateItemPos = async (itemId, position) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coordinates: position })
  };
  return fetchTemplate(
    `api/items/${itemId}/move`,
    params
  );
};

const deleteItem = async (roomId, itemId) => {
  const params = {
    method: `DELETE`,
  };
  return fetchTemplate(`api/items/${itemId}?roomId=${roomId}`, params);
};

// USERS
const signIn = async (sub, isAuthen) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sub, isAuthen }),
  };
  return fetchTemplate(`api/users/signin`, params);
};

const signOut = async () => {
  return fetchTemplate(`api/users/signout`);
};

const getMe = async () => {
  return fetchTemplate(`api/users/me`);
};

const apiService = {
  getRooms,
  createRoom,
  getItems,
  createItem,
  updateItemPos,
  deleteItem,
  signIn,
  signOut,
  getMe,
};

export default apiService;
