const BASE_URL = `https://api.project360.me`;

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
const getRooms = async (
  accessToken,
  userId,
  filter = `my-rooms`,
  page = 0,
  limit = 15
) => {
  let url = `api/users/${userId}/rooms?filter=${filter}`;
  url += limit ? `&limit=${limit}` : ``;
  url += page ? `&page=${page}` : ``;

  return fetchTemplate(accessToken, url);
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

const inviteUser = async (
  accessToken,
  userId,
  roomId,
  username,
  sender,
  recipient,
  url
) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, sender, recipient, url }),
  };
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}/invite`,
    params
  );
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
const getItems = async (accessToken, userId, roomId) => {
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}/items`
  );
};

const createItem = async (accessToken, userId, roomId, type, position) => {
  const params = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: type, coordinates: position }),
  };
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}/items`,
    params
  );
};

const updateItemPos = async (accessToken, userId, roomId, itemId, position) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coordinates: position }),
  };
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}/items/${itemId}/move`,
    params
  );
};

const updateItemAng = async (accessToken, userId, roomId, itemId, degree) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ degree }),
  };
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}/items/${itemId}/rotate`,
    params
  );
};

const deleteItem = async (accessToken, userId, roomId, itemId) => {
  const params = {
    method: `DELETE`,
  };
  return fetchTemplate(
    accessToken,
    `api/users/${userId}/rooms/${roomId}/items/${itemId}`,
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

const updateEmail = async (accessToken, email, sub) => {
  const params = {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, sub }),
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
  inviteUser,
  deleteRoom,
  getItems,
  createItem,
  updateItemPos,
  updateItemAng,
  deleteItem,
  storeEmail,
  updateEmail,
  signOut,
  getMe,
};

export default apiService;
