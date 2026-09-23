const jwt = require('jsonwebtoken');

const ACCOUNT_IDS = {
  admin: '000000000000000000000001',
  coordinator: '000000000000000000000002',
};

const generateToken = (account) => {
  return jwt.sign({
    id: account.id,
    role: account.role,
    name: account.name,
    email: account.email,
  }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const accounts = [
      {
        id: ACCOUNT_IDS.admin,
        name: 'Happen Administrator',
        email: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
        password: process.env.ADMIN_PASSWORD,
        role: 'Admin',
      },
      {
        id: ACCOUNT_IDS.coordinator,
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
        token: generateToken(account),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };
