export default defineEventHandler(async (event) => {
    console.log("Endpoint called!");
  
    return {
      success: true,
      message: 'This is just a test endpoint.'
    };
  });
  