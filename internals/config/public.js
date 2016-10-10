const { PORT = 3000 } = process.env

export const port = parseInt(PORT, 10)
export const apiPrefix = '/api'
