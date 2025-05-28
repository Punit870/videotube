class ApiResponse{
    constructor(statusCode, data, mesaage="success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = mesaage;
        this.success= statusCode < 400;
}
}

export {ApiResponse};