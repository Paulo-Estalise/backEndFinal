const validProduct = (req, res, next) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
  
    if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
      req.logger.warn("Verifique se todos os campos foram preenchidos corretamente.")
      return res.status(400).json({ message: "Dados inválidos" })
    }
  
    // Verifica se o código é válido (por exemplo, se for um número ou estiver dentro de um intervalo aceitável)
    if (typeof code !== 'number' || code <= 0) {
      req.logger.warn("O código do produto deve ser um número positivo válido.")
      return res.status(400).json({ message: "Código do produto inválido" })
    }
  
    // Verifica se o preço é válido (deve ser um número positivo)
    if (typeof price !== 'number' || price <= 0) {
      req.logger.warn("O preço do produto deve ser um valor numérico maior que zero.")
      return res.status(400).json({ message: "Preço inválido" })
    }
  
    next();
  }
  
  export default validProduct;
  