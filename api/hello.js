export default function handler(request, response) {
  response.status(200).json({
    message: "Hello from Gryork API!",
    timestamp: new Date().toISOString()
  });
}
