import bcrypt from 'bcryptjs';

const users = [
  {
    _id: 'mem-admin-1',
    name: 'Admin',
    email: 'admin@ecommerce.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
];

export const userMemoryStore = {
  findByEmail(email) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  findById(id) {
    const user = users.find((u) => u._id === id);
    if (!user) return null;
    const { password, ...safe } = user;
    return safe;
  },

  async create({ name, email, password, role = 'user' }) {
    const hashed = await bcrypt.hash(password, 10);
    const user = {
      _id: `mem-user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashed,
      role,
    };
    users.push(user);
    const { password: _, ...safe } = user;
    return safe;
  },

  async comparePassword(user, password) {
    return bcrypt.compare(password, user.password);
  },
};
