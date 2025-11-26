export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;  // assume req.user hasil dari auth middleware sebelumnya

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient role" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
