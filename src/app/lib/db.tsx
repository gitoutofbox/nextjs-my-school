export const MONGO_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.gec2mcu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster1`