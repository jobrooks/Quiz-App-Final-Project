export const createError = (status, message) => {
    const err = new Error(); // Create a new Error object
    err.status = status; // Set the status property of the error to the specified status
    err.message = message; // Set the message property of the error to the specified message
    return err; // Return the custom error object
};
