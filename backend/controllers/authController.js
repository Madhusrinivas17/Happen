const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const accounts = [
      {
        id: 'admin-account',
        name: 'Happen Administrator',
        email: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
        password: process.env.ADMIN_PASSWORD,
        role: 'Admin',
      },
      {
        id: 'coordinator-account',
        name: 'Happen Coordinator',
        email: process.env.COORDINATOR_EMAIL?.trim().toLowerCase(),
        password: process.env.COORDINATOR_PASSWORD,
        role: 'Coordinator',
      },
    ];
    const account = accounts.find((candidate) => (
      candidate.email === normalizedEmail && candidate.password === password
    ));

    if (account) {
      res.json({
        _id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        token: generateToken(account.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };
