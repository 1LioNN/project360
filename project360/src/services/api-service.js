const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

const fetchTemplate = async (accessToken, url, params = {}) => {
  params.credentials = `include`;
  params.headers = {
    ...params.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return fetch(`${BASE_URL}/${url}`, params).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => {
        throw new Error(`api fetch failed: ${res.status}`);
      });
    }
    return res.json();
  });
};
// ROOMS
const getRooms = async (accessToken, userId) => {
  return fetchTemplate(accessToken, `api/users/${userId}/rooms`);
};

const getRoom = async (accessToken, userId, roomId) => {
  return fetchTemplate(accessToken, `api/users/${userId}/rooms/${roomId}`);
};

const createRoom = async (accessToken, userId, name, dimensions) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, dimensions }),
  };
  return fetchTemplate(accessToken, `api/users/${userId}/rooms`, params);
};

const deleteRoom = async (accessToken, userId, roomId) => {
  const params = {
    method: `DELETE`,
  };
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}`,
    params
  );
};

// ITEMS
const getItems = async (accessToken, roomId) => {
  return fetchTemplate(accessToken, `api/items?roomId=${roomId}`);
};

const createItem = async (accessToken, roomId, type, position) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: type, coordinates: position }),
  };
  return fetchTemplate(accessToken, `api/items?roomId=${roomId}`, params);
};

const updateItemPos = async (accessToken, itemId, position) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coordinates: position }),
  };
  return fetchTemplate(accessToken, `api/items/${itemId}/move`, params);
};

const updateItemAng = async (accessToken, itemId, degree) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ degree }),
  };
  return fetchTemplate(accessToken, `api/items/${itemId}/rotate`, params);
};

const deleteItem = async (accessToken, roomId, itemId) => {
  const params = {
    method: `DELETE`,
  };
  return fetchTemplate(
    accessToken,
    `api/items/${itemId}?roomId=${roomId}`,
    params
  );
};

// USERS
const storeEmail = async (accessToken, email) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };
  return fetchTemplate(accessToken, `api/users/emails`, params);
};

const signOut = async (accessToken) => {
  return fetchTemplate(accessToken, `api/users/signout`);
};

const getMe = async (accessToken) => {
  return fetchTemplate(accessToken, `api/users/me`);
};

const apiService = {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  getItems,
  createItem,
  updateItemPos,
  updateItemAng,
  deleteItem,
  storeEmail,
  signOut,
  getMe,
};

export default apiService;
