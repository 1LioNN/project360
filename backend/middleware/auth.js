export const isAuthenticated = (req, res, next) => {
  if (!req.session.userId && !req.username)
    return res.status(401).json({ error: "Not Authenticated" });
  next();
};
