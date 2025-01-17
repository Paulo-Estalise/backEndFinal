const validUser = (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      req.logger.warn("Verifique se todos os dados foram preenchidos corretamente. Certifique-se de que o usuário já possui uma conta ou crie uma nova.")
      return res.status(400).json({ message: "Dados incompletos. Por favor, preencha todos os campos." })
    }
    next()
  }
  
  export default validUser
  