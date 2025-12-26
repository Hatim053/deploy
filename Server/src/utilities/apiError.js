class apiError extends Error {
    constructor(statusCode , error , message , success = 'false') {
        super(message)
        this.statusCode = statusCode
        this.error = error
        this.success = success
    }
}



export default apiError