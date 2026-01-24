const rawBackendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrl = rawBackendUrl ? rawBackendUrl.replace(/\/+$/, '') : 'http://127.0.0.1:3060';

const config = { backendUrl };

console.log(`backendUrl in config.js: ${config.backendUrl}`);
export { config as urlConfig };
