const supabase = require('../config/supabase');

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) throw error;
    res.status(201).json(data.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    res.status(200).json({
      ...data.user,
      token: data.session.access_token
    });
  } catch (error) {
    res.status(401).json({ message: error.message || 'Invalid email or password' });
  }
};

// @desc    Get current user
exports.getMe = async (req, res) => {
  res.status(200).json(req.user);
};
