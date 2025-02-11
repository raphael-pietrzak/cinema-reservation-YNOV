const AUTH_BASE_URL = 'http://localhost:3000';
const MOVIES_BASE_URL = 'http://localhost:8000';
const SESSIONS_BASE_URL = 'http://localhost:1590';

export const API_URLS = {
    auth: {
        login: `${AUTH_BASE_URL}/auth/login`,
        register: `${AUTH_BASE_URL}/auth/register`,
        logout: `${AUTH_BASE_URL}/auth/logout`,
    },
    movies: {
        getAll: `${MOVIES_BASE_URL}/movie`,
        getOne: (id: number) => `${MOVIES_BASE_URL}/movie/${id}`,
        create: `${MOVIES_BASE_URL}/movie`,
        update: (id: number) => `${MOVIES_BASE_URL}/movie/${id}/update`,
        delete: (id: number) => `${MOVIES_BASE_URL}/movie/${id}/delete`,
    },
    sessions: {
        getAll: `${SESSIONS_BASE_URL}/sessions`,
        getOne: (id: number) => `${SESSIONS_BASE_URL}/sessions/${id}`,
        create: `${SESSIONS_BASE_URL}/sessions`,
        update: (id: number) => `${SESSIONS_BASE_URL}/sessions/${id}`,
        delete: (id: number) => `${SESSIONS_BASE_URL}/sessions/${id}`,
    }
};
