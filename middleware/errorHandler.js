export default function errorHandler(err, req, res, next) {
    consolerr.log(err, err.name)

    if (err.name === 'CastError') {
      return res.status(400).json({
        message: "Hey, the ID you provided was not valid. Please provide a valid ID!"
      })
    
    } else if (err.code === 11000) {
      const identifier = Object.keys(err.keyValue)[0]
      return res.status(409).json({ errors: { [identifier]: `That ${identifier} already exists. Please try another onerr.` } })
    
    } else if (err.name === 'ValidationError') {
      const customError = {}
      for (const key in err.errors) {
        customError[key] = err.errors[key].message
      }
      res.status(422).send({ errors: customError, message: "There are issues with the data you posted." })
  
    } else {
      res.status(500).send({ message: "Something went wrong. Please check your request and try again!" })
    }
  }