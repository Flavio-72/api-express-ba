const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (req.method === 'POST' && !name) {
    return res.status(400).json({ message: 'El campo "name" es obligatorio.' });
  }

  if (price !== undefined && typeof price !== 'number') {
    return res.status(400).json({ message: 'El campo "price" debe ser numérico.' });
  }

  if (stock !== undefined && typeof stock !== 'number') {
    return res.status(400).json({ message: 'El campo "stock" debe ser numérico.' });
  }

  next();
};

export default validateProduct;
