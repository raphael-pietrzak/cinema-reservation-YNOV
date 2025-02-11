import {Movie} from "./movie.ts";

export interface Session {
    movie: Movie;
    room: string;
    time: string;
    totalSeats: number;
    reservedSeats: number;
}