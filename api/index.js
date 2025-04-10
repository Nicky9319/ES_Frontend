export default function handler(request, response) {
  response.status(200).json({
    message: "Welcome to Gryork API",
    endpoints: [
      {
        path: "/api/hello",
        description: "Returns a greeting message"
      }
    ],
    status: "online"
  });
}
